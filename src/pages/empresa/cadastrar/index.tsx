import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { clamp, classNames } from '@/utils';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/empresa/cadastro/schema';
import Stepper from '@/components/atoms/Stepper';
import CadastroEmpresaDadosPessoais from '@/components/empresa/cadastro/CadastroEmpresaDadosPessoais';
import CadastroEmpresaDadosEmpresa from '@/components/empresa/cadastro/CadastroEmpresaDadosEmpresa';
import CadastroEmpresaEnderecoContatos from '@/components/empresa/cadastro/CadastroEmpresaEnderecoContatos';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import { GUEST, useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import EmpregadorService from '@/services/EmpregadorService';
import { omitBy } from 'lodash';
import { IEmpregadorCreate } from '@/interfaces/empregador';
import Router, { useRouter } from 'next/router';
import { formatDateToAPI } from '@/utils/date';

type Props = {};

const CadastroEmpresa = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const login = useAuthStore((state) => state.login);
  const steps = ['Dados Pessoais', 'Dados da Empresa', 'Endereço e Contatos'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const loginAction = async (data: IEmpregadorCreate) => {
    const { cpf, password } = data;

    try {
      await login(cpf, password);
      toastSuccess('Login realizado!');
      await router.push({ pathname: '/' });
    } catch (e) {
      toastError('Erro ao realizar login!');
    }
  };
  const onSubmit = async (data) => {
    try {
      const requestData = omitBy(data, (v) => !v) as IEmpregadorCreate;
      requestData['data_nascimento'] = formatDateToAPI(
        requestData['data_nascimento'],
      );
      await EmpregadorService.create(requestData);
      toastSuccess('Cadastro realizado!');
      await loginAction(data);
    } catch ({ response: { data } }) {
      console.log(data);
      if (data instanceof Object) {
        Object.keys(data).forEach((key) => {
          setError(key, { message: data[key] });
        });
      }
      setStep(0);
      toastError('Erro ao salvar usuário ou empresa, verifique os campos!');
    }
  };

  const changeStep = async (value) => {
    if (value > step) {
      const validateForm = {
        0: async () =>
          await trigger([
            'nome',
            'data_nascimento',
            'cpf',
            'atuacao',
            'cargo',
            'telefone',
            'email',
            'password',
            'confirm_password',
          ]),
        1: async () =>
          await trigger([
            'cnpj',
            'razao_social',
            'nome_fantasia',
            'ramo_atividade',
            'numero_funcionarios',
            'descricao',
          ]),
        2: async () =>
          await trigger([
            'empresa_telefone',
            'empresa_email',
            'site',
            'cep',
            'logradouro',
            'numero',
            'complemento',
            'bairro',
            'cidade',
            'estado',
          ]),
      };

      const result = await validateForm[step]();

      startForm.current.scrollIntoView({ behavior: 'smooth' });

      if (!result) return;
    }

    startForm.current.scrollIntoView({ behavior: 'smooth' });
    setStep(clamp(value, 0, 2));
  };

  const subTitle = (
    <p ref={startForm} className={classNames(step == 0 ? 'ml-auto' : 'hidden')}>
      Cadastre-se como{' '}
      <Link
        href={'/candidato/cadastrar'}
        className="link link-hover text-primary"
      >
        Candidato
      </Link>
    </p>
  );

  return (
    <CardFormWrapper title="Cadastro de Empresa" subtitle={subTitle}>
      <Stepper steps={steps} changeStep={changeStep} currentStep={step} />
      <div className="divider divider-horizontal my-4"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step == 0 && (
          <CadastroEmpresaDadosPessoais register={register} errors={errors} />
        )}
        {step == 1 && (
          <CadastroEmpresaDadosEmpresa register={register} errors={errors} />
        )}
        {step == 2 && (
          <CadastroEmpresaEnderecoContatos
            register={register}
            errors={errors}
          />
        )}

        <div className="flex space-x-4 justify-end">
          <button
            type="button"
            className={classNames(step != 0 && 'hidden', 'btn btn-base mt-4')}
            onClick={Router.back}
          >
            cancelar
          </button>
          <button
            onClick={() => changeStep(step - 1)}
            type="button"
            className={classNames(step == 0 && 'hidden', 'btn btn-base mt-4')}
          >
            voltar
          </button>

          <button
            onClick={() => changeStep(step + 1)}
            type="button"
            className={classNames(
              step == steps.length - 1 && 'hidden',
              'btn btn-primary mt-4 text-white',
            )}
          >
            continuar
          </button>
          <button
            type="submit"
            className={classNames(
              step < steps.length - 1 && 'hidden',
              'btn btn-primary mt-4 text-white',
            )}
          >
            cadastrar
          </button>
        </div>
      </form>
    </CardFormWrapper>
  );
};

CadastroEmpresa.permissions = [GUEST];
export default CadastroEmpresa;

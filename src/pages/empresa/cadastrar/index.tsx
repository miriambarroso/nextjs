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
import ReCAPTCHA from 'react-google-recaptcha';
import CardNotification from "@/components/atoms/CardNotification";

type Props = {};

const CadastroEmpresa = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const login = useAuthStore((state) => state.login);
  const steps = ['Dados Pessoais', 'Dados da Empresa', 'Endereço e Contatos'];
  const recaptchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    // values: {
    //   estado: 'SP',
    //   cidade: 'Carapicuíba',
    //   bairro: 'Jardim Santa Rita',
    //   complemento: '',
    //   numero: '',
    //   logradouro: 'Rua Assis',
    //   cep: '06397360',
    //   site: 'https://www.fabioehenryconsultoriafinanceirame.com.br',
    //   empresa_email: 'seguranca@fabioehenryconsultoriafinanceirame.com.br',
    //   empresa_telefone: '1128065480',
    //   descricao: 'Sei lá',
    //   numero_funcionarios: '100',
    //   ramo_atividade: 'Consultoria',
    //   nome_fantasia: 'Fábio e Henry Consultoria Financeira ME',
    //   razao_social: 'Fábio e Henry Consultoria Financeira ME',
    //   cnpj: '75945889000189',
    //   confirm_password: 'Admin1234)',
    //   password: 'Admin1234)',
    //   telefone: '62999999999',
    //   email: 'rg@rh.rh.com',
    //   cargo: 'Analista',
    //   atuacao: 'Departamento',
    //   cpf: '96683870748',
    //   data_nascimento: '2009-04-04T03:00:00.000Z',
    //   nome: 'Giovanna Letícia Rebeca Bernardes',
    // },
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
    const recaptchaValue = await recaptchaRef.current.executeAsync();

    try {
      const requestData = omitBy(data, (v) => !v) as IEmpregadorCreate;
      requestData['data_nascimento'] = formatDateToAPI(
        requestData['data_nascimento'],
      );
      requestData['recaptcha'] = recaptchaValue;
      await EmpregadorService.create(requestData);
      toastSuccess('Cadastro realizado!');
      await loginAction(data);
    } catch ({ response: { data } }) {
      if (data instanceof Object) {
        Object.keys(data).forEach((key) => {
          setError(key, { message: data[key] });
        });
      }
      setStep(0);
      toastError('Erro ao salvar usuário ou empresa, verifique os campos!');
      recaptchaRef.current.reset();
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
    <p
      ref={startForm}
      className={classNames(step == 0 ? 'lg:ml-auto' : 'hidden')}
    >
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
    <div>
      <CardNotification title="Atenção"
                        subtitle={'Ferramenta aguardando liberação de uso. '}>
        <div>
          <p>
            Ferramenta aguardando liberação de uso.
            Quando liberada, daremos início à divulgação das redes sociais do IFG
            e da Prefeitura de Anápolis. Contudo, é possível testar a feramenta com os seguintes usuários testes:
          </p>
          <div className={"alert my-1 mx-1 flex flex-row"}
            // @ts-ignore
               style={{ justifyContent:"space-around !important" }}>
            <div className={""}>
              Empresa<br/>login: 828.736.230-04<br/>senha:Senha@123
            </div>
            <div className="flex bg-black border" style={{ height: "100px" }} >
              <div className="vr bg-black border"></div>
            </div>
            <div className={""}> Candidato<br/>login: 073.190.591-18<br/>senha:Senha@123</div>
          </div>
          <div className="space-x-4 ml-auto grid"
               style={{ alignItems:"center", justifyItems:"center" }}>
            <button
              type="button"
              className={classNames(step != 0 && 'hidden', 'btn btn-base mt-4')}
              onClick={Router.back}
            >
              cancelar
            </button>
          </div>
        </div>
      </CardNotification>
      {/*<CardFormWrapper title="Cadastro de Empresa" subtitle={subTitle}>*/}
      {/*  <Stepper steps={steps} changeStep={changeStep} currentStep={step} />*/}
      {/*  <div className="divider divider-horizontal my-4"></div>*/}
      {/*  <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    {step == 0 && (*/}
      {/*      <CadastroEmpresaDadosPessoais register={register} errors={errors} />*/}
      {/*    )}*/}
      {/*    {step == 1 && (*/}
      {/*      <CadastroEmpresaDadosEmpresa*/}
      {/*        register={register}*/}
      {/*        errors={errors}*/}
      {/*        watch={watch}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    {step == 2 && (*/}
      {/*      <CadastroEmpresaEnderecoContatos*/}
      {/*        register={register}*/}
      {/*        errors={errors}*/}
      {/*        setValue={setValue}*/}
      {/*      />*/}
      {/*    )}*/}

      {/*    <div className="flex flex-wrap justify-between mt-4">*/}
      {/*      <ReCAPTCHA*/}
      {/*        badge="inline"*/}
      {/*        size="invisible"*/}
      {/*        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}*/}
      {/*        ref={recaptchaRef}*/}
      {/*      />*/}

      {/*      <div className="space-x-4 ml-auto">*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className={classNames(step != 0 && 'hidden', 'btn btn-base mt-4')}*/}
      {/*          onClick={Router.back}*/}
      {/*        >*/}
      {/*          cancelar*/}
      {/*        </button>*/}
      {/*        <button*/}
      {/*          onClick={() => changeStep(step - 1)}*/}
      {/*          type="button"*/}
      {/*          className={classNames(step == 0 && 'hidden', 'btn btn-base mt-4')}*/}
      {/*        >*/}
      {/*          voltar*/}
      {/*        </button>*/}

      {/*        <button*/}
      {/*          onClick={() => changeStep(step + 1)}*/}
      {/*          type="button"*/}
      {/*          className={classNames(*/}
      {/*            step == steps.length - 1 ,*/}
      {/*            'btn btn-primary mt-4 text-white',*/}
      {/*          )}*/}
      {/*        >*/}
      {/*          continuar*/}
      {/*        </button>*/}
      {/*        <button*/}
      {/*          type="submit"*/}
      {/*          className={classNames(*/}
      {/*            step < steps.length - 1 && 'hidden',*/}
      {/*            'btn btn-primary mt-4 text-white',*/}
      {/*          )}*/}
      {/*        >*/}
      {/*          cadastrar*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</CardFormWrapper>*/}
    </div>
  );
};

CadastroEmpresa.permissions = [GUEST];
export default CadastroEmpresa;

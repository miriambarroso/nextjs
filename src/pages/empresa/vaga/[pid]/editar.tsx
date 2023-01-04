import { useForm } from 'react-hook-form';
import { clamp, classNames } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/vaga/cadastro/schema';
import Stepper from '@/components/atoms/Stepper';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import CadastroVagaSobre from '@/components/vaga/cadastro/CadastroVagaSobre';
import CadastroVagaInformacoes from '@/components/vaga/cadastro/CadastroVagaInformacoes';
import CadastroVagaSalarioBeneficios from '@/components/vaga/cadastro/CadastroVagaSalarioBeneficios';
import { ADMIN, EMPREGADOR, SUPERADMIN, useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import BeneficioService from '@/services/BeneficioService';
import VagaService from '@/services/VagaService';
import { omitBy } from 'lodash';
import { IVagaCreate } from '@/interfaces/vaga';
import Router, { useRouter } from 'next/router';
import { currencyMask } from '@/utils/masks';

type Props = {};

// TODO: Adicionar validação de campos

const CadastroVaga = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const steps = [
    'Sobre a Vaga',
    'Salário e Benefícios',
    'Informações Categóricas',
  ];
  const [beneficios, setBeneficios] = useState([]);
  const { query } = useRouter();

  const [isEmpregador] = useAuthStore((state) => [state.isEmpregador]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      let request = {
        ...data,
        empresa: data.empresa?.id,
      };

      request = omitBy(request, (v) => !v) as IVagaCreate;

      await VagaService.update(request);
      toastSuccess('Vaga atualizada!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar vaga!');
    }
  };

  const fetchBeneficios = async () => {
    try {
      const { results } = await BeneficioService.getAll();
      setBeneficios(results.map((i) => ({ label: i.nome, value: i.id })));
    } catch (e) {
      toastError('Erro ao buscar benefícios');
    }
  };

  useEffect(() => {
    if (query.pid) {
      VagaService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
          salario: currencyMask.mask(data.salario),
          beneficios: data.beneficios.map((i) => i.id.toString()),
        });
      });
    }
  }, [query?.pid, reset]);

  useEffect(() => {
    fetchBeneficios();
  }, []);

  const changeStep = async (value) => {
    if (value > step) {
      const validateForm = {
        0: async () =>
          await trigger([
            'regime_contratual',
            'cargo',
            'atividades',
            'requisitos',
            'pessoa_deficiencia',
          ]),
        1: async () => await trigger(['salario', 'beneficios']),
        2: async () =>
          await trigger([
            'jornada_trabalho',
            'modelo_trabalho',
            'sexo',
            'idade_minima',
            'idade_maxima',
            'quantidade_vagas',
          ]),
      };

      const result = await validateForm[step]();

      startForm.current.scrollIntoView({ behavior: 'smooth' });
      if (!result) return;
    }

    startForm.current.scrollIntoView({ behavior: 'smooth' });
    setStep(clamp(value, 0, 2));
  };

  return (
    <CardFormWrapper
      title="Cadastro de Vaga"
      subtitle={<i className="hidden" ref={startForm} />}
    >
      <Stepper steps={steps} changeStep={changeStep} currentStep={step} />
      <div className="divider divider-horizontal my-4"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step == 0 && <CadastroVagaSobre register={register} errors={errors} />}
        {step == 1 && (
          <CadastroVagaSalarioBeneficios
            register={register}
            errors={errors}
            beneficios={beneficios}
          />
        )}
        {step == 2 && (
          <CadastroVagaInformacoes register={register} errors={errors} />
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
            Salvar
          </button>
        </div>
      </form>
    </CardFormWrapper>
  );
};

CadastroVaga.permissions = [SUPERADMIN, ADMIN, EMPREGADOR];
export default CadastroVaga;

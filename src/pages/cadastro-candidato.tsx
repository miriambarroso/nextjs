import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { clamp, classNames } from '@/utils';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/cadastro-candidato/schema';
import CadastroCandidatoDadosPessoais, {
  EstadoCivilChoices,
  PossuiDeficienciaChoices,
  SexoChoices,
} from '@/components/cadastro-candidato/CadastroCandidatoDadosPessoais';
import Stepper from '@/components/atoms/Stepper';
import CadastroCandidatoDadosContato from '@/components/cadastro-candidato/CadastroCandidatoDadosContato';
import CadastroCandidatoCandidatura from '@/components/cadastro-candidato/CadastroCandidatoCandidatura';

type Props = {};

type FormProps = {
  nome: string;
  data_nascimento: string;
  cpf: string;
  sexo: string;
  estado_civil: string;
  possui_deficiencia: string;
  email: string;
  telefone: string;
  password: string;
  confirm_password: string;
  cargo: string;
  salario: string;
  modelo_trabalho: string;
  regime_contratual: string;
  jornada_trabalho: string;
};

const CadastroCandidato = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const steps = ['Dados Pessoais', 'Dados de Contato', 'Candidatura'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      sexo: SexoChoices.find((c) => c.checked)?.value ?? '',
      estado_civil: EstadoCivilChoices.find((c) => c.checked)?.value ?? '',
      possui_deficiencia:
        PossuiDeficienciaChoices.find((c) => c.checked)?.value ?? '',
    } as FormProps,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const changeStep = async (value) => {
    if (value > step) {
      const validateForm = {
        0: async () =>
          await trigger([
            'nome',
            'data_nascimento',
            'cpf',
            'sexo',
            'estado_civil',
          ]),
        1: async () =>
          await trigger(['email', 'telefone', 'password', 'confirm_password']),
        2: async () =>
          await trigger([
            'cargo',
            'salario',
            'modelo_trabalho',
            'regime_contratual',
            'jornada_trabalho',
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
    <div className="max-w-2xl mx-auto bg-white py-12 px-8 my-20 text-base-content">
      <div className="flex items-baseline">
        <h1 ref={startForm} className="text-2xl font-noto-sans font-semibold">
          Cadastro de Candidato
        </h1>
        <p className={classNames(step == 0 ? 'ml-auto' : 'hidden')}>
          Cadastre-se como{' '}
          <Link
            href={'/cadastro-empresa'}
            className="link link-hover text-primary"
          >
            Empresa
          </Link>
        </p>
      </div>
      <div className="divider divider-horizontal my-4"></div>
      <Stepper steps={steps} changeStep={changeStep} currentStep={step} />
      <div className="divider divider-horizontal my-4"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step == 0 && (
          <CadastroCandidatoDadosPessoais register={register} errors={errors} />
        )}
        {step == 1 && (
          <CadastroCandidatoDadosContato register={register} errors={errors} />
        )}
        {step == 2 && (
          <CadastroCandidatoCandidatura register={register} errors={errors} />
        )}

        <div className="flex space-x-4 justify-end">
          {step == 0 ? (
            <button type="button" className="btn btn-base mt-4">
              cancelar
            </button>
          ) : (
            <button
              onClick={() => changeStep(step - 1)}
              type="button"
              className="btn btn-base mt-4"
            >
              voltar
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => changeStep(step + 1)}
              type="button"
              className="btn btn-primary mt-4 text-white"
            >
              continuar
            </button>
          ) : (
            <button type="submit" className="btn btn-primary mt-4 text-white">
              cadastrar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CadastroCandidato;

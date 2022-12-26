import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { clamp, classNames } from '@/utils';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/cadastro/schema';
import CadastroCandidatoDadosPessoais from '@/components/candidato/cadastro/CadastroCandidatoDadosPessoais';
import Stepper from '@/components/atoms/Stepper';
import CadastroCandidatoDadosContato from '@/components/candidato/cadastro/CadastroCandidatoDadosContato';
import CadastroCandidatoCandidatura from '@/components/candidato/cadastro/CadastroCandidatoCandidatura';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import { GUEST } from '@/store/auth';

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

const Index = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const steps = ['Dados Pessoais', 'Dados de Contato', 'Candidatura'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
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

  const subTitle = (
    <p ref={startForm} className={classNames(step == 0 ? 'ml-auto' : 'hidden')}>
      Cadastre-se como{' '}
      <Link href={'/empresa/cadastro'} className="link link-hover text-primary">
        Empresa
      </Link>
    </p>
  );

  return (
    <CardFormWrapper title="Cadastro de Candidato" subtitle={subTitle}>
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
            <button
              type="submit"
              className="btn btn-primary mt-4 text-white"
              onClick={() => {
                console.log('heelloo');
              }}
            >
              cadastrar
            </button>
          )}
        </div>
      </form>
    </CardFormWrapper>
  );
};

Index.permissions = [GUEST];

export default Index;

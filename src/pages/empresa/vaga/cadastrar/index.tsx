import { useForm } from 'react-hook-form';
import { clamp } from '@/utils';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/vaga/cadastro/schema';
import Stepper from '@/components/atoms/Stepper';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import CadastroVagaSobre from '@/components/vaga/cadastro/CadastroVagaSobre';
import CadastroVagaInformacoes from '@/components/vaga/cadastro/CadastroVagaInformacoes';
import CadastroVagaSalarioBeneficios from '@/components/vaga/cadastro/CadastroVagaSalarioBeneficios';
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
// TODO: Adicionar validação de campos

const CadastroVaga = ({}: Props) => {
  const [step, setStep] = useState(0);
  const startForm = useRef(null);
  const steps = [
    'Sobre a Vaga',
    'Salário e Benefícios',
    'Informações Categóricas',
  ];

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
          <CadastroVagaSalarioBeneficios register={register} errors={errors} />
        )}
        {step == 2 && (
          <CadastroVagaInformacoes register={register} errors={errors} />
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
    </CardFormWrapper>
  );
};

CadastroVaga.permissions = [GUEST];
export default CadastroVaga;

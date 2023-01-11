import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { clamp, classNames, objectFormData } from '@/utils';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/cadastro/schema';
import CadastroCandidatoDadosPessoais from '@/components/candidato/cadastro/CadastroCandidatoDadosPessoais';
import Stepper from '@/components/atoms/Stepper';
import CadastroCandidatoDadosContato from '@/components/candidato/cadastro/CadastroCandidatoDadosContato';
import CadastroCandidatoCandidatura from '@/components/candidato/cadastro/CadastroCandidatoCandidatura';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import { GUEST, useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import CandidatoService from '@/services/CandidatoService';
import { format } from 'date-fns';
import Router, { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

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
  const login = useAuthStore((state) => state.login);
  const startForm = useRef(null);
  const steps = ['Dados Pessoais', 'Dados de Contato', 'Candidatura'];
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginAction = async (data: FormProps) => {
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
      const recaptchaValue = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const requestData = objectFormData({
        ...data,
        data_nascimento: format(data.data_nascimento, 'yyyy-MM-dd'),
        salario: parseFloat(data.salario),
        recaptcha: recaptchaValue,
        curriculo: data.curriculo ? data.curriculo[0] : null,
      });

      await CandidatoService.create(requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toastSuccess('Cadastro realizado!');
      await loginAction(data);
    } catch (error) {
      console.log(error);
      toastError('Erro ao realizar cadastro!');
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
            'sexo',
            'estado_civil',
            'possui_deficiencia',
            'tipo_deficiencia',
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

      // if (!result) return;
    }

    startForm.current.scrollIntoView({ behavior: 'smooth' });
    setStep(clamp(value, 0, 2));
  };

  // useEffect(() => {
  //   const mock = {
  //     jornada_trabalho: 1,
  //     regime_contratual: 2,
  //     modelo_trabalho: 1,
  //     salario: 2000,
  //     cargo: 'Analista',
  //     confirm_password: 'Admin1234)',
  //     password: 'Admin1234)',
  //     telefone: '98988751446',
  //     email: 'raquel_carvalho@uninet.com.br',
  //     possui_deficiencia: false,
  //     estado_civil: 1,
  //     sexo: 1,
  //     cpf: '64751788450',
  //     data_nascimento: '1952-05-01',
  //     nome: 'Raquel Marcela Carvalho',
  //   };
  //   reset(mock);
  // }, []);

  const subTitle = (
    <p
      ref={startForm}
      className={classNames(step == 0 ? 'lg:ml-auto' : 'hidden')}
    >
      Cadastre-se como{' '}
      <Link
        href={'/empresa/cadastrar'}
        className="link link-hover text-primary"
      >
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
          <CadastroCandidatoDadosPessoais
            register={register}
            errors={errors}
            watch={watch}
          />
        )}
        {step == 1 && (
          <CadastroCandidatoDadosContato register={register} errors={errors} />
        )}
        {step == 2 && (
          <CadastroCandidatoCandidatura register={register} errors={errors} />
        )}

        <div className="flex flex-wrap justify-between mt-4">
          <ReCAPTCHA
            badge="inline"
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
            ref={recaptchaRef}
          />

          <div className="space-x-4 ml-auto">
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
        </div>
      </form>
    </CardFormWrapper>
  );
};

Index.permissions = [GUEST];

export default Index;

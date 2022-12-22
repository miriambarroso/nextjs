import { useForm } from 'react-hook-form';
import Link from 'next/link';
import InputField from '@/components/atoms/InputField';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import ToggleField from '@/components/atoms/ToggleField';

type Props = {};

const Login = ({}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <CardFormWrapper title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={'CPF'}
          name={'cpf'}
          register={register}
          placeholder={'Insira seu CPF'}
        />
        <InputField
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          register={register}
          name="password"
        />
        <div className="flex items-center mt-4">
          <ToggleField
            label={'Mantenha-me logado'}
            name={'keep_logged'}
            register={register}
          />
          <Link
            href={'/recuperar-senha'}
            className="text-sm ml-auto link link-hover"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-white"
        >
          Entrar
        </button>
      </form>
      <div className="divider divider-horizontal my-4"></div>
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold text-center">
          Novo na plataforma?
        </h2>
        <p className="text-center">
          Cadastre-se como{' '}
          <Link href={'/candidato/cadastro'} className="text-primary">
            Candidato
          </Link>{' '}
          ou{' '}
          <Link href={'/empresa/cadastro'} className="text-primary">
            Empresa
          </Link>
        </p>
      </div>
    </CardFormWrapper>
  );
};

export default Login;

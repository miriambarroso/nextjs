import { useForm } from 'react-hook-form';
import Link from 'next/link';

type Props = {};

const Login = ({}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white py-12 px-8 my-20 text-base-content">
      <h1 className="text-2xl font-noto-sans font-semibold">Login</h1>
      <div className="divider divider-horizontal my-4"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">CPF</span>
          </label>
          <input
            {...register('cpf')}
            type="text"
            placeholder="Insira seu CPF"
            className="input"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder="Digite sua senha"
            className="input "
          />
        </div>
        <div className="flex items-center mt-4">
          <div className="form-control">
            <label className="label cursor-pointer space-x-2">
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
                {...register('remember')}
              />
              <span className="label-text">Mantenha-me logado</span>
            </label>
          </div>
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
          <Link href={'/cadastro-candidato'} className="text-primary">
            Candidato
          </Link>{' '}
          ou{' '}
          <Link href={'/cadastro-empresa'} className="text-primary">
            Empresa
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

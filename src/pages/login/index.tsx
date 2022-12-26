import { useForm } from 'react-hook-form';
import Link from 'next/link';
import InputField from '@/components/atoms/InputField';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import ToggleField from '@/components/atoms/ToggleField';
import { cpfMask } from '@/utils/masks';
import { GUEST, useAuthStore } from '@/store/auth';
import { schema } from '@/pages/login/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

type Props = {};

const Login = ({}: Props) => {
  const login = useAuthStore(({ login }) => login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { cpf, password } = data;
    const { query } = router;

    try {
      await login(cpf, password);

      toast.success('Login realizado com sucesso!', {
        duration: 3000,
        position: 'top-right',
      });

      await router.push({ pathname: (query.redirect as string) ?? '/' });
    } catch (e) {
      toast.error('Erro ao realizar login!', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  return (
    <CardFormWrapper title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={'CPF'}
          name={'cpf'}
          register={register}
          options={{
            onChange: cpfMask.onChange,
          }}
          error={errors.cpf?.message}
          placeholder={'000.000.000-00'}
        />
        <InputField
          label="Senha"
          type="password"
          placeholder="********"
          register={register}
          error={errors.password?.message}
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

Login.permissions = [GUEST];
export default Login;

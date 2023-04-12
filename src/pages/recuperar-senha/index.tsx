import { useForm } from 'react-hook-form';
import InputField from '@/components/atoms/InputField';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import { cpfMask } from '@/utils/masks';
import { GUEST } from '@/store/auth';
import { schema, schemaToken } from '@/components/recuperar-senha/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import axiosInstance from '@/utils/axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
import InputSenha from '@/components/atoms/inputs/InputSenha';

type Props = {};

const Login = ({}: Props) => {
  const router = useRouter();

  const token = router.query.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(!token ? schema : schemaToken),
  });

  const recaptchaRef = useRef(null);

  const onSubmit = async (data) => {
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    const { cpf } = data;

    try {
      const requestData = {
        cpf,
        recaptcha: recaptchaValue,
      };

      await axiosInstance.post('/recuperar-senha', requestData);
      toastSuccess('Acesse seu email e redefina sua senha!');
    } catch (e) {
      toastError('Erro ao realizar recuperação de senha!');
      recaptchaRef.current.reset();
    }
  };

  const onSubmitPassword = async (data) => {
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    const { password } = data;

    try {
      const requestData = {
        password,
        recaptcha: recaptchaValue,
        token,
      };

      await axiosInstance.put('/recuperar-senha', requestData);
      toastSuccess('Senha redefinida!');
    } catch (e) {
      toastError('Erro ao redefinir sua senha!');
      recaptchaRef.current.reset();
    }
  };

  const renderNoToken = () => {
    return (
      <CardFormWrapper title="Recuperar senha">
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
          <div className="flex flex-wrap justify-between mt-4">
            <ReCAPTCHA
              badge="inline"
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
              ref={recaptchaRef}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-8 text-white"
          >
            Recuperar agora
          </button>
        </form>
      </CardFormWrapper>
    );
  };

  const renderToken = () => {
    return (
      <CardFormWrapper title="Recuperar senha">
        <form onSubmit={handleSubmit(onSubmitPassword)}>
          <InputSenha
            label="Crie uma senha"
            register={register}
            error={errors.password?.message}
            required
          />
          <div className="prose text-sm text-base-content opacity-50">
            <ul>
              <li>Minimo de 8 caracteres</li>
              <li>Minimo de 1 caracter especial</li>
              <li>Letras MAIÚSCULAS</li>
              <li>Letras minúsculas</li>
            </ul>
          </div>
          <InputSenha
            label="Repita sua senha"
            name="confirm_password"
            register={register}
            error={errors.confirm_password?.message}
            required
          />
          <div className="flex flex-wrap justify-between mt-4">
            <ReCAPTCHA
              badge="inline"
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
              ref={recaptchaRef}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-8 text-white"
          >
            Redefinir agora
          </button>
        </form>
      </CardFormWrapper>
    );
  };

  return !token ? renderNoToken() : renderToken();
};

Login.permissions = [GUEST];
export default Login;

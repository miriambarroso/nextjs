import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputSenha = ({
  register,
  error,
  required = false,
  label = 'Senha',
  name = 'password',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="********"
        error={error}
        type="password"
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputSenha;

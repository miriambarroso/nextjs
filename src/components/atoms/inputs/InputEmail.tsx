import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required: boolean;
  label?: string;
  name?: string;
};

const InputEmail = ({
  register,
  error,
  required,
  label = 'E-mail',
  name = 'email',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder={'Ex: rh@anapolis.go.gov.br'}
        error={error}
        type="email"
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputEmail;

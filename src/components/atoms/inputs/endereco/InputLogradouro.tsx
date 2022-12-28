import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputLogradouro = ({
  register,
  error,
  required = false,
  label = 'Logradouro',
  name = 'logradouro',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        placeholder="Ex: Rua, Avenida, etc"
        register={register}
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputLogradouro;

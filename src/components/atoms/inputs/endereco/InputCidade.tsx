import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputCidade = ({
  register,
  error,
  required = false,
  label = 'Cidade',
  name = 'cidade',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        placeholder="Ex: São Paulo"
        register={register}
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputCidade;

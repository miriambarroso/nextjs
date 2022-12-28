import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputNome = ({
  register,
  error,
  required = false,
  label = 'Nome Completo',
  name = 'nome',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: João da Silva"
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputNome;

import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputEstado = ({
  register,
  error,
  required = false,
  label = 'Estado',
  name = 'estado',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        placeholder="Ex: SP"
        register={register}
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputEstado;

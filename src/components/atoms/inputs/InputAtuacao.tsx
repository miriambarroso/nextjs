import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputAtuacao = ({
  register,
  error,
  required = false,
  label = 'Área de Atuação',
  name = 'atuacao',
}: Props) => {
  return (
    <>
      {' '}
      <InputField
        label={label}
        name={name}
        placeholder="Ex: Departamento Pessoal"
        register={register}
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputAtuacao;

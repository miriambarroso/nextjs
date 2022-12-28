import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputCurso = ({
  register,
  error,
  required = false,
  label = 'Curso',
  name = 'curso',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        options={{
          required: required,
        }}
        placeholder="Ex: Análise e Desenvolvimento de Sistemas"
        error={error}
      />
    </>
  );
};

export default InputCurso;

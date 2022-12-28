import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputInstituicao = ({
  register,
  error,
  required = false,
  label = 'Instituição de ensino',
  name = 'instituicao',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: Instituto Federal de Educação, Ciência e Tecnologia de Goiás"
        options={{
          required: required,
        }}
        error={error}
      />
    </>
  );
};

export default InputInstituicao;

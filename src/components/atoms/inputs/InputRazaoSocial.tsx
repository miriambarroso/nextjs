import InputField from '@/components/atoms/InputField';

type Props = { register; error; required: boolean };

const InputRazaoSocial = ({ register, error, required }: Props) => {
  return (
    <InputField
      label="Razão Social"
      name="razao_social"
      register={register}
      placeholder="Ex: Empresa de Tecnologia LTDA"
      error={error}
      options={{
        required: required,
      }}
    />
  );
};

export default InputRazaoSocial;

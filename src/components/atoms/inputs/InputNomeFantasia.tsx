import InputField from '@/components/atoms/InputField';

type Props = { register; error; required: boolean };

const InputNomeFantasia = ({ register, error, required }: Props) => {
  return (
    <>
      <InputField
        label="Nome Fantasia"
        name="nome_fantasia"
        register={register}
        placeholder="Ex: Empresa de Tecnologia"
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputNomeFantasia;

import InputField from '@/components/atoms/InputField';

type Props = { register; error; required: boolean };

const InputRamoAtividade = ({ register, error, required }: Props) => {
  return (
    <>
      <InputField
        label="Ramo de Atividade"
        name="ramo_atividade"
        register={register}
        placeholder="Ex: Tecnologia"
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputRamoAtividade;

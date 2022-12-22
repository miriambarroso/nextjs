import InputField from '@/components/atoms/InputField';

type Props = {
  register: any;
  errors: any;
};

const CadastroIdioma = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Idioma"
        name={'nome'}
        register={register}
        error={errors.nome?.message}
      />
      <InputField
        label="Nível"
        name={'nivel'}
        register={register}
        error={errors.nivel?.message}
      />
    </>
  );
};

export default CadastroIdioma;

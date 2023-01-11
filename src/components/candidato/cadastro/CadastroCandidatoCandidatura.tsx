import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';
import InputFileField from '@/components/atoms/InputFileField';

type Props = {
  register: any;
  errors: any;
};

const CadastroCandidatoCandidatura = ({ register, errors }: Props) => {
  return (
    <>
      <CadastroObjetivoProfissional register={register} errors={errors} />
      <InputFileField
        label="Currículo"
        name="curriculo"
        register={register}
        inputProps={{
          accept: '.pdf',
        }}
        error={errors.curriculo?.message}
      />
    </>
  );
};

export default CadastroCandidatoCandidatura;

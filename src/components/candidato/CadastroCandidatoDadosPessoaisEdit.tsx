import CadastroCandidatoDadosPessoais from '@/components/candidato/cadastro/CadastroCandidatoDadosPessoais';

type Props = { register: any; errors: any; watch: any };

const CadastroCandidatoDadosPessoaisEdit = ({
  register,
  errors,
  watch,
}: Props) => {
  return (
    <CadastroCandidatoDadosPessoais
      register={register}
      errors={errors}
      watch={watch}
      editMode={true}
    />
  );
};

export default CadastroCandidatoDadosPessoaisEdit;

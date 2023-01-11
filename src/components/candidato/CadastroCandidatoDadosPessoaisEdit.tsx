import CadastroCandidatoDadosPessoais from '@/components/candidato/cadastro/CadastroCandidatoDadosPessoais';

type Props = {
  register: any;
  errors: any;
  watch: any;
  handlers: any;
  setValue: any;
};

const CadastroCandidatoDadosPessoaisEdit = ({
  register,
  errors,
  watch,
  handlers,
  setValue,
}: Props) => {
  return (
    <CadastroCandidatoDadosPessoais
      register={register}
      errors={errors}
      watch={watch}
      editMode={true}
      setValue={setValue}
      handlers={handlers}
    />
  );
};

export default CadastroCandidatoDadosPessoaisEdit;

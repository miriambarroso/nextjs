import CadastroEmpresaDadosEmpresa from '@/components/empresa/cadastro/CadastroEmpresaDadosEmpresa';

type Props = {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  handlers: any;
};

const EditarEmpresaDadosCadastrais = ({
  register,
  errors,
  handlers,
  setValue,
  watch,
}: Props) => {
  return (
    <CadastroEmpresaDadosEmpresa
      register={register}
      errors={errors}
      watch={watch}
      setValue={setValue}
      handlers={handlers}
      editMode={true}
    />
  );
};

export default EditarEmpresaDadosCadastrais;

import CadastroEmpresaDadosEmpresa from '@/components/empresa/cadastro/CadastroEmpresaDadosEmpresa';

type Props = { register: any; errors: any };

const EditarEmpresaDadosCadastrais = ({ register, errors }: Props) => {
  return (
    <CadastroEmpresaDadosEmpresa
      register={register}
      errors={errors}
      editMode={true}
    />
  );
};

export default EditarEmpresaDadosCadastrais;

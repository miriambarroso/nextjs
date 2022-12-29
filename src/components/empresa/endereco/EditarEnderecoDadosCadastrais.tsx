import CadastroEmpresaEnderecoContatos from '@/components/empresa/cadastro/CadastroEmpresaEnderecoContatos';

type Props = { register; errors };

const EditarEnderecoDadosCadastrais = ({ register, errors }: Props) => {
  return (
    <>
      <CadastroEmpresaEnderecoContatos
        register={register}
        errors={errors}
        editMode
      />
    </>
  );
};

export default EditarEnderecoDadosCadastrais;

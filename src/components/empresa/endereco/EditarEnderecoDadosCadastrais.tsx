import CadastroEmpresaEnderecoContatos from '@/components/empresa/cadastro/CadastroEmpresaEnderecoContatos';

type Props = { register; errors; setValue? };

const EditarEnderecoDadosCadastrais = ({
  register,
  errors,
  setValue,
}: Props) => {
  return (
    <>
      <CadastroEmpresaEnderecoContatos
        register={register}
        errors={errors}
        setValue={setValue}
        editMode
      />
    </>
  );
};

export default EditarEnderecoDadosCadastrais;

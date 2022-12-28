import CadastroEmpresaDadosPessoais from '@/components/empresa/cadastro/CadastroEmpresaDadosPessoais';

type Props = { register: any; errors: any; watch: any };

const EditEmpregadorDadosCadastrais = ({ register, errors }: Props) => {
  return (
    <CadastroEmpresaDadosPessoais
      register={register}
      errors={errors}
      editMode={true}
    />
  );
};

export default EditEmpregadorDadosCadastrais;

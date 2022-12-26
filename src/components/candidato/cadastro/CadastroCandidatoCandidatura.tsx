import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';

type Props = {
  register: any;
  errors: any;
};

const CadastroCandidatoCandidatura = ({ register, errors }: Props) => {
  return <CadastroObjetivoProfissional register={register} errors={errors} />;
};

export default CadastroCandidatoCandidatura;

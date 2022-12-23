import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';
import { IObjetivoProfissional } from '@/components/candidato/objetivo-profissional/schema';

type Props = {
  register: any;
  errors: any;
  data?: IObjetivoProfissional;
};

const CadastroCandidatoCandidatura = ({ register, errors, data }: Props) => {
  return (
    <CadastroObjetivoProfissional
      register={register}
      errors={errors}
      data={data}
    />
  );
};

export default CadastroCandidatoCandidatura;

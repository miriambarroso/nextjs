import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/objetivo-profissional/schema';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {};

  return (
    <>
      <BasicForm
        title={'Objetivo Profissional'}
        onSubmit={handleSubmit(onSubmit)}
        component={CadastroObjetivoProfissional}
        register={register}
        errors={errors}
      >
        <button type="button" className="btn btn-base mt-4">
          voltar
        </button>
        <button type="submit" className="btn btn-primary mt-4 text-white">
          salvar
        </button>
      </BasicForm>
    </>
  );
};
Index.permissions = [SUPERADMIN, ADMIN, CANDIDATO];
export default Index;

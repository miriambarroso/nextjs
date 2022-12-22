import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroExperienciaProfissional from '@/components/candidato/experiencia-profissional/CadastroExperienciaProfissional';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <BasicForm
      title={'Experiência Profissional'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroExperienciaProfissional}
      watch={watch}
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
  );
};

export default Index;

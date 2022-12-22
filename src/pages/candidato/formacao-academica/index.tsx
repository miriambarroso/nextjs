import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroFormacaoAcademica from '@/components/candidato/formacao-academica/CadastroFormacaoAcademica';

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
      title={'Formação Acadêmica'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroFormacaoAcademica}
      register={register}
      watch={watch}
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

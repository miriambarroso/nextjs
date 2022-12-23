import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroIdioma from '@/components/candidato/idioma/CadastroIdioma';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/idioma/schema';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <BasicForm
      title={'Idioma'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroIdioma}
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

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IObjetivoProfissional,
  schema,
} from '@/components/candidato/objetivo-profissional/schema';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';

type Props = {};

const Edit = ({}: Props) => {
  const fetchData = async (): Promise<IObjetivoProfissional> => {
    const response = await fetch('/candidato/objetivo-profissional');
    return await response.json();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

export default Edit;

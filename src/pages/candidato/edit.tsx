import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroCandidatoDadosPessoaisEdit from '@/components/candidato/CadastroCandidatoDadosPessoaisEdit';

type Props = {};

const Edit = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <BasicForm
      title={'Informações Cadastrais'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroCandidatoDadosPessoaisEdit}
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

export default Edit;

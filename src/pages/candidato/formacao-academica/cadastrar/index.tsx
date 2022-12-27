import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroFormacaoAcademica from '@/components/candidato/formacao-academica/CadastroFormacaoAcademica';
import { schema } from '@/components/candidato/formacao-academica/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';
import FormacaoAcademicaService from '@/services/FormacaoAcademicaService';
import { toastError, toastSuccess } from '@/utils/toasts';
import Router from 'next/router';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        data_conclusao: data.data_atual ? null : data.data_conclusao,
      };
      await FormacaoAcademicaService.create(requestData);
      toastSuccess('Formação acadêmica salva!');
      Router.back();
    } catch (e) {
      toastError('Erro ao salvar formação acadêmica!');
    }
  };

  return (
    <BasicForm
      title={'Formação Acadêmica'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroFormacaoAcademica}
      register={register}
      watch={watch}
      trigger={trigger}
      errors={errors}
    >
      <button type="button" className="btn btn-base mt-4" onClick={Router.back}>
        voltar
      </button>
      <button type="submit" className="btn btn-primary mt-4 text-white">
        salvar
      </button>
    </BasicForm>
  );
};
Index.permissions = [SUPERADMIN, ADMIN, CANDIDATO];
export default Index;

import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroFormacaoAcademica from '@/components/candidato/formacao-academica/CadastroFormacaoAcademica';
import { schema } from '@/components/candidato/formacao-academica/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';
import FormacaoAcademicaService from '@/services/FormacaoAcademicaService';
import { toastError, toastSuccess } from '@/utils/toasts';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const { query } = router;

  const onSubmit = async (data) => {
    try {
      const requestData: IFormacaoAcademica = {
        ...data,
        data_conclusao: data.data_atual ? null : data.data_conclusao,
      };

      await FormacaoAcademicaService.update(requestData);
      toastSuccess('Formação acadêmica atualizada!');
      router.back();
    } catch (e) {
      toastError('Erro ao atualizar formação acadêmica!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      FormacaoAcademicaService.get(query?.pid as unknown as number).then(
        (data) => {
          reset({
            ...data,
            data_atual: data.data_conclusao === null,
          });
        },
      );
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Formação Acadêmica'}
      onSubmit={(recaptcha) => {
        handleSubmit((data) => {
          onSubmit({ ...data, recaptcha });
        })();
      }}
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

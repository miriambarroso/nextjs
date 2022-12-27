import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroIdioma from '@/components/candidato/idioma/CadastroIdioma';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/idioma/schema';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';
import Router from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import IdiomaService from '@/services/IdiomaService';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { query } = Router;

  const onSubmit = async (data) => {
    try {
      await IdiomaService.update(data);
      toastSuccess('Idioma atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar idioma!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      IdiomaService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
        });
      });
    }
  }, [query?.pid]);

  return (
    <BasicForm
      title={'Idioma'}
      onSubmit={handleSubmit(onSubmit)}
      component={CadastroIdioma}
      register={register}
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

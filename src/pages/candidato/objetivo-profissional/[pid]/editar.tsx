import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/objetivo-profissional/schema';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroObjetivoProfissional from '@/components/candidato/objetivo-profissional/CadastroObjetivoProfissional';
import Router, { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import ObjetivoProfissionalService from '@/services/ObjetivoProfissionalService';
import { currencyMask } from '@/utils/masks';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';

type Props = {};

const Edit = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { query } = useRouter();

  const onSubmit = async (data) => {
    try {
      await ObjetivoProfissionalService.update(data);
      toastSuccess('Objetivo profissional atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar objetivo profissional!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      ObjetivoProfissionalService.get(query?.pid as unknown as number).then(
        (data) => {
          reset({
            ...data,
            salario: currencyMask.mask(data.salario),
          });
        },
      );
    }
  }, [query?.pid, reset]);

  return (
    <>
      <BasicForm
        title={'Objetivo Profissional'}
        onSubmit={handleSubmit(onSubmit)}
        component={CadastroObjetivoProfissional}
        register={register}
        errors={errors}
      >
        <button
          type="button"
          className="btn btn-base mt-4"
          onClick={Router.back}
        >
          voltar
        </button>
        <button type="submit" className="btn btn-primary mt-4 text-white">
          salvar
        </button>
      </BasicForm>
    </>
  );
};
Edit.permissions = [SUPERADMIN, ADMIN, CANDIDATO];
export default Edit;

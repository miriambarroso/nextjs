import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroExperienciaProfissional from '@/components/candidato/experiencia-profissional/CadastroExperienciaProfissional';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/experiencia-profissional/schema';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import Router, { useRouter } from 'next/router';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';

import { useEffect } from 'react';
import ExperienciaProfissionalService from '@/services/ExperienciaProfissionalService';

type Props = {};

const Index = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { query } = useRouter();

  const onSubmit = async (data) => {
    try {
      const requestData: IFormacaoAcademica = {
        ...data,
        data_conclusao: data.data_atual ? null : data.data_conclusao,
      };

      await ExperienciaProfissionalService.update(requestData);
      toastSuccess('Formação acadêmica atualizada!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar formação acadêmica!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      ExperienciaProfissionalService.get(query?.pid as unknown as number).then(
        (data) => {
          reset({
            ...data,
            data_atual: data.data_fim === null,
          });
        },
      );
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Experiência Profissional'}
      onSubmit={(recaptcha) => {
        handleSubmit((data) => {
          onSubmit({ ...data, recaptcha });
        })();
      }}
      component={CadastroExperienciaProfissional}
      watch={watch}
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

import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroCursoEspecializacao from '@/components/candidato/curso-especializacao/CadastroCursoEspecializacao';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/candidato/curso-especializacao/schema';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';
import Router, { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import CursoEspecializacaoService from '@/services/CursoEspecializacaoService';
import { useEffect } from 'react';
import { objectFormData } from '@/utils';
import { isEmpty } from 'lodash';

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

  const { query } = useRouter();

  const onSubmit = async (data) => {
    try {
      const requestData = objectFormData({
        ...data,
        certificado: isEmpty(data.certificado) ? null : data.certificado[0],
      });
      await CursoEspecializacaoService.update(requestData, data.id);
      toastSuccess('Curso e escialização atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar curso e especialização!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      CursoEspecializacaoService.get(query?.pid as unknown as number).then(
        (data) => {
          reset({
            ...data,
          });
        },
      );
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Curso e Especialização'}
      onSubmit={(recaptcha) => {
        handleSubmit((data) => {
          onSubmit({ ...data, recaptcha });
        })();
      }}
      component={CadastroCursoEspecializacao}
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

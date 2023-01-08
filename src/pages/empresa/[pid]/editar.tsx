import { EMPREGADOR } from '@/store/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/empresa/editar/schema';
import Router, { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import { cnpjMask, phoneMask } from '@/utils/masks';
import BasicForm from '@/components/atoms/BasicForm';
import EditarEmpresaDadosCadastrais from '@/components/empresa/editar/EditarEmpresaDadosCadastrais';
import EmpresaService from '@/services/EmpresaService';

type Props = {};

const Page = ({}: Props) => {
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
      const requestData = {
        ...data,
      };
      await EmpresaService.update(requestData);
      toastSuccess('Dados cadastrais atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar os dados cadastrais!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      EmpresaService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
          cnpj: cnpjMask.mask(data.cnpj),
          telefone: data.telefone ? phoneMask.mask(data.telefone) : null,
        });
      });
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Dados Cadastrais'}
      onSubmit={(recaptcha) => {
        handleSubmit((data) => {
          onSubmit({ ...data, recaptcha });
        })();
      }}
      component={EditarEmpresaDadosCadastrais}
      register={register}
      errors={errors}
      watch={watch}
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

Page.permissions = [EMPREGADOR];

export default Page;

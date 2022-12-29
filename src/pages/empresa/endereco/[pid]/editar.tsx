import { ADMIN, CANDIDATO, EMPREGADOR, SUPERADMIN } from '@/store/auth';
import EditarEnderecoDadosCadastrais from '@/components/empresa/endereco/EditarEnderecoDadosCadastrais';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/empresa/endereco/schema';
import Router, { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import { cepMask } from '@/utils/masks';
import BasicForm from '@/components/atoms/BasicForm';
import EnderecoService from '@/services/EnderecoService';

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
      await EnderecoService.update(requestData);
      toastSuccess('Endereço atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar endereço!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      EnderecoService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
          cep: cepMask.mask(data?.cep ?? ''),
        });
      });
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Endereço'}
      onSubmit={handleSubmit(onSubmit)}
      component={EditarEnderecoDadosCadastrais}
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

Page.permissions = [SUPERADMIN, ADMIN, EMPREGADOR, CANDIDATO];

export default Page;

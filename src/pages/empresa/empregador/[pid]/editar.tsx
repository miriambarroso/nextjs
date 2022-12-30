import { ADMIN, EMPREGADOR, SUPERADMIN } from '@/store/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Router, { useRouter } from 'next/router';
import { format } from 'date-fns';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import { cpfMask, phoneMask } from '@/utils/masks';
import BasicForm from '@/components/atoms/BasicForm';
import { schema } from '@/components/empresa/empregador/schema';
import EmpregadorService from '@/services/EmpregadorService';
import EditEmpregadorDadosCadastrais from '@/components/empresa/empregador/EditEmpregadorDadosCadastrais';

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
        data_nascimento: format(data.data_nascimento, 'yyyy-MM-dd'),
      };
      await EmpregadorService.update(requestData);
      toastSuccess('Dados cadastrais atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar os dados cadastrais!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      EmpregadorService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
          cpf: cpfMask.mask(data.cpf),
          telefone: data.telefone ? phoneMask.mask(data.telefone) : null,
        });
      });
    }
  }, [query?.pid, reset]);

  return (
    <BasicForm
      title={'Dados Cadastrais'}
      onSubmit={handleSubmit(onSubmit)}
      component={EditEmpregadorDadosCadastrais}
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

Page.permissions = [SUPERADMIN, ADMIN, EMPREGADOR];

export default Page;

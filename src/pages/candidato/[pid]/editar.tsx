import { useForm } from 'react-hook-form';
import BasicForm from '@/components/atoms/BasicForm';
import CadastroCandidatoDadosPessoaisEdit from '@/components/candidato/CadastroCandidatoDadosPessoaisEdit';
import Router, { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils/toasts';
import { useEffect } from 'react';
import { schema } from '@/components/candidato/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import CandidatoService from '@/services/CandidatoService';
import { cpfMask, phoneMask } from '@/utils/masks';
import { format } from 'date-fns';
import { ADMIN, CANDIDATO, SUPERADMIN } from '@/store/auth';

type Props = {};

const Edit = ({}: Props) => {
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
      await CandidatoService.update(requestData);
      toastSuccess('Dados cadastrais atualizado!');
      Router.back();
    } catch (e) {
      toastError('Erro ao atualizar os dados cadastrais!');
    }
  };

  useEffect(() => {
    if (query.pid) {
      CandidatoService.get(query?.pid as unknown as number).then((data) => {
        reset({
          ...data,
          cpf: cpfMask.mask(data.cpf),
          telefone: phoneMask.mask(data.telefone),
          sexo: data.sexo?.toString(),
          estado_civil: data.estado_civil?.toString(),
          tipo_deficiencia: data.tipo_deficiencia?.toString(),
          possui_deficiencia: data.tipo_deficiencia === null ? 'false' : 'true',
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
      component={CadastroCandidatoDadosPessoaisEdit}
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

Edit.permissions = [SUPERADMIN, ADMIN, CANDIDATO];

export default Edit;

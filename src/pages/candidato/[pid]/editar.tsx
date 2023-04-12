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
import { objectFormData } from '@/utils';

type Props = {};

const Edit = ({}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { query } = useRouter();

  const onPartialSubmit = async (data: any) => {
    const formData = objectFormData(data);
    try {
      const data = await CandidatoService.partialUpdate(
        formData,
        query.pid as unknown as number,
      );
      toastSuccess('Dados cadastrais atualizado!');
      return data;
    } catch (e) {
      toastError('Erro ao atualizar os dados cadastrais!');
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      let requestData = {
        ...data,
        data_nascimento: format(data.data_nascimento, 'yyyy-MM-dd'),
        curriculo: data.curriculo ? data.curriculo[0] : null,
        foto: data.foto ? data.foto[0] : null,
      };

      requestData = CandidatoService.cleanUp(requestData);

      requestData = objectFormData(requestData);

      await CandidatoService.update(requestData, data.id, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
      setValue={setValue}
      handlers={{
        onPartialSubmit,
      }}
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

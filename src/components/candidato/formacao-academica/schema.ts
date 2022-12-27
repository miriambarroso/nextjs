import * as yup from 'yup';
import { dateMask, trimMask } from '@/utils/masks';

export const schema = yup.object().shape({
  instituicao: yup
    .string()
    .required('Instituição é obrigatória')
    .transform(trimMask.transform),
  curso: yup
    .string()
    .required('Curso é obrigatório')
    .transform(trimMask.transform),
  nivel: yup
    .string()
    .required('Nível de formação é obrigatório')
    .transform(trimMask.transform),
  data_inicio: yup
    .string()
    .required('Data de início é obrigatória')
    .transform(dateMask.transform),
  data_atual: yup.boolean(),
  data_conclusao: yup.string().when('data_atual', {
    is: false,
    then: yup
      .string()
      .required('Data de conclusão é obrigatória')
      .transform(dateMask.transform),
  }),
});

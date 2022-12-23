import * as yup from 'yup';
import { parseDateString, trimMask } from '@/utils/masks';

const today = new Date();
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
    .date()
    .transform(parseDateString)
    .typeError('Data de início é obrigatória')
    .max(today, 'Data de início deve ser menor ou igual a hoje'),
  data_atual: yup.boolean(),
  data_conclusao: yup
    .date()
    .transform(parseDateString)
    .when('data_atual', {
      is: false,
      then: yup
        .date()
        .required()
        .typeError('Data de conclusão é obrigatória')
        .max(today, 'Data de conclusão deve ser menor ou igual a hoje'),
    }),
});

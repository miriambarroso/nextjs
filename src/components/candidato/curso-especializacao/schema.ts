import * as yup from 'yup';
import { parseDateString, trimMask } from '@/utils/masks';

const today = new Date();

export const schema = yup.object().shape({
  instituicao: yup
    .string()
    .required('Instituição é obrigatório')
    .transform(trimMask.transform),
  curso: yup
    .string()
    .required('Curso é obrigatório')
    .transform(trimMask.transform),
  nivel: yup
    .string()
    .required('Nível é obrigatório')
    .transform(trimMask.transform),
  data_conclusao: yup
    .date()
    .transform(parseDateString)
    .typeError('Data de conclusão é obrigatória')
    .max(today, 'Data de conclusão deve ser menor ou igual a hoje'),
  duracao_horas: yup
    .number()
    .required('Tempo de duração é obrigatório')
    .typeError('Tempo de duração é obrigatório')
    .min(1, 'Tempo de duração deve ser maior que 0'),
});

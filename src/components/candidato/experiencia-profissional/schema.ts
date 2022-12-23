import * as yup from 'yup';
import { currencyMask, parseDateString, trimMask } from '@/utils/masks';

const today = new Date();
export const schema = yup.object().shape({
  empresa: yup
    .string()
    .required('Empresa é obrigatória')
    .transform(trimMask.transform),
  cargo: yup
    .string()
    .required('Cargo é obrigatório')
    .transform(trimMask.transform),
  salario: yup
    .string()
    .notRequired()
    .transform(currencyMask.transform)
    .test('greater-than-zero', 'Salário deve ser maior que zero', (value) =>
      !!value ? parseFloat(value) > 0 : true,
    ),
  data_inicio: yup
    .date()
    .transform(parseDateString)
    .typeError('Data de início é obrigatória')
    .max(today, 'Data de início deve ser menor ou igual a hoje'),
  data_atual: yup.boolean(),
  data_fim: yup
    .date()
    .transform(parseDateString)
    .when('data_atual', {
      is: false,
      then: yup
        .date()
        .required()
        .typeError('Data de término é obrigatória')
        .max(today, 'Data de término deve ser menor ou igual a hoje'),
    }),
  atividades: yup
    .string()
    .required('Atividades é obrigatório')
    .transform(trimMask.transform),
});

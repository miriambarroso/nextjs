import * as yup from 'yup';
import { currencyMask, dateMask, trimMask } from '@/utils/masks';

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
    .string()
    .required('Data de início é obrigatória')
    .transform(dateMask.transform),
  data_atual: yup.boolean(),
  data_fim: yup.string().when('data_atual', {
    is: false,
    then: yup
      .string()
      .required('Data de término é obrigatória')
      .transform(dateMask.transform),
  }),
  atividades: yup
    .string()
    .required('Atividades é obrigatório')
    .transform(trimMask.transform),
});

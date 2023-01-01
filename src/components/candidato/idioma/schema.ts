import * as yup from 'yup';
import { IdiomaChoices, IdiomaNivelChoices } from '@/utils/choices';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .nullable()
    .required('Idioma é obrigatório')
    .oneOf(IdiomaChoices.values, 'Idioma é obrigatório'),
  nivel: yup
    .number()
    .nullable()
    .required('Nível é obrigatório')
    .oneOf(IdiomaNivelChoices.valuesAsNumber, 'Nível inválido')
    .transform((value) => (Number.isNaN(value) ? null : value)),
});

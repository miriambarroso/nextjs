import * as yup from 'yup';
import { IdiomaChoices, IdiomaNivelChoices } from '@/utils/choices';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .required('Idioma é obrigatório')
    .oneOf(IdiomaChoices.values, 'Idioma é obrigatório'),
  nivel: yup
    .string()
    .required('Nível é obrigatório')
    .oneOf(IdiomaNivelChoices.values, 'Nível inválido'),
});

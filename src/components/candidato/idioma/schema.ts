import * as yup from 'yup';
import { IdiomaChoices, IdiomaNivelChoices } from '@/utils/choices';

export const schema = yup.object().shape({
  nome: yup
    .number()
    .required('Idioma é obrigatório')
    .oneOf(IdiomaChoices.valuesAsNumber, 'Idioma é obrigatório'),
  nivel: yup
    .number()
    .required('Nível é obrigatório')
    .oneOf(IdiomaNivelChoices.valuesAsNumber, 'Nível inválido'),
});

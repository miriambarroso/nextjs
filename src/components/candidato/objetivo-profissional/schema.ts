import * as yup from 'yup';
import { currencyMask, trimMask } from '@/utils/masks';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';

export const schema = yup.object().shape({
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
  modelo_trabalho: yup
    .number()
    .oneOf(ModeloTrabalhoChoices.valuesAsNumber, 'Modelo de trabalho inválido'),
  regime_contratual: yup
    .number()
    .oneOf(
      RegimeContratualChoices.valuesAsNumber,
      'Regime de contratação inválido',
    ),
  jornada_trabalho: yup
    .number()
    .oneOf(
      JornadaTrabalhoChoices.valuesAsNumber,
      'Jornada de trabalho inválida',
    ),
});

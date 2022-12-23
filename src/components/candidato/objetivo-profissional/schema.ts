import * as yup from 'yup';
import { currencyMask, trimMask } from '@/utils/masks';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';

export interface IObjetivoProfissional {
  cargo: string;
  salario: number;
  modelo_trabalho: string;
  regime_contratual: string;
  jornada_trabalho: string;
}

export const schema = yup.object().shape({
  cargo: yup.string().transform(trimMask.transform),
  salario: yup
    .string()
    .notRequired()
    .transform(currencyMask.transform)
    .test('greater-than-zero', 'Salário deve ser maior que zero', (value) =>
      !!value ? parseFloat(value) > 0 : true,
    ),
  modelo_trabalho: yup
    .string()
    .transform(trimMask.transform)
    .oneOf(ModeloTrabalhoChoices.values),
  regime_contratual: yup
    .string()
    .transform(trimMask.transform)
    .oneOf(RegimeContratualChoices.values),
  jornada_trabalho: yup
    .string()
    .transform(trimMask.transform)
    .oneOf(JornadaTrabalhoChoices.values),
});

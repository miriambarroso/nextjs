import * as yup from 'yup';

export interface IObjetivoProfissional {
  cargo: string;
  salario: number;
  modelo_trabalho: string;
  regime_contratual: string;
  jornada_trabalho: string;
}

export const schema = yup.object().shape({
  salario: yup
    .number()
    .notRequired()
    .transform((value) => (!!value ? parseFloat(value) : 0))
    .min(0, 'Salário deve ser maior que 0'),
});

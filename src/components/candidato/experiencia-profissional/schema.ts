import * as yup from 'yup';

export const schema = yup.object().shape({
  salario: yup
    .number()
    .notRequired()
    .transform((value) => (value ? parseFloat(value) : 0))
    .min(0, 'Salário deve ser maior que 0'),
});

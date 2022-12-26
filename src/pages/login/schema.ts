import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cpfMask } from '@/utils/masks';

export const schema = yup.object().shape({
  cpf: yup
    .string()
    .transform(cpfMask.transform)
    .required('CPF é obrigatório')
    .test('validateCPF', 'CPF Inválido', isValidCPF),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[a-z]+/, 'Deve conter ao menos uma letra minúscula')
    .matches(/[A-Z]+/, 'Deve conter ao menos uma letra maiúscula')
    .matches(/[0-9]+/, 'Deve conter ao menos um número')
    .matches(/[!@#$%^&*)(]+/, 'Deve conter ao menos um caracter especial'),
});

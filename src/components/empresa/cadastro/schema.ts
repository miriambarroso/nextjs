import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cnpjMask, cpfMask } from '@/utils/masks';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    // .matches(/^[a-zA-Z ]+$/, 'Nome deve conter apenas letras')
    .matches(/^[A-zÁ-ú]* [A-zÁ-ú]+( [A-zÁ-ú]*)*$/gi, 'Nome inválido')
    .transform((value) => value?.trim()),
  data_nascimento: yup.string().required('Data de nascimento é obrigatório'),
  cpf: yup
    .string()
    .transform(cpfMask.transform)
    .required('CPF é obrigatório')
    .test('validateCPF', 'CPF Inválido', isValidCPF),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('validatePhone', 'Telefone inválido', (value) => {
      return isValidPhone(value);
    }),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[a-z]+/, 'Deve conter ao menos uma letra minúscula')
    .matches(/[A-Z]+/, 'Deve conter ao menos uma letra maiúscula')
    .matches(/[0-9]+/, 'Deve conter ao menos um número')
    .matches(/[!@#$%^&*)(]+/, 'Deve conter ao menos um caracter especial'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password'), null], 'Senhas não conferem'),
  cnpj: yup
    .string()
    .transform(cnpjMask.transform)
    .required('CNPJ é obrigatório')
    .test('validateCNPJ', 'CNPJ Inválido', isValidCPF),
  razao_social: yup
    .string()
    .required('Razão social é obrigatório')
    .transform((value) => value?.trim()),
  nome_fantasia: yup
    .string()
    .required('Nome fantasia é obrigatório')
    .transform((value) => value?.trim()),
  ramo_atividade: yup
    .string()
    .required('Ramo de atividade é obrigatório')
    .transform((value) => value?.trim()),
  // currency: yup
  //   .number()
  //   .transform((_, originalValue) =>
  //     masks.currencyMask.transform(originalValue),
  //   ),
});

import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cpfMask } from '@/utils/masks';

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
    .test('validateCpfOrCnpj', 'CPF Inválido', isValidCPF),
  sexo: yup.string().required('Sexo é obrigatório'),
  estado_civil: yup.string().required('Estado civil é obrigatório'),
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

  // currency: yup
  //   .number()
  //   .transform((_, originalValue) =>
  //     masks.currencyMask.transform(originalValue),
  //   ),
});

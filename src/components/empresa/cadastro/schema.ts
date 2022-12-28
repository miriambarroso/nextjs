import { isValidCNPJ, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import {
  cepMask,
  cnpjMask,
  numberMask,
  phoneMask,
  trimMask,
} from '@/utils/masks';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  nome: schemas.nome(true),
  data_nascimento: schemas.data_nascimento(true),
  cpf: schemas.cpf(true),
  atuacao: yup.string().transform(trimMask.transform),
  cargo: yup.string().transform(trimMask.transform),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup
    .string()
    .nullable()
    .required('Telefone é obrigatório')
    .test('validatePhone', 'Telefone inválido', isValidPhone)
    .transform(phoneMask.transform),
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
    .test('validateCNPJ', 'CNPJ Inválido', isValidCNPJ),
  razao_social: yup
    .string()
    .required('Razão social é obrigatório')
    .transform(trimMask.transform),
  nome_fantasia: yup
    .string()
    .required('Nome fantasia é obrigatório')
    .transform(trimMask.transform),
  ramo_atividade: yup
    .string()
    .required('Ramo de atividade é obrigatório')
    .transform(trimMask.transform),
  numero_funcionarios: yup
    .string()
    .typeError('Número de funcionários é obrigatório')
    .transform(numberMask.transform),
  descricao: yup
    .string()
    .required('Descrição é obrigatório')
    .transform(trimMask.transform),
  empresa_telefone: yup
    .string()
    .nullable()
    .required('Telefone é obrigatório')
    .test('validatePhone', 'Telefone inválido', isValidPhone)
    .transform(phoneMask.transform),
  empresa_email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  site: yup.string().url('Site inválido'),
  cep: yup.string().transform(cepMask.transform),
  logradouro: yup.string().transform(trimMask.transform),
  numero: yup.string().transform(trimMask.transform),
  complemento: yup.string().transform(trimMask.transform),
  bairro: yup.string().transform(trimMask.transform),
  cidade: yup.string().transform(trimMask.transform),
  estado: yup.string().transform(trimMask.transform),

  // currency: yup
  //   .number()
  //   .transform((_, originalValue) =>
  //     masks.currencyMask.transform(originalValue),
  //   ),
});

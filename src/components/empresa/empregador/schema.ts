import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cpfMask, parseDateString, phoneMask, trimMask } from '@/utils/masks';
import { subYears } from 'date-fns';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    // .matches(/^[a-zA-Z ]+$/, 'Nome deve conter apenas letras')
    .matches(/^[A-zÁ-ú]* [A-zÁ-ú]+( [A-zÁ-ú]*)*$/gi, 'Nome inválido')
    .transform(trimMask.transform),
  data_nascimento: yup
    .date()
    .nullable()
    .required('Data de nascimento é obrigatório')
    .transform(parseDateString)
    .min(new Date(1900, 0, 1), 'Data de nascimento inválida')
    .max(subYears(new Date(), 14), 'Você deve ter no mínimo 14 anos'),
  cpf: yup
    .string()
    .transform(cpfMask.transform)
    .required('CPF é obrigatório')
    .test('validateCpfOrCnpj', 'CPF Inválido', isValidCPF),
  atuacao: yup.string().transform(trimMask.transform),
  cargo: yup.string().transform(trimMask.transform),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup
    .string()
    .nullable()
    .required('Telefone é obrigatório')
    .test('validatePhone', 'Telefone inválido', isValidPhone)
    .transform(phoneMask.transform),
});

import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cpfMask } from '@/utils/masks';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  cpf: yup
    .string()
    .transform(cpfMask.transform)
    .required('CPF é obrigatório')
    .test('validateCPF', 'CPF Inválido', isValidCPF),
});

export const schemaToken = yup.object().shape({
  password: schemas.password(true),
  confirm_password: schemas.confirm_password(true),
});

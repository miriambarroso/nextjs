import * as yup from 'yup';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  cpf: schemas.cpf(true, true),
});

export const schemaToken = yup.object().shape({
  password: schemas.password(true),
  confirm_password: schemas.confirm_password(true),
});

import schemas from '@/utils/schemas';
import * as yup from 'yup';

export const schema = yup.object().shape({
  cep: schemas.cep(false, true),
  logradouro: schemas.logradouro(false, true),
  numero: schemas.numero(false, true),
  complemento: schemas.complemento(false, true),
  bairro: schemas.bairro(false, true),
  cidade: schemas.cidade(false, true),
  estado: schemas.estado(false, true),
});

import * as yup from 'yup';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  nome: schemas.nome(true, true),
  data_nascimento: schemas.data_nascimento(true, true),
  cpf: schemas.cpf(true, false),
  atuacao: schemas.atuacao(false, true),
  cargo: schemas.cargo(false, true),
  email: schemas.email(true, true),
  telefone: schemas.telefone(true, true),
});

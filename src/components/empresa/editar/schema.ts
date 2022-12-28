import * as yup from 'yup';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  cnpj: schemas.cnpj(true, false),
  razao_social: schemas.razao_social(true, false),
  nome_fantasia: schemas.nome_fantasia(true, false),
  ramo_atividade: schemas.ramo_atividade(true, false),
  numero_funcionarios: schemas.numero_funcionarios(false, false),
  descricao: schemas.descricao(false, false),
  telefone: schemas.telefone(true, true),
  email: schemas.email(true, false),
  site: schemas.site(false, true),
});

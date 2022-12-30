import * as yup from 'yup';
import schemas from '@/utils/schemas';

const vagasSchema = yup.object().shape({
  empresa: schemas.nome_fantasia(false, true),
  salario: schemas.salario(false, true),
  modelo_trabalho: schemas.modelo_trabalho(false, true),
  regime_contratual: schemas.regime_contratual(false, true),
  jornada_trabalho: schemas.jornada_trabalho(false, true),
});

export default vagasSchema;

import * as yup from 'yup';
import schemas from '@/utils/schemas';
import { SexoChoicesBoth } from '@/utils/choices';

export const schema = yup.object().shape({
  regime_contratual: schemas.regime_contratual(true, true),
  cargo: schemas.cargo(true, true),
  esta_ativo: yup.boolean().nullable(),
  atividades: schemas.atividades(true, true),
  requisitos: schemas.requisitos(true, true),
  salario: schemas.salario(true, true),
  jornada_trabalho: schemas.jornada_trabalho(true, true),
  modelo_trabalho: schemas.modelo_trabalho(true, true),
  sexo: schemas.sexo(false, true, SexoChoicesBoth),
  idade_minima: schemas.idade_minima(false, true),
  idade_maxima: schemas.idade_maxima(false, true),
  quantidade_vagas: schemas.quantidade_vagas(true, true),
  pessoa_deficiencia: yup.boolean().nullable(),
  beneficios: yup.array().nullable().of(schemas.beneficio(false, true)),
});

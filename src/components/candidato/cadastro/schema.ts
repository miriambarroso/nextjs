import * as yup from 'yup';
import schemas from '@/utils/schemas';

export const schema = yup.object().shape({
  nome: schemas.nome(true, false),
  data_nascimento: schemas.data_nascimento(true, false),
  cpf: schemas.cpf(true, false),
  sexo: schemas.sexo(true, true),
  estado_civil: schemas.estado_civil(true, true),
  possui_deficiencia: yup
    .boolean()
    .typeError('Possui deficiencia é obrigatório'),
  tipo_deficiencia: yup
    .number()
    .nullable()
    .when('possui_deficiencia', {
      is: true,
      then: schemas.tipo_deficiencia(true, true),
    }),
  email: schemas.email(true),
  telefone: schemas.telefone(true),
  password: schemas.password(true),
  confirm_password: schemas.confirm_password(true),
  cargo: schemas.cargo(true),
  salario: schemas.salario(true),
  modelo_trabalho: schemas.modelo_trabalho(true, true),
  regime_contratual: schemas.regime_contratual(true, true),
  jornada_trabalho: schemas.jornada_trabalho(true, true),
});

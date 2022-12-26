import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import {
  cpfMask,
  currencyMask,
  numberMask,
  parseDateString,
  parseNumberString,
  trimMask,
} from '@/utils/masks';
import {
  EstadoCivilChoices,
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
  SexoChoices,
  TipoDeficienciaChoices,
} from '@/utils/choices';
import { subYears } from 'date-fns';

export interface ICadastroCandidato {}

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
  sexo: yup
    .number()
    .nullable()
    .required('Sexo é obrigatório')
    .oneOf(SexoChoices.valuesAsNumber, 'Sexo inválido'),
  estado_civil: yup
    .number()
    .nullable()
    .required('Estado civil é obrigatório')
    .oneOf(EstadoCivilChoices.valuesAsNumber, 'Estado civil inválido'),
  possui_deficiencia: yup
    .boolean()
    .typeError('Possui deficiencia é obrigatório'),
  tipo_deficiencia: yup
    .number()
    .nullable()
    .when('possui_deficiencia', {
      is: true,
      then: yup
        .number()
        .nullable()
        .required('Informe o tipo de deficiência')
        .oneOf(
          TipoDeficienciaChoices.valuesAsNumber,
          'Tipo de deficiência inválido',
        ),
    }),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('validatePhone', 'Telefone inválido', (value) => {
      return isValidPhone(value);
    })
    .transform(numberMask.transform),
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
  cargo: yup
    .string()
    .required('Cargo é obrigatório')
    .transform(trimMask.transform),
  salario: yup
    .string()
    .required('Salário é obrigatório')
    .transform(currencyMask.transform)
    .test('greater-than-zero', 'Salário deve ser maior que zero', (value) =>
      !!value ? parseFloat(value) > 0 : true,
    ),
  modelo_trabalho: yup
    .number()
    .nullable()
    .required('Modelo de trabalho é obrigatório')
    .transform(parseNumberString)
    .oneOf(ModeloTrabalhoChoices.valuesAsNumber, 'Modelo de trabalho inválido'),
  regime_contratual: yup
    .number()
    .nullable()
    .required('Regime de contração é obrigatório')
    .transform(parseNumberString)
    .oneOf(
      RegimeContratualChoices.valuesAsNumber,
      'Regime de contratação inválido',
    ),
  jornada_trabalho: yup
    .number()
    .nullable()
    .required('Jornada de trabalho é obrigatório')
    .transform(parseNumberString)
    .oneOf(
      JornadaTrabalhoChoices.valuesAsNumber,
      'Jornada de trabalho inválida',
    ),
  // currency: yup
  //   .number()
  //   .transform((_, originalValue) =>
  //     masks.currencyMask.transform(originalValue),
  //   ),
});

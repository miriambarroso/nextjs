import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';
import * as yup from 'yup';

import { cpfMask, parseDateString, phoneMask, trimMask } from '@/utils/masks';
import {
  EstadoCivilChoices,
  SexoChoices,
  TipoDeficienciaChoices,
} from '@/utils/choices';
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
    .test('validatePhone', 'Telefone inválido', isValidPhone)
    .transform(phoneMask.transform),
});

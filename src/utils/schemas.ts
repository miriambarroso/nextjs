import * as yup from 'yup';
import {
  cnpjMask,
  cpfMask,
  currencyMask,
  numberMask,
  parseDateString,
  parseNumberString,
  phoneMask,
  trimMask,
} from '@/utils/masks';
import { subYears } from 'date-fns';
import {
  isValidCNPJ,
  isValidCPF,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';
import {
  EstadoCivilChoices,
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
  SexoChoices,
  TipoDeficienciaChoices,
} from '@/utils/choices';

export default {
  nome: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Nome é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s.transform(trimMask.transform);
  },
  data_nascimento: (require = false, nullable = false, min = 14) => {
    let s = yup.date();
    if (require) {
      s = s.required('Data de nascimento é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(parseDateString)
      .min(new Date(1900, 0, 1), 'Data de nascimento inválida')
      .max(subYears(new Date(), min), 'Você deve ter no mínimo 14 anos');
  },
  cpf: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('CPF é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(cpfMask.transform)
      .test('validateCpfOrCnpj', 'CPF Inválido', isValidCPF);
  },
  sexo: (require = false, nullable = false) => {
    let s = yup.number();

    if (require) {
      s = s.required('Sexo é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }

    return s
      .transform(parseNumberString)
      .oneOf(SexoChoices.valuesAsNumber, 'Sexo inválido');
  },
  estado_civil: (require = false, nullable = false) => {
    let s = yup.number();

    if (require) {
      s = s.required('Estado civil é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }

    return s
      .transform(parseNumberString)
      .oneOf(EstadoCivilChoices.valuesAsNumber, 'Estado civil inválido');
  },
  tipo_deficiencia: (require = false, nullable = false) => {
    let s = yup.number();
    if (require) {
      s = s.required('Informe o tipo de deficiência');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(parseNumberString)
      .oneOf(
        TipoDeficienciaChoices.valuesAsNumber,
        'Tipo de deficiência inválido',
      );
  },
  email: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Email é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s.email('Email inválido');
  },
  telefone: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Telefone é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .test('validatePhone', 'Telefone inválido', isValidPhone)
      .transform(phoneMask.transform);
  },
  password: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('CPF é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .matches(/[a-z]+/, 'Deve conter ao menos uma letra minúscula')
      .matches(/[A-Z]+/, 'Deve conter ao menos uma letra maiúscula')
      .matches(/[0-9]+/, 'Deve conter ao menos um número')
      .matches(/[!@#$%^&*)(]+/, 'Deve conter ao menos um caracter especial');
  },
  confirm_password: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Confirmação de senha é obrigatória');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s.oneOf([yup.ref('password'), null], 'Senhas não conferem');
  },
  cargo: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Cargo é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s.transform(trimMask.transform);
  },
  salario: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Salário é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(currencyMask.transform)
      .test('greater-than-zero', 'Salário deve ser maior que zero', (value) =>
        !!value ? parseFloat(value) > 0 : true,
      );
  },
  modelo_trabalho: (require = false, nullable = false) => {
    let s = yup.number();
    if (require) {
      s = s.required('Modelo de trabalho é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(parseNumberString)
      .oneOf(
        ModeloTrabalhoChoices.valuesAsNumber,
        'Modelo de trabalho inválido',
      );
  },
  regime_contratual: (require = false, nullable = false) => {
    let s = yup.number();
    if (require) {
      s = s.required('Regime de contração é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(parseNumberString)
      .oneOf(
        RegimeContratualChoices.valuesAsNumber,
        'Regime de contratação inválido',
      );
  },
  jornada_trabalho: (require = false, nullable = false) => {
    let s = yup.number();
    if (require) {
      s = s.required('Jornada de trabalho é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(parseNumberString)
      .oneOf(
        JornadaTrabalhoChoices.valuesAsNumber,
        'Jornada de trabalho inválida',
      );
  },
  cnpj: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('CNPJ é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s
      .transform(cnpjMask.transform)
      .test('validateCNPJ', 'CNPJ Inválido', isValidCNPJ);
  },
  razao_social: (require = false, nullable = false) => {
    let s = yup.string();

    if (require) {
      s = s.required('Razão Social é obrigatório');
    }

    if (nullable) {
      s = s.nullable();
    }

    return s.transform(trimMask.transform);
  },
  nome_fantasia: (require = false, nullable = false) => {
    let s = yup.string();

    if (require) {
      s = s.required('Nome Fantasia é obrigatório');
    }

    if (nullable) {
      s = s.nullable();
    }

    return s.transform(trimMask.transform);
  },
  ramo_atividade: (require = false, nullable = false) => {
    let s = yup.string();

    if (require) {
      s = s.required('Ramo de atividade é obrigatório');
    }

    if (nullable) {
      s = s.nullable();
    }

    return s.transform(trimMask.transform);
  },
  numero_funcionarios: (require = false, nullable = false) => {
    let s = yup.string();

    if (require) {
      s = s.required('Número de funcionários é obrigatório');
    }

    if (nullable) {
      s = s.nullable();
    }

    return s.transform(numberMask.transform);
  },
  descricao: (require = false, nullable = false) => {
    let s = yup.string();

    if (require) {
      s = s.required('Descrição é obrigatório');
    }

    if (nullable) {
      s = s.nullable();
    }

    return s.transform(trimMask.transform);
  },
  site: (require = false, nullable = false) => {
    let s = yup.string();
    if (require) {
      s = s.required('Site é obrigatório');
    }
    if (nullable) {
      s = s.nullable();
    }
    return s.url('Site inválido');
  },
};

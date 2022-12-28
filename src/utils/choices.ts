export interface IChoice {
  label: string;
  value: string;
}

class Choices {
  private readonly _choices: IChoice[] = [];

  constructor(choices: IChoice[]) {
    this._choices = choices;
  }

  get choices(): IChoice[] {
    return this._choices;
  }

  get labels(): string[] {
    return this._choices.map((choice) => choice.label);
  }

  get values(): string[] {
    return this._choices.map((choice) => choice.value);
  }

  get valuesAsNumber(): number[] {
    return this._choices.map((choice) => parseInt(choice.value));
  }

  get findByIntValue(): (value: number) => IChoice {
    return (value: number) => {
      return this._choices.find((choice) => parseInt(choice.value) === value);
    };
  }
}

export const SexoChoices = new Choices([
  { label: 'Feminino', value: '1' },
  { label: 'Masculino', value: '2' },
  { label: 'Não Informar', value: '3' },
]);

export const EstadoCivilChoices = new Choices([
  { label: 'Solteiro(a)', value: '1' },
  { label: 'Casado(a)', value: '2' },
  { label: 'Separado(a)', value: '3' },
  { label: 'Divorciado(a)', value: '4' },
  { label: 'Viúvo(a)', value: '5' },
  { label: 'União Estável', value: '6' },
  { label: 'Outro', value: '7' },
]);

export const PossuiDeficienciaChoices = new Choices([
  { label: 'Não', value: 'false' },
  { label: 'Sim', value: 'true' },
]);

export const IdiomaNivelChoices = new Choices([
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
  { label: 'Fluente', value: '4' },
  { label: 'Nativo', value: '5' },
]);

export const TipoDeficienciaChoices = new Choices([
  { label: 'Auditiva', value: '1' },
  { label: 'Mental', value: '2' },
  { label: 'Física', value: '3' },
  { label: 'Visual', value: '4' },
  { label: 'Múltipla', value: '5' },
  { label: 'Outra', value: '6' },
]);

export const FormacaoNivelChoices = new Choices([
  { label: 'Ensino Fundamental', value: '1' },
  { label: 'Ensino Médio', value: '2' },
  { label: 'Ensino Superior', value: '3' },
  { label: 'Pós-Graduação', value: '4' },
  { label: 'Mestrado', value: '5' },
  { label: 'Doutorado', value: '6' },
  { label: 'Pós-Doutorado', value: '7' },
]);

export const JornadaTrabalhoChoices = new Choices([
  { label: 'Integral', value: '1' },
  { label: 'Parcial', value: '2' },
  { label: 'Flexível', value: '3' },
]);

export const ModeloTrabalhoChoices = new Choices([
  { label: 'Presencial', value: '1' },
  { label: 'Remoto', value: '2' },
  { label: 'Híbrido', value: '3' },
]);

export const RegimeContratualChoices = new Choices([
  { label: 'CLT', value: '1' },
  { label: 'PJ', value: '2' },
  { label: 'Estágio', value: '3' },
  { label: 'Temporário', value: '4' },
  { label: 'Freelancer', value: '5' },
  { label: 'Voluntário', value: '6' },
  { label: 'Outro', value: '7' },
]);

export const IdiomaChoices = new Choices([
  { label: 'Português', value: 'português' },
  { label: 'Inglês', value: 'inglês' },
  { label: 'Espanhol', value: 'espanhol' },
  { label: 'Francês', value: 'francês' },
  { label: 'Alemão', value: 'alemão' },
  { label: 'Italiano', value: 'italiano' },
  { label: 'Japonês', value: 'japonês' },
  { label: 'Coreano', value: 'coreano' },
  { label: 'Mandarim', value: 'mandarim' },
  { label: 'Russo', value: 'russo' },
  { label: 'Árabe', value: 'árabe' },
  { label: 'Árabe Egípcio', value: 'árabe egípcio' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Birmanês', value: 'birmanês' },
  { label: 'Indonésio', value: 'indonésio' },
  { label: 'Persa', value: 'persa' },
  { label: 'Polonês', value: 'polonês' },
  { label: 'Ucraniano', value: 'ucraniano' },
  { label: 'Urdu', value: 'urdu' },
  { label: 'Turco', value: 'turco' },
  { label: 'Tailandês', value: 'tailandês' },
  { label: 'Somali', value: 'somali' },
  { label: 'Romeno', value: 'romeno' },
  { label: 'Hindi', value: 'hindi' },
]);

export interface IVaga {
  id?: number;
  cargo: string;
  atividades: string;
  requisitos: string;
  pessoa_deficiencia: boolean;
  salario: number;
  jornada_trabalho: number;
  modelo_trabalho: number;
  regime_contratual: number;
  sexo: number;
  idade_minima: number;
  idade_maxima: number;
  quantidade_vagas: number;
  habilitado: boolean;
  // beneficios: IBeneficio[];
  empresa: number;
}

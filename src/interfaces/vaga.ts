import { IBeneficio } from '@/interfaces/beneficio';
import { IEmpresaVaga } from '@/interfaces/empresa';

export interface IVaga {
  id?: number;
  cargo: string;
  esta_ativo?: boolean;
  atividades: string;
  requisitos: string;
  pessoa_deficiencia: boolean;
  salario: string;
  jornada_trabalho: number;
  modelo_trabalho: number;
  regime_contratual: number;
  sexo: number;
  idade_minima: number;
  idade_maxima: number;
  quantidade_vagas: number;
  habilitado: boolean;
  beneficios: IBeneficio[];
  empresa: IEmpresaVaga;
  created_at?: string;
  updated_at?: string;
}

export interface IVagaCreate extends Omit<IVaga, 'beneficios'> {
  beneficios: number[];
}

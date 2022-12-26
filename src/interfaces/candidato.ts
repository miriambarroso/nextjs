import { IObjetivoProfissional } from '@/interfaces/objetivoProfissional';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import { IIdioma } from '@/interfaces/idioma';
import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';
import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';

export interface ICandidato {
  id?: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  sexo?: number;
  estado_civil?: number;
  tipo_deficiencia?: number;
  email: string;
  telefone?: string;
  curriculo?: any;
  foto?: any;
  habilitado?: boolean;
}

export interface ICandidatoCreate extends IObjetivoProfissional {
  nome: string;
  cpf: string;
  data_nascimento: string;
  sexo?: number;
  estado_civil?: number;
  tipo_deficiencia?: number;
  email: string;
  telefone?: string;
  curriculo?: string;
}

export interface ICandidatoPerfil extends ICandidato {
  objetivo_profissional: IObjetivoProfissional;
  formacao_academica: IFormacaoAcademica[];
  idioma: IIdioma[];
  curso_especializacao: ICursoEspecializacao[];
  experiencia_profissional: IExperienciaProfissional[];
}

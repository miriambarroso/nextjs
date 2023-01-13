import { IObjetivoProfissional } from '@/interfaces/objetivoProfissional';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import { IIdioma } from '@/interfaces/idioma';
import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';
import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import { IUser } from '@/interfaces/user';

export interface ICandidato extends IUser {}

export interface ICandidatoCreate extends FormData {}

export interface ICandidatoPerfil extends ICandidato {
  objetivo_profissional: IObjetivoProfissional;
  formacao_academica: IFormacaoAcademica[];
  idioma: IIdioma[];
  curso_especializacao: ICursoEspecializacao[];
  experiencia_profissional: IExperienciaProfissional[];
}

export interface ICandidatoList extends ICandidato {
  objetivo_profissional: IObjetivoProfissional;
}

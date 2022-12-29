import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import CRLUDService from '@/services/CRLUDService';

class FormacaoAcademicaService extends CRLUDService<
  IFormacaoAcademica,
  IFormacaoAcademica,
  IFormacaoAcademica,
  IFormacaoAcademica,
  IFormacaoAcademica
> {
  constructor() {
    super('formacao_academica');
  }
}

export default new FormacaoAcademicaService();

import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import CRUDService from '@/services/CRUDService';

class FormacaoAcademicaService extends CRUDService<IFormacaoAcademica> {
  constructor() {
    super('formacao_academica');
  }
}

export default new FormacaoAcademicaService();

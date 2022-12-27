import CRUDService from '@/services/CRUDService';
import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';

class CursoEspecializacaoService extends CRUDService<ICursoEspecializacao> {
  constructor() {
    super('curso_especializacao');
  }
}

export default new CursoEspecializacaoService();

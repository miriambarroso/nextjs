import CRLUDService from '@/services/CRLUDService';
import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';

class CursoEspecializacaoService extends CRLUDService<
  ICursoEspecializacao,
  ICursoEspecializacao,
  ICursoEspecializacao,
  ICursoEspecializacao,
  ICursoEspecializacao
> {
  constructor() {
    super('curso_especializacao');
  }
}

export default new CursoEspecializacaoService();

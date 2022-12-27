import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import CRUDService from '@/services/CRUDService';

class ExperienciaProfissionalService extends CRUDService<IExperienciaProfissional> {
  constructor() {
    super('experiencia_profissional');
  }
}

export default new ExperienciaProfissionalService();

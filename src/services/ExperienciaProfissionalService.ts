import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import CRLUDService from '@/services/CRLUDService';

class ExperienciaProfissionalService extends CRLUDService<
  IExperienciaProfissional,
  IExperienciaProfissional,
  IExperienciaProfissional,
  IExperienciaProfissional,
  IExperienciaProfissional
> {
  constructor() {
    super('experiencia_profissional');
  }
}

export default new ExperienciaProfissionalService();

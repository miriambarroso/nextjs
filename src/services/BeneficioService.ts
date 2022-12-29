import CRLUDService from '@/services/CRLUDService';
import { IBeneficio } from '@/interfaces/beneficio';

class BeneficioService extends CRLUDService<
  IBeneficio,
  IBeneficio,
  IBeneficio,
  IBeneficio,
  IBeneficio
> {
  constructor() {
    super('beneficio');
  }
}

export default new BeneficioService();

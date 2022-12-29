import CRUDService from '@/services/CRUDService';
import { IVaga } from '@/interfaces/vaga';

class VagaService extends CRUDService<IVaga> {
  constructor() {
    super('vaga');
  }
}

export default new VagaService();

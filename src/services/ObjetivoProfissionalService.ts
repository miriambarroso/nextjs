import CRUDService from '@/services/CRUDService';
import { IObjetivoProfissional } from '@/interfaces/objetivoProfissional';

class ObjetivoProfissionalService extends CRUDService<IObjetivoProfissional> {
  constructor() {
    super('objetivo_profissional');
  }

  async get(id: number) {
    let responseData = await super.get(id);
    responseData.salario = parseFloat(responseData?.salario)
      .toFixed(2)
      .replace('.', ',');
    return responseData;
  }
}

export default new ObjetivoProfissionalService();

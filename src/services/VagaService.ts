import CRLUDService from '@/services/CRLUDService';
import { IVaga, IVagaCreate } from '@/interfaces/vaga';

class VagaService extends CRLUDService<
  IVagaCreate,
  IVaga,
  IVaga,
  IVagaCreate,
  IVaga
> {
  constructor() {
    super('vaga');
  }

  async get(id: number) {
    let responseData = await super.get(id);
    responseData.salario = parseFloat(responseData?.salario)
      .toFixed(2)
      .replace('.', ',');
    return responseData;
  }

  async getAll(query?: any) {
    let data = await super.getAll(query);

    data.results.forEach((vaga: IVaga) => {
      vaga.salario = parseFloat(vaga.salario).toFixed(2).replace('.', ',');
    });

    return data;
  }
}

export default new VagaService();

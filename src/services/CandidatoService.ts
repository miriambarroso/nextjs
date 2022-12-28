import axiosInstance from '@/utils/axios';
import { ICandidatoCreate } from '@/interfaces/candidato';
import CRUDService from '@/services/CRUDService';
import { currencyMask } from '@/utils/masks';

class CandidatoService extends CRUDService<ICandidatoCreate> {
  constructor() {
    super('candidato');
  }

  async get(id: number) {
    let responseData = await super.get(id);

    if (responseData?.objetivo_profissional) {
      responseData.objetivo_profissional = {
        ...responseData.objetivo_profissional,
        salario: currencyMask.mask(
          parseFloat(responseData?.objetivo_profissional?.salario)
            .toFixed(2)
            .replace('.', ','),
        ),
      };
    }
    return responseData;
  }

  async perfil() {
    const { data } = await axiosInstance.get(`${this.baseUrl}/perfil`);
    return data;
  }
}

export default new CandidatoService();

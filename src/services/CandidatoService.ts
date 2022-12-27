import axiosInstance from '@/utils/axios';
import { ICandidatoCreate } from '@/interfaces/candidato';
import CRUDService from '@/services/CRUDService';

class CandidatoService extends CRUDService<ICandidatoCreate> {
  constructor() {
    super('candidato');
  }

  async perfil() {
    const response = await axiosInstance.get('/candidato/perfil');
    return response.data;
  }
}

export default new CandidatoService();

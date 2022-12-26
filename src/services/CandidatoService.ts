import axiosInstance from '@/utils/axios';
import { ICandidatoCreate } from '@/interfaces/candidato';

class CandidatoService {
  async create(candidato: NonNullable<ICandidatoCreate>) {
    const response = await axiosInstance.post('/candidato', candidato);
    return response.data;
  }

  async perfil() {
    const response = await axiosInstance.get('/candidato/perfil');
    return response.data;
  }
}

export default new CandidatoService();

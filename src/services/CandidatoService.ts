import axiosInstance from '@/utils/axios';
import {
  ICandidato,
  ICandidatoCreate,
  ICandidatoPerfil,
} from '@/interfaces/candidato';
import CRLUDService from '@/services/CRLUDService';

class CandidatoService extends CRLUDService<
  ICandidatoCreate,
  ICandidato,
  ICandidatoCreate,
  ICandidatoCreate,
  ICandidatoCreate
> {
  constructor() {
    super('candidato');
  }

  async perfil(): Promise<ICandidatoPerfil> {
    const { data } = await axiosInstance.get(`${this.baseUrl}/perfil`);

    if (data?.objetivo_profissional) {
      data.objetivo_profissional = {
        ...data.objetivo_profissional,
        salario: parseFloat(data?.objetivo_profissional?.salario)
          .toFixed(2)
          .replace('.', ','),
      };
    }

    return data;
  }
}

export default new CandidatoService();

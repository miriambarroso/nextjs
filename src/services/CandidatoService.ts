import axiosInstance from '@/utils/axios';
import {
  ICandidato,
  ICandidatoCreate,
  ICandidatoList,
  ICandidatoPerfil,
} from '@/interfaces/candidato';
import CRLUDService from '@/services/CRLUDService';
import { IPagination } from '@/interfaces/pagination';

class CandidatoService extends CRLUDService<
  ICandidatoCreate,
  ICandidato,
  ICandidatoPerfil,
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

  async getByVaga(
    id: number,
    page = 1,
    recomendacao = false,
  ): Promise<IPagination<ICandidatoPerfil>> {
    const { data } = await axiosInstance.get(`${this.baseUrl}/vaga/${id}`, {
      params: {
        page,
        recomendacao,
      },
    });

    return data;
  }

  async getAll(query?: any) {
    let data = await super.getAll(query);

    data.results.forEach((candidato) => {
      candidato.objetivo_profissional.salario = parseFloat(
        candidato.objetivo_profissional.salario,
      )
        .toFixed(2)
        .replace('.', ',');
    });

    return data;
  }
}

export default new CandidatoService();

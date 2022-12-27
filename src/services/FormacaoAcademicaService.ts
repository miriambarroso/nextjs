import axiosInstance from '@/utils/axios';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';

class FormacaoAcademicaService {
  async create(formacaoAcademica: IFormacaoAcademica) {
    const response = await axiosInstance.post(
      '/formacao_academica',
      formacaoAcademica,
    );
    return response.data;
  }

  async get(id: number) {
    const response = await axiosInstance.get(`/formacao_academica/${id}`);
    return response.data;
  }

  async update(formacaoAcademica: IFormacaoAcademica) {
    const response = await axiosInstance.put(
      `/formacao_academica/${formacaoAcademica.id}`,
      formacaoAcademica,
    );
    return response.data;
  }
}

export default new FormacaoAcademicaService();

import CRLUDService from '@/services/CRLUDService';
import { IEmpregador, IEmpregadorCreate } from '@/interfaces/empregador';
import axiosInstance from '@/utils/axios';
import { IEmpresa } from '@/interfaces/empresa';

class EmpregadorService extends CRLUDService<
  IEmpregador,
  IEmpregador,
  IEmpregador,
  IEmpregador,
  IEmpregador
> {
  constructor() {
    super('empregador');
  }

  async create(item: IEmpregadorCreate) {
    return super.create(item);
  }

  async perfil() {
    const { data } = await axiosInstance.get(`${this.baseUrl}/perfil`);
    return data;
  }

  async getEmpresa(userID: number): Promise<IEmpresa> {
    const { data } = await axiosInstance.get(
      `${this.baseUrl}/${userID}/empresa`,
    );
    return data;
  }
}

export default new EmpregadorService();

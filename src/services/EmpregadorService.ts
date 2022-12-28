import CRUDService from '@/services/CRUDService';
import { IEmpregador, IEmpregadorCreate } from '@/interfaces/empregador';
import axiosInstance from '@/utils/axios';

class EmpregadorService extends CRUDService<IEmpregador> {
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
}

export default new EmpregadorService();

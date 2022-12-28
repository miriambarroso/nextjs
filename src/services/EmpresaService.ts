import CRUDService from '@/services/CRUDService';
import { IEmpresa } from '@/interfaces/empresa';

class EmpresaService extends CRUDService<IEmpresa> {
  constructor() {
    super('empresa');
  }
}

export default new EmpresaService();

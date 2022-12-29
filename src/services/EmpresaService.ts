import CRLUDService from '@/services/CRLUDService';
import { IEmpresa } from '@/interfaces/empresa';

class EmpresaService extends CRLUDService<
  IEmpresa,
  IEmpresa,
  IEmpresa,
  IEmpresa,
  IEmpresa
> {
  constructor() {
    super('empresa');
  }
}

export default new EmpresaService();

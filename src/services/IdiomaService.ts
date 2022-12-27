import CRUDService from '@/services/CRUDService';
import { IIdioma } from '@/interfaces/idioma';

class IdiomaService extends CRUDService<IIdioma> {
  constructor() {
    super('idioma');
  }
}

export default new IdiomaService();

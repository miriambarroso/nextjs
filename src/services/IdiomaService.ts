import CRLUDService from '@/services/CRLUDService';
import { IIdioma } from '@/interfaces/idioma';

class IdiomaService extends CRLUDService<
  IIdioma,
  IIdioma,
  IIdioma,
  IIdioma,
  IIdioma
> {
  constructor() {
    super('idioma');
  }
}

export default new IdiomaService();

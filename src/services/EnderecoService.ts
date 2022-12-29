import CRUDService from '@/services/CRUDService';
import { IEndereco } from '@/interfaces/endereco';

class EnderecoService extends CRUDService<IEndereco> {
  constructor() {
    super('endereco');
  }
}

export default new EnderecoService();
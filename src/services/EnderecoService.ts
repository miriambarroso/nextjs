import CRLUDService from '@/services/CRLUDService';
import { IEndereco } from '@/interfaces/endereco';

class EnderecoService extends CRLUDService<
  IEndereco,
  IEndereco,
  IEndereco,
  IEndereco,
  IEndereco
> {
  constructor() {
    super('endereco');
  }
}

export default new EnderecoService();

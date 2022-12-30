import CRLUDService from '@/services/CRLUDService';
import { ICandidatura } from '@/interfaces/candidatura';

class CandidaturaService extends CRLUDService<
  ICandidatura,
  ICandidatura,
  ICandidatura,
  ICandidatura,
  ICandidatura
> {
  constructor() {
    super('candidatura');
  }
}

export default new CandidaturaService();

import { IUser } from '@/interfaces/user';
import { IEmpresa } from '@/interfaces/empresa';
import { IEndereco } from '@/interfaces/endereco';
import { PickRenameMulti } from '@/interfaces/index';

export interface IEmpregador extends IUser {}

export interface IEmpregadorCreate
  extends IEmpregador,
    IEndereco,
    PickRenameMulti<
      IEmpresa,
      { email: 'empresa_email'; telefone: 'empresa_telefone' }
    > {
  password: string;
  empresa?: number;
}

export interface IEmpregadorPerfil extends IEmpregador {
  empresa: IEmpresa;
  endereco: IEndereco;
}

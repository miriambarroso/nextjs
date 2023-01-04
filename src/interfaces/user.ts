export interface IUser {
  id?: number;
  last_login?: string;
  is_superuser?: boolean;
  created_at?: string;
  updated_at?: string;
  nivel_usuario?: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  sexo: number;
  estado_civil: number;
  tipo_deficiencia: number;
  area_atuacao: string;
  cargo: string;
  email: string;
  telefone: string;
  foto: string;
  curriculo: string;
  habilitado: boolean;
  empresa?: number;
}

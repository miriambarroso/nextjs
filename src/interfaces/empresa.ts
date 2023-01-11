export interface IEmpresa {
  foto: string;
  id?: number;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  ramo_atividade: string;
  numero_funcionarios: number;
  telefone: string;
  email: string;
  site: string;
  descricao: string;
}

export interface IEmpresaVaga {
  id?: number;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
}

import create from 'zustand';
import axiosInstance from '@/utils/axios';
import { IUser } from '@/interfaces/user';
import { parseISO } from 'date-fns';
import { IEmpresa } from '@/interfaces/empresa';
import CandidaturaService from '@/services/CandidaturaService';
import CandidatoService from '@/services/CandidatoService';
import EmpregadorService from '@/services/EmpregadorService';
import { ICandidatura } from '@/interfaces/candidatura';

export interface IAuthStore {
  fetchUsuario: () => Promise<void>;
  token: string;
  expires: string;
  user: IUser;

  isAuthenticated: () => boolean;
  isCandidato: () => boolean;
  isEmpregador: () => boolean;
  isAdmin: () => boolean;
  isGuest: () => boolean;
  empresa: IEmpresa;
  candidaturas: ICandidatura[];
  setCandidaturas: (candidaturas: ICandidatura[]) => void;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchCandidatura: () => Promise<void>;
  clear: () => void;
  update: (user: IUser, token: string, expires: string) => void;
  checkAuth: () => null | { user: IUser; token: string; expires: string };
}

export const SUPERADMIN = 1;
export const ADMIN = 2;
export const EMPREGADOR = 3;
export const CANDIDATO = 4;
export const GUEST = undefined;

export const NivelUsuario = {
  SUPERADMIN: 1,
  ADMIN: 2,
  EMPREGADOR: 3,
  CANDIDATO: 4,
  GUEST: undefined,
};

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  empresa: null,
  candidaturas: [],
  token: null,
  expires: null,
  isAuthenticated: () => !!get().user,
  isAdmin: () => get().user?.nivel_usuario <= ADMIN,
  isCandidato: () => get().user?.nivel_usuario == CANDIDATO,
  isEmpregador: () => get().user?.nivel_usuario == EMPREGADOR,
  isGuest: () => get().user?.nivel_usuario == GUEST,
  login: async (cpf: string, password: string) => {
    try {
      const { data } = await axiosInstance.post('/login', {
        username: cpf,
        password,
      });

      if (data.user.nivel_usuario === CANDIDATO) {
        get().fetchCandidatura();
      }

      if (data.user.nivel_usuario === EMPREGADOR) {
        // get().getEmpresa();
      }

      get().update(data.user, data.token, data.expiry);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  fetchUsuario: async () => {
    try {
      if (!get().user) return;

      let data = null;

      if (get().user.nivel_usuario === CANDIDATO) {
        data = await CandidatoService.get(get().user.id);
        get().fetchCandidatura();
      }

      if (get().user.nivel_usuario === EMPREGADOR) {
        data = await EmpregadorService.get(get().user.id);
        // get().getEmpresa();
      }

      get().update(data, get().token, get().expires);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  setCandidaturas: (candidaturas: ICandidatura[]) => {
    set({ candidaturas });
  },
  fetchCandidatura: async () => {
    try {
      const data = await CandidaturaService.getAll();
      set({ candidaturas: data });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // getEmpresa: async () => {
  //   try {
  //     const data = await EmpresaService.getAll();
  //     set({ empresa: data });
  //     return Promise.resolve();
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },
  clear() {
    set({ user: null });
    set({ token: null });
    set({ expires: null });
    set({ candidaturas: [] });
    set({ empresa: null });
    localStorage.clear();
    sessionStorage.clear();
  },
  update(user: IUser, token: string, expires: string) {
    set({ token: token });
    set({ expires: expires });
    set({ user: user });
    localStorage.setItem('IARANA.token', token);
    localStorage.setItem('IARANA.expires', expires);
    localStorage.setItem('IARANA.user', JSON.stringify(user));
  },
  checkAuth() {
    if (get().token && get().expires && get().user) {
      return { user: get().user, token: get().token, expires: get().expires };
    }

    const token = localStorage.getItem('IARANA.token');
    const expires = localStorage.getItem('IARANA.expires');
    const user = localStorage.getItem('IARANA.user');
    const dateExpires = expires ? parseISO(expires) : null;

    if (!!expires && dateExpires > new Date() && !!token && !!user) {
      set({ expires: expires });
      set({ token: token });
      set({ user: JSON.parse(user) as IUser });
      return { token, expires, user: JSON.parse(user) as IUser };
    }

    return null;
  },
  logout: async () => {
    try {
      // await axiosInstance.post('/logout');
      get().clear();
    } catch (e) {
      console.log(e);
    }
  },
}));

export { useAuthStore };

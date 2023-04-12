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
  fetchEmpresa: (userID: number) => Promise<void>;
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
  login: (cpf: string, password: string, keep?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  fetchCandidatura: () => Promise<void>;
  clear: () => void;
  update: (
    user: IUser,
    token: string,
    expires: string,
    strategy?: string,
  ) => void;
  checkAuth: () => null | { user: IUser; token: string; expires: string };
  storage: Storage;
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
  storage: null,
  isAuthenticated: () => !!get().user,
  isAdmin: () => get().user?.nivel_usuario <= ADMIN,
  isCandidato: () => get().user?.nivel_usuario == CANDIDATO,
  isEmpregador: () => get().user?.nivel_usuario == EMPREGADOR,
  isGuest: () => get().user?.nivel_usuario == GUEST,
  login: async (cpf: string, password: string, keep?: boolean) => {
    try {
      const { data } = await axiosInstance.post('/login', {
        username: cpf,
        password,
      });

      get().update(
        data.user,
        data.token,
        data.expiry,
        keep ? 'localStorage' : 'sessionStorage',
      );

      if (data.user.nivel_usuario === CANDIDATO) {
        await get().fetchCandidatura();
      }

      if (data.user.nivel_usuario === EMPREGADOR) {
        await get().fetchEmpresa(data.user?.id);
      }

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
        await get().fetchCandidatura();
      }

      if (get().user.nivel_usuario === EMPREGADOR) {
        data = await EmpregadorService.get(get().user.id);
        if (!get().empresa) await get().fetchEmpresa(get().user.id);
      }

      get().update(data, get().token, get().expires, get().storage.toString());
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
      const { results } = await CandidaturaService.getAll();
      set({ candidaturas: results });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  fetchEmpresa: async (userID) => {
    try {
      const data = await EmpregadorService.getEmpresa(userID);
      set({ empresa: data });
      get().storage.setItem('VAGASANP.empresa', JSON.stringify(data));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  clear() {
    set({ user: null });
    set({ token: null });
    set({ expires: null });
    set({ candidaturas: [] });
    set({ empresa: null });
    set({ storage: localStorage });

    localStorage.clear();
    sessionStorage.clear();
  },
  update(user: IUser, token: string, expires: string, strategy?) {
    if (strategy) {
      set({
        storage: strategy === 'localStorage' ? localStorage : sessionStorage,
      });
      localStorage.setItem('VAGASANP.strategy', strategy);
    }

    set({ token: token });
    set({ expires: expires });
    set({ user: user });
    get().storage.setItem('VAGASANP.token', token);
    get().storage.setItem('VAGASANP.expires', expires);
    get().storage.setItem('VAGASANP.user', JSON.stringify(user));
  },
  checkAuth() {
    const strategy =
      localStorage.getItem('VAGASANP.strategy') || 'localStorage';
    const storage = strategy === 'localStorage' ? localStorage : sessionStorage;

    const empresa = storage.getItem('VAGASANP.empresa');
    set({ empresa: empresa ? JSON.parse(empresa) : null });

    if (get().token && get().expires && get().user) {
      return { user: get().user, token: get().token, expires: get().expires };
    }

    const token = storage.getItem('VAGASANP.token');
    const expires = storage.getItem('VAGASANP.expires');
    const user = storage.getItem('VAGASANP.user');
    const dateExpires = expires ? parseISO(expires) : null;

    if (!!expires && dateExpires > new Date() && !!token && !!user) {
      set({ expires: expires });
      set({ token: token });
      set({ user: JSON.parse(user) as IUser });
      set({ storage: storage });
      return { token, expires, user: JSON.parse(user) as IUser };
    }

    return null;
  },
  logout: async () => {
    try {
      // await axiosInstance.post('/logout');
      get().clear();
    } catch (e) {}
  },
}));

export { useAuthStore };

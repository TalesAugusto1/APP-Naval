import { create } from 'zustand';
import { User, LoginDTO, RegisterDTO, ForgotPasswordDTO } from '@/types/auth.types';
import { authService } from '@/services/auth/authService';
import { authStorage } from '@/services/storage/authStorage';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordDTO) => Promise<void>;
  loadSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginDTO) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authService.login(credentials);
      await authStorage.saveToken(token);
      await authStorage.saveUser(user);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao fazer login';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterDTO) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authService.register(data);
      await authStorage.saveToken(token);
      await authStorage.saveUser(user);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar conta';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const { token } = get();
      if (token) {
        await authService.logout(token);
      }
      await authStorage.clearAll();
      set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      await authStorage.clearAll();
      set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
    }
  },

  forgotPassword: async (data: ForgotPasswordDTO) => {
    set({ isLoading: true, error: null });
    try {
      await authService.forgotPassword(data);
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao enviar email de recuperação';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  loadSession: async () => {
    set({ isLoading: true });
    try {
      const token = await authStorage.getToken();
      const user = await authStorage.getUser();

      if (token && user) {
        try {
          const currentUser = await authService.getCurrentUser(token);
          set({ user: currentUser, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          await authStorage.clearAll();
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

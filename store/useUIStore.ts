import { create } from 'zustand';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface Modal {
  isOpen: boolean;
  type: 'delete-school' | 'delete-class' | null;
  data?: any;
}

interface UIState {
  toasts: ToastMessage[];
  modal: Modal;
  isGlobalLoading: boolean;
  loginRequiredModalOpen: boolean;

  showToast: (message: string, type: ToastMessage['type']) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;

  openModal: (type: Modal['type'], data?: any) => void;
  closeModal: () => void;

  setGlobalLoading: (isLoading: boolean) => void;

  showLoginRequired: () => void;
  hideLoginRequired: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  modal: { isOpen: false, type: null },
  isGlobalLoading: false,
  loginRequiredModalOpen: false,

  showToast: (message, type) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration: 3000 }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  hideToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  openModal: (type, data) => {
    set({ modal: { isOpen: true, type, data } });
  },

  closeModal: () => {
    set({ modal: { isOpen: false, type: null, data: undefined } });
  },

  setGlobalLoading: (isLoading) => {
    set({ isGlobalLoading: isLoading });
  },

  showLoginRequired: () => {
    set({ loginRequiredModalOpen: true });
  },

  hideLoginRequired: () => {
    set({ loginRequiredModalOpen: false });
  },
}));

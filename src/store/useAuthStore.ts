// store/useAuthStore.ts
import { create } from "zustand";


// Auth State Types
interface AuthState {
  user: any;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}


// useAuthStore create
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) =>
    set({ user, token }),

  logout: () =>
    set({ user: null, token: null }),
}));

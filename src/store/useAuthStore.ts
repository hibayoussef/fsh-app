import { create } from "zustand";
import type { ILoginDTO } from "../types/auth";
import type { AuthState } from "../types/store";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")!) || null,

  login: (userData: ILoginDTO, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));

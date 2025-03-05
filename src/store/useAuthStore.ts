// import { create } from "zustand";
// import type { ILoginDTO } from "../types/auth";
// import type { AuthState } from "../types/store";

// export const useAuthStore = create<AuthState>((set) => ({
//   token: localStorage.getItem("token") || null,
//   isAuthenticated: !!localStorage.getItem("token"),
//   user: JSON.parse(localStorage.getItem("user")!) || null,

//   login: (userData: ILoginDTO, token: string) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     set({
//       token,
//       isAuthenticated: true,
//     });
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     set({
//       token: null,
//       isAuthenticated: false,
//       user: null,
//     });
//   },
// }));

import { create } from "zustand";
import type { ILoginDTO } from "../types/auth";
import type { AuthState } from "../types/store";

export const useAuthStore = create<AuthState>((set) => {
  // Safely retrieve user data
  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return null;
    }
  };

  return {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    user: getUserFromLocalStorage(),

    login: (userData: ILoginDTO, token: string) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      set({
        token,
        isAuthenticated: true,
        user: userData,
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
  };
});

import type { ILoginDTO } from "./auth";

// useAuthStore Type
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: ILoginDTO | null;

  login: (userData: ILoginDTO, token: string) => void;
  logout: () => void;
}

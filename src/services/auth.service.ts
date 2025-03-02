
import { _axios } from "../interceptor/http-config";
import type { ILoginDTO, ILoginRequest } from "../types/auth";

export const _AuthApi = {
  // LOGIN
  login: async (data: ILoginRequest) => {
    const res = await _axios.post<ILoginDTO>("/users/login", data);
    return res.data;
  },

  //   // FORGOT PASSWORD
  //   forgetPassword: async (data: ForgetPasswordData) => {
  //     return _axios.post("/auth/forget-password", data);
  //   },

  //   // RESET PASSWORD
  //   resetPass: async (data: ResetPasswordData) => {
  //     return _axios.post("/auth/reset-password", data);
  //   },

  //   // VERIFY CODE
  //   verifyCode: async (data: VerifyCodeData) => {
  //     return _axios.post("/auth/verify-account", data);
  //   },

  // LOGOUT
//   logout: async () => {
//     return await _axios.post<any>("/logout");
//   },

  // STORE TOKEN
  storeToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  // GET TOKEN
  getToken: (): string | null => localStorage.getItem("token"),

  // STORE ROLES
  storeRole: (role: string[] | string) => {
    const roleData = Array.isArray(role) ? role : [role];
    localStorage.setItem("role", JSON.stringify(roleData));
  },

  // GET ROLES
  getRole: (): string[] | null => {
    const role = localStorage.getItem("role");
    return role ? JSON.parse(role) : null;
  },

  // STORE USER
  storeUser: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // GET USER
  getUser: (): any => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // STORE PERMISSIONS
  storePermissions: (permissions: string[]) => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  },

  // GET PERMISSIONS
  getPermissions: (): string[] | null => {
    const permissions = localStorage.getItem("permissions");
    return permissions ? JSON.parse(permissions) : null;
  },

  // DELETE PERMISSIONS
  destroyPermissions: () => {
    localStorage.removeItem("permissions");
  },

  destroyToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    localStorage.removeItem("userEmail");
    window.location.reload();
  },
};

import { _axios } from "../interceptor/http-config";
import { type UserMeModel } from "../types/organization";

export const _ProfileApi = {
  getCurrentUser: async () => {
    const response = await _axios.get<UserMeModel>(`/users/me`);
    return response.data;
  },
};

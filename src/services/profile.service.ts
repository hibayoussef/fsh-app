import { _axios } from "../interceptor/http-config";

export const _ProfileApi = {
  getCurrentUser: async () => {
    const response = await _axios.get<any>(`/users/me`);
    return response.data;
  },
};

import { _axios } from "../interceptor/http-config";

export const _MerchantApi = {
  // READ
  getAllMerchants: async () => {
    const response = await _axios.get(`/organizations/merchants`);
    return response.data;
  },

  getMerchantsByType: async () => {
    const response = await _axios.get(`/organizations/types/MERCHANTS`);
    return response.data;
  },

  getMerchantById: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}`);
    return response.data;
  },

  // CREATE
  createMerchant: async (partnerId: number, data: any) => {
    const response = await _axios.post(
      `/organizations/${partnerId}/merchants`,
      data
    );
    return response.data;
  },

  // UPDATE
  updateMerchant: async (
    id: string,
    data: { name: string; description: string }
  ) => {
    const response = await _axios.patch(`/organizations/${id}`, data);
    return response.data;
  },

  updateMerchantStatus: async (id: string, status: string) => {
    const response = await _axios.patch(`/organizations/${id}/${status}`);
    return response.data;
  },

  // DELETE (using status update)
  disableMerchant: async (id: string) => {
    const response = await _axios.patch(`/organizations/${id}/DISABLED`);
    return response.data;
  },
};

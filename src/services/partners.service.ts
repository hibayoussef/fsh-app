import { _axios } from "../interceptor/http-config";

export const _PartnerApi = {
  // READ OPERATIONS
  getAllPartners: async () => {
    const response = await _axios.get(`/organizations/partners`);
    return response.data;
  },

  getPartnersByType: async () => {
    const response = await _axios.get(`/organizations/types/PARTNER`);
    return response.data;
  },

  getPartnerById: async (id: number) => {
    const response = await _axios.get(`/organizations/${id}`);
    return response.data;
  },

  // CREATE OPERATION
  createPartner: async (data: any) => {
    const response = await _axios.post("/organizations/partners", data);
    return response.data;
  },

  // UPDATE OPERATIONS
  updatePartner: async (
    id: string,
    data: { name: string; description: string }
  ) => {
    const response = await _axios.patch(`/organizations/${id}`, data);
    return response.data;
  },

  updatePartnerStatus: async (id: string, status: string) => {
    const response = await _axios.patch(`/organizations/${id}/${status}`);
    return response.data;
  },

  // DELETE OPERATION (using status update)
  disablePartner: async (id: string) => {
    const response = await _axios.patch(`/organizations/${id}/DISABLED`);
    return response.data;
  },

  getOrgChildren: async (id: number | string) => {
    const response = await _axios.get(`/organizations/${id}/children`);
    return response.data;
  },
};

import { _axios } from "../interceptor/http-config";

export const _BranchApi = {
  // READ OPERATIONS
  getAllBranches: async () => {
    const response = await _axios.get(`/organizations/branches`);
    return response.data;
  },

  getBranchesByType: async () => {
    const response = await _axios.get(`/organizations/types/BRANCH`);
    return response.data;
  },

  getBranchById: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}`);
    return response.data;
  },

  // CREATE OPERATION
  createBranch: async (merchantId: number, data: any) => {
    const response = await _axios.post(
      `/organizations/${merchantId}/branches`,
      data
    );
    return response.data;
  },

  // UPDATE OPERATIONS
  updateBranch: async (
    id: string,
    data: { name: string; description: string }
  ) => {
    const response = await _axios.patch(`/organizations/${id}`, data);
    return response.data;
  },

  updateBranchStatus: async (id: string, status: string) => {
    const response = await _axios.patch(`/organizations/${id}/${status}`);
    return response.data;
  },

  // DELETE OPERATION (using status update)
  disableBranch: async (id: string) => {
    const response = await _axios.patch(`/organizations/${id}/DISABLED`);
    return response.data;
  },
};

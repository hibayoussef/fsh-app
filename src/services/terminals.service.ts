import { _axios } from "../interceptor/http-config";

export const _TerminalApi = {
  // READ OPERATIONS
  getAllTerminals: async () => {
    const response = await _axios.get(`/organizations/terminals`);
    return response.data;
  },

  getTerminalsByType: async () => {
    const response = await _axios.get(`/organizations/types/TERMINALS`);
    return response.data;
  },

  getTerminalById: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}`);
    return response.data;
  },

  // CREATE OPERATION
  createTerminal: async (branchId: number, data: any) => {
    const response = await _axios.post(
      `/organizations/${branchId}/terminals`,
      data
    );
    return response.data;
  },

  // UPDATE OPERATIONS
  updateTerminal: async (
    id: string,
    data: { name: string; description: string }
  ) => {
    const response = await _axios.patch(`/organizations/${id}`, data);
    return response.data;
  },

  updateTerminalStatus: async (id: string, status: string) => {
    const response = await _axios.patch(`/organizations/${id}/${status}`);
    return response.data;
  },

  // DELETE OPERATION (using status update)
  disableTerminal: async (id: string) => {
    const response = await _axios.patch(`/organizations/${id}/DISABLED`);
    return response.data;
  },
};

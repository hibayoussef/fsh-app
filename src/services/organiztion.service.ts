import { _axios } from "../interceptor/http-config";
import { OrganizationModel } from "../types/organization";

export const _OrganizationApi = {
  getOrganizationsByType: async (type: string) => {
    const response = await _axios.get<OrganizationModel[]>(
      `/organizations/types/${type}`
    );
    return response.data;
  },
};

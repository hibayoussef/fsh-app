import { _axios } from "../interceptor/http-config";
import {
  OrganizationModel,
  OrganizationUser,
  PartnerRequest,
} from "../types/organization";

export const _OrganizationApi = {
  getOrganizationsByType: async (type: string) => {
    const response = await _axios.get<OrganizationModel[]>(
      `/organizations/types/${type}`
    );
    return response.data;
  },
  getOrganizationUsers: async (id: string) => {
    const response = await _axios.get<OrganizationUser[]>(
      `/organizations/${id}/users?pageNumber=1&pageLength=25`
    );
    return response.data;
  },
  createPartner: async (data: PartnerRequest[]) => {
    const response = await _axios.post("/organizations/partners", data);
    return response.data;
  },
};

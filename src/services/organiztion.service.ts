import { _axios } from "../interceptor/http-config";

export const _OrganizationApi = {
  // ** READ OPERATIONS **

  // Fetch an organization by ID
  getOrganizationById: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}`);
    return response.data;
  },

  // Fetch children of an organization by its ID
  getOrganizationChildren: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}/children`);
    return response.data;
  },

  // Fetch users assigned to an organization
  getOrganizationUsers: async (id: string) => {
    const response = await _axios.get(`/organizations/${id}/users`);
    return response.data;
  },

  // Fetch all organizations with pagination
  getOrganizationsPaginated: async (pageNumber = 1, pageLength = 10) => {
    const response = await _axios.get(
      `/organizations?pageNumber=${pageNumber}&pageLength=${pageLength}`
    );
    return response.data;
  },

  // Fetch all organizations in different display modes
  getOrganizationsDisplay: async (mode: "Flat" | "Tree", leaf = false) => {
    const response = await _axios.get(
      `/organizations/display/${mode}?leaf=${leaf}`
    );
    return response.data;
  },

  // Fetch all organizations that a user has access to
  getSupervisedOrganizations: async (mode: "Flat" | "Tree") => {
    const response = await _axios.get(
      `/organizations/supervised/display/${mode}`
    );
    return response.data;
  },

  // Fetch all partners, merchants, branches, and terminals separately
  getAllPartners: async () => {
    const response = await _axios.get(`/organizations/partners`);
    return response.data;
  },

  getAllMerchants: async () => {
    const response = await _axios.get(`/organizations/merchants`);
    return response.data;
  },

  getAllBranches: async () => {
    const response = await _axios.get(`/organizations/branches`);
    return response.data;
  },

  getAllTerminals: async () => {
    const response = await _axios.get(`/organizations/terminals`);
    return response.data;
  },

  // Fetch organizations by type
  getOrganizationsByType: async (
    type: "PARTNER" | "MERCHANTS" | "BRANCHES" | "TERMINALS"
  ) => {
    const response = await _axios.get(`/organizations/types/${type}`);
    return response.data;
  },

  // ** CREATE OPERATIONS **

  // Create organization hierarchy
  createOrganizationHierarchy: async (data: any) => {
    const response = await _axios.post("/organizations/hierarchy", data);
    return response.data;
  },

  // Create a partner organization
  createPartner: async (data: any) => {
    const response = await _axios.post("/organizations/partners", data);
    return response.data;
  },

  // Create a merchant under a partner
  createMerchant: async (partnerId: number, data: any) => {
    const response = await _axios.post(
      `/organizations/${partnerId}/merchants`,
      data
    );
    return response.data;
  },

  // Create a branch under a merchant
  createBranch: async (merchantId: string, data: any) => {
    const response = await _axios.post(
      `/organizations/${merchantId}/branches`,
      data
    );
    return response.data;
  },

  // Create a terminal under a branch
  createTerminal: async (branchId: string, data: any) => {
    const response = await _axios.post(
      `/organizations/${branchId}/terminals`,
      data
    );
    return response.data;
  },

  // Add a child organization under a parent organization
  addChildOrganization: async (parentId: string, data: any) => {
    const response = await _axios.post(
      `/organizations/${parentId}/child`,
      data
    );
    return response.data;
  },

  // ** UPDATE OPERATIONS **

  // Update organization name and description
  updateOrganization: async (id: string, name: string, description: string) => {
    const response = await _axios.patch(`/organizations/${id}`, {
      name,
      description,
    });
    return response.data;
  },

  // Update organization status
  updateOrganizationStatus: async (id: string, status: string) => {
    const response = await _axios.patch(`/organizations/${id}/${status}`);
    return response.data;
  },

  // ** DELETE OPERATIONS**

  // Disable an organization (since delete isn't available)
  disableOrganization: async (id: string) => {
    const response = await _axios.patch(`/organizations/${id}/DISABLED`);
    return response.data;
  },
};

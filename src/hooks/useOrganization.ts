import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _OrganizationApi } from "../services/organiztion.service";
import { queryKeys } from "../utils/query-keys";
import { useOrganizationStore } from "../store/useHirarchyStore";

// ✅ Fetch all organizations based on type
export const useFetchAllOrganizations = (
  type: "partners" | "merchants" | "branches" | "terminals"
) => {
  const fetchFunction = {
    partners: _OrganizationApi.getAllPartners,
    merchants: _OrganizationApi.getAllMerchants,
    branches: _OrganizationApi.getAllBranches,
    terminals: _OrganizationApi.getAllTerminals,
  }[type];

  return useQuery({
    queryKey: [`organizations-${type}`],
    queryFn: fetchFunction,
  });
};

// ✅ Fetch organizations by type
export const useFetchOrganizationsByType = (
  type: "PARTNER" | "MERCHANTS" | "BRANCHES" | "TERMINALS"
) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATIONS, type],
    queryFn: () => _OrganizationApi.getOrganizationsByType(type),
  });
};

// ✅ Fetch a single organization by ID
export const useFetchOrganizationById = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATION, id],
    queryFn: () => _OrganizationApi.getOrganizationById(id),
    enabled: !!id,
  });
};

// ✅ Fetch paginated organizations
export const useFetchOrganizationsPaginated = (
  pageNumber = 1,
  pageLength = 10
) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATIONS, pageNumber, pageLength],
    queryFn: () =>
      _OrganizationApi.getOrganizationsPaginated(pageNumber, pageLength),
  });
};

// ✅ Fetch organization users
export const useFetchOrganizationUsers = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATION_USERS, id],
    queryFn: () => _OrganizationApi.getOrganizationUsers(id),
    enabled: !!id,
  });
};

// ✅ Fetch organization children
export const useFetchOrganizationChildren = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATION_CHILDREN, id],
    queryFn: () => _OrganizationApi.getOrganizationChildren(id),
    enabled: !!id,
  });
};

// ✅ Fetch organizations with display mode
export const useFetchOrganizationsDisplay = (
  mode: "Flat" | "Tree",
  leaf = false
) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATIONS_DISPLAY, mode, leaf],
    queryFn: () => _OrganizationApi.getOrganizationsDisplay(mode, leaf),
  });
};

// ✅ Create a partner organization
export const useCreatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _OrganizationApi.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Create a merchant under a partner
export const useCreateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ partnerId, data }: { partnerId: number ; data: any }) =>
      _OrganizationApi.createMerchant(partnerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Create a branch under a merchant
export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ merchantId, data }: { merchantId: string; data: any }) =>
      _OrganizationApi.createBranch(merchantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Create a terminal under a branch
export const useCreateTerminal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ branchId, data }: { branchId: string; data: any }) =>
      _OrganizationApi.createTerminal(branchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Add a child organization
export const useAddChildOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ parentId, data }: { parentId: string; data: any }) =>
      _OrganizationApi.addChildOrganization(parentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Update organization details (name & description)
export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  const { setOrganizations, organizations } = useOrganizationStore();

  return useMutation({
    mutationFn: ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description: string;
    }) => _OrganizationApi.updateOrganization(id, name, description),
    onSuccess: (updatedOrg) => {
      setOrganizations(
        organizations.map((org) =>
          org.id === updatedOrg.id ? updatedOrg : org
        )
      );
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Update organization status
export const useUpdateOrganizationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      _OrganizationApi.updateOrganizationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

// ✅ Disable an organization (instead of deleting)
export const useDisableOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => _OrganizationApi.disableOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

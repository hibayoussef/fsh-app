import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _OrganizationApi } from "../services/organiztion.service";
import { queryKeys } from "../utils/query-keys";

export const useFetchOrganizationsByType = (type: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATIONS, type],
    queryFn: () => _OrganizationApi.getOrganizationsByType(type),
  });
};

export const useFetchOrganizationUsers = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATION_USERS, id],
    queryFn: () => _OrganizationApi.getOrganizationUsers(id),
    enabled: !!id,
  });
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _OrganizationApi.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, description }: { id: number; name: string, description: string }) =>
      _OrganizationApi.updatePartner(id, name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORGANIZATIONS] });
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../utils/query-keys";
import { _OrganizationApi } from "../services/organiztion.service";

export const useFetchOrganizationsByType = (type: string) => {
  return useQuery({
    queryKey: [queryKeys.ORGANIZATIONS, type],
    queryFn: () => _OrganizationApi.getOrganizationsByType(type),
  });
};

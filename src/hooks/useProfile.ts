import { useQuery } from "@tanstack/react-query";
import { _ProfileApi } from "../services/profile.service";
import { queryKeys } from "../utils/query-keys";

export const useFetchCurrentUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.CURRENT_USER],
    queryFn: () => _ProfileApi.getCurrentUser(),
  });

  return { data, error, isLoading };
};
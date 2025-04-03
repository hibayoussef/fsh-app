import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _BranchApi } from "../services/branches.service";
import { queryKeys } from "../utils/query-keys";

// FETCH ALL BRANCHES
export const useFetchBranches = () => {
  return useQuery({
    queryKey: [queryKeys.BRANCHES],
    queryFn: _BranchApi.getAllBranches,
  });
};

// FETCH BRANCHES BY TYPE
export const useFetchBranchesByType = () => {
  return useQuery({
    queryKey: [queryKeys.BRANCHES_BY_TYPE],
    queryFn: _BranchApi.getBranchesByType,
  });
};

// FETCH SINGLE BRANCH
export const useFetchBranch = (id: string, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.BRANCH, id],
    queryFn: () => _BranchApi.getBranchById(id),
    enabled: !!id,
    ...options,
  });
};

// ADD BRANCH
export const useAddBranch = (merchantId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => _BranchApi.createBranch(merchantId, data),
    onSuccess: () => {
      navigate("/branches");
    },
  });
};

// UPDATE BRANCH
export const useUpdateBranch = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _BranchApi.updateBranch(id, data),
    onSuccess: () => {
      navigate("/branches");
    },
  });
};

// UPDATE BRANCH STATUS
export const useUpdateBranchStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      _BranchApi.updateBranchStatus(id, status),
  });
};

// DELETE BRANCH
export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => _BranchApi.disableBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BRANCHES],
      });
    },
  });
};

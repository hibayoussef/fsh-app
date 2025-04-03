import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../utils/query-keys";
import { _MerchantApi } from "../services/merchants.service";

// FETCH ALL MERCHANTS
export const useFetchMerchants = () => {
  return useQuery({
    queryKey: [queryKeys.MERCHANTS],
    queryFn: _MerchantApi.getAllMerchants,
  });
};

// FETCH MERCHANTS BY TYPE
export const useFetchMerchantsByType = () => {
  return useQuery({
    queryKey: [queryKeys.MERCHANTS_BY_TYPE],
    queryFn: _MerchantApi.getMerchantsByType,
  });
};

// FETCH SINGLE MERCHANT
export const useFetchMerchant = (id: string, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.MERCHANT, id],
    queryFn: () => _MerchantApi.getMerchantById(id),
    enabled: !!id,
    ...options,
  });
};

// ADD MERCHANT
export const useAddMerchant = (partnerId: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => _MerchantApi.createMerchant(partnerId, data),
    onSuccess: () => {
      navigate("/merchants");
    },
  });
};

// UPDATE MERCHANT
export const useUpdateMerchant = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _MerchantApi.updateMerchant(id, data),
    onSuccess: () => {
      navigate("/merchants");
    },
  });
};

// UPDATE MERCHANT STATUS
export const useUpdateMerchantStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      _MerchantApi.updateMerchantStatus(id, status),
  });
};

// DELETE MERCHANT
export const useDeleteMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => _MerchantApi.disableMerchant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MERCHANTS],
      });
    },
  });
};

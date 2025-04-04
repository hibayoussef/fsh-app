// partners.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../utils/query-keys";
import { _PartnerApi } from "../services/partners.service";

// FETCH ALL PARTNERS
export const useFetchPartners = () => {
  return useQuery({
    queryKey: [queryKeys.PARTNERS],
    queryFn: _PartnerApi.getAllPartners,
  });
};

// FETCH PARTNERS BY TYPE
export const useFetchPartnersByType = () => {
  return useQuery({
    queryKey: [queryKeys.PARTNERS_BY_TYPE],
    queryFn: _PartnerApi.getPartnersByType,
  });
};

// FETCH SINGLE PARTNER
export const useFetchPartner = (id: number, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.PARTNER, id],
    queryFn: () => _PartnerApi.getPartnerById(id),
    enabled: !!id,
    ...options,
  });
};

// ADD PARTNER
export const useAddPartner = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _PartnerApi.createPartner,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [queryKeys.PARTNERS] });
      navigate("/partners");
    },
  });
};

// UPDATE PARTNER
export const useUpdatePartner = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _PartnerApi.updatePartner(id, data),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [queryKeys.PARTNERS] });
      navigate("/partners");
    },
  });
};

// UPDATE PARTNER STATUS
export const useUpdatePartnerStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      _PartnerApi.updatePartnerStatus(id, status),
  });
};

// DELETE PARTNER
export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => _PartnerApi.disablePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PARTNERS],
      });
    },
  });
};


const buildOrgTree = async (org: any) => {
  const children = await _PartnerApi.getOrgChildren(org.id);
  const mappedChildren = await Promise.all(
    children.map(async (child: any) => {
      return {
        ...child.data,
        children: await buildOrgTree(child.data),
      };
    })
  );

  return mappedChildren;
};

export const usePartnerOrgTree = (partnerId: number) => {
  return useQuery({
    queryKey: ["partner-tree", partnerId],
    queryFn: async () => {
      const partner = await _PartnerApi.getPartnerById(partnerId);
      const children = await buildOrgTree(partner);
      return {
        ...partner,
        children,
      };
    },
    enabled: !!partnerId,
  });
};

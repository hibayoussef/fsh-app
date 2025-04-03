import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../utils/query-keys";
import { _TerminalApi } from "../services/terminals.service";

// FETCH ALL TERMINALS
export const useFetchTerminals = () => {
  return useQuery({
    queryKey: [queryKeys.TERMINALS],
    queryFn: _TerminalApi.getAllTerminals,
  });
};

// FETCH TERMINALS BY TYPE
export const useFetchTerminalsByType = () => {
  return useQuery({
    queryKey: [queryKeys.TERMINALS_BY_TYPE],
    queryFn: _TerminalApi.getTerminalsByType,
  });
};

// FETCH SINGLE TERMINAL
export const useFetchTerminal = (id: string, options = {}) => {
  return useQuery({
    queryKey: [queryKeys.TERMINAL, id],
    queryFn: () => _TerminalApi.getTerminalById(id),
    enabled: !!id,
    ...options,
  });
};

// ADD TERMINAL
export const useAddTerminal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ branchId, data }: { branchId: number; data: any }) =>
      _TerminalApi.createTerminal(branchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TERMINALS] });
      navigate("/terminals");
    },
  });
};

// UPDATE TERMINAL
export const useUpdateTerminal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _TerminalApi.updateTerminal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TERMINALS] });
      navigate("/terminals");
    },
  });
};


// UPDATE TERMINAL STATUS
export const useUpdateTerminalStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      _TerminalApi.updateTerminalStatus(id, status),
  });
};

// DELETE TERMINAL
export const useDeleteTerminal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => _TerminalApi.disableTerminal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TERMINALS],
      });
    },
  });
};

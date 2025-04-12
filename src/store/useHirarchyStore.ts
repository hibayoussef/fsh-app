import { create } from "zustand";
import { OrganizationModel } from "../types/organization";

interface OrganizationStore {
  organizations: OrganizationModel[];
  setOrganizations: (organizations: OrganizationModel[]) => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organizations: [],
  setOrganizations: (organizations) => set({ organizations }),
}));

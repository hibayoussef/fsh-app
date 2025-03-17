import { ILoginDTO } from "./auth";

export interface OrganizationModel {
  id: number;
  first_name: string;
  last_name: string;
  type: {
    id: number;
    name: string;
    leaf: boolean;
  };
  name: string;
  description: string;
  leaf: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationUser {
  person: ILoginDTO;
  organization: OrganizationModel;
  role: string | null;
}

export interface UserModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface PartnerRequest {
  organization: {
    name: string;
    description: string;
    address?: string;
    logoBase64?: string;
    users?: UserModel[];
    type?: {
      name?: "PARTNER" | "MERCHANT";
    };
    enabled?: boolean;
  };
  users?: UserModel[];
}

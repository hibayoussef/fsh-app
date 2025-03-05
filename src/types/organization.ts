import { ILoginDTO } from "./auth";

export interface OrganizationModel {
  id: number;
  type: {
    id: number;
    name: string;
    leaf: boolean;
  };
  name: string;
  description: string;
  leaf: boolean;
  enabled: boolean;
}

export interface OrganizationUser {
  person: ILoginDTO;
  organization: OrganizationModel;
  role: string | null;
}

export interface UserMeModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleNames: string[];
  profileImageURL: string;
  organizations: OrganizationModel[];
}
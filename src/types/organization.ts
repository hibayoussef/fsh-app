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

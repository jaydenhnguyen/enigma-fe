import { ROLES } from 'src/shared/constants';

export type Permission = {
  _id: string;
  permissionName: string;
  permissionModule: string;
  permissionAction: string;
  permissionScope: string;
  description: string;
  isActive: boolean;
};
export type Role = {
  _id: string;
  roleName: ROLES;
  description: string;
  permissions: Permission[];
};

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
  roleName: string;
  description: string;
  permissions: Permission[];
};

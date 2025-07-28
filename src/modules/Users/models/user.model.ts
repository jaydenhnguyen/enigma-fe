import { DRIVING_LICENSE_TYPES } from '../constants';
import { Role } from './role-permission.model';

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  drivingLicenseType: DRIVING_LICENSE_TYPES;
  roles: Role[];
  isActive: boolean;
};

export type GetMeResponse = {
  data: User;
};

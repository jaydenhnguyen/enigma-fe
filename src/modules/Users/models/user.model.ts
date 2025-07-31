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
  isActivated: boolean;
};

export type GetMeResponse = {
  data: User;
};

export type PopulatedUserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isActivated: boolean;
};

import { ROLES } from 'src/shared/constants';
import { DRIVING_LICENSE_TYPES } from '../../Users';

export const USER_TABLE_COLUMN_LABEL = {
  EMAIL: 'Email',
  PHONE: 'Phone Number',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  DOB: 'Date of Birth',
  LICENSE_TYPE: 'License Type',
  IS_ACTIVE: 'Active Status',
  ROLE: 'Roles',
};

export const USER_TABLE_COLUMN_KEY = {
  EMAIL: 'email',
  PHONE: 'phoneNumber',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  DOB: 'dob',
  LICENSE_TYPE: 'drivingLicenseType',
  IS_ACTIVE: 'isActive',
  ROLE: 'roles',
};

export type UserTableData = {
  _id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  drivingLicenseType: DRIVING_LICENSE_TYPES;
  isActive: boolean;
  roles: ROLES[];
};

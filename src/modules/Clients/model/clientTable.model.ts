import { PopulatedUserResponse } from 'src/modules/Users';

export const CLIENT_TABLE_COLUMN_LABEL = {
  EMAIL: 'Email',
  PHONE_NUMBER: 'Phone Number',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  HIRED_STATUS: 'Hired Status',
  MOVE_DATES: 'Latest Move Date',
  CURRENT_STATUS: 'Current Status',
  ASSIGNEES: 'Assignees',
};

export const CLIENT_TABLE_COLUMN_KEY = {
  EMAIL: 'email',
  PHONE_NUMBER: 'phoneNumber',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  HIRED_STATUS: 'hiredUs',
  MOVE_DATES: 'moveDates',
  CURRENT_STATUS: 'currentStatus',
  ASSIGNEES: 'assignees',
};

export type ClientTableData = {
  _id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  hiredUs: boolean;
  moveDates: string[];
  currentStatus: string;
  assignees: PopulatedUserResponse[];
};

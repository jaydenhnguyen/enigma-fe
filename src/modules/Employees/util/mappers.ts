import { User } from '../../Users';
import { UserTableData } from '../model';

export const mapRespondedUserLisToTable = (respondedUsers: User[]): UserTableData[] => {
  return respondedUsers.map((r) => {
    return {
      _id: r._id,
      email: r.email,
      firstName: r.firstName,
      lastName: r.lastName,
      phoneNumber: r.phoneNumber,
      dob: r.dob,
      drivingLicenseType: r.drivingLicenseType,
      isActive: r.isActive,
      roles: r.roles.map((role) => role.roleName),
    };
  });
};

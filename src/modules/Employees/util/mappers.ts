import { User } from '../../Users';
import { UserTableData } from '../model';

export const mapRespondedUserLisToTable = (respondedUsers: User[]): UserTableData[] => {
  return respondedUsers.map((r) => {
    return {
      ...r,
      roles: r.roles.map((role) => role.roleName),
    };
  });
};

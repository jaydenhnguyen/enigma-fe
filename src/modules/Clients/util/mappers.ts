import { ClientListItemResponse, ClientTableData } from '../model';

export const mapRespondedClientLisToTable = (respondedClients: ClientListItemResponse[]): ClientTableData[] => {
  return respondedClients.map((r) => {
    return {
      _id: r._id,
      email: r.email,
      phoneNumber: r.phoneNumber,
      firstName: r.firstName,
      lastName: r.lastName,
      hiredUs: r.hiredUs,
      moveDates: r.moveDates,
      currentStatus: r.currentStatus,
      statusHistory: r.statusHistory,
      assignees: r.assignees,
    };
  });
};

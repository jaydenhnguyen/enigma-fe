import { Client } from '../model/client.type';
import { ClientTableData } from '../model/clientTable.model';

export const mapRespondedClientLisToTable = (respondedClients: Client[]): ClientTableData[] => {
  return respondedClients.map((r) => {
    return {
      _id: r._id,
      hiredUs: r.hiredUs,
      email: r.email,
      fullName: r.fullName,
      phone: r.phone,
      moveDates: r.moveDates,
      eventsAssociated : r.eventsAssociated,
      currentStatus: r.currentStatus,
      statusHistory: r.statusHistory,
      utm:r.utm,
      assignee: r.assignee
    
    };
  });
};

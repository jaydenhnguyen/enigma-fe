import { EventResponse, EventTableData } from '../models';

export const mapRespondedEventToTable = (respondedEvents: EventResponse[]): EventTableData[] => {
  return respondedEvents.map((r) => {
    return {
      _id: r._id,
      pickupDate: r.pickupDateTime,
      deliveryDate: r.deliveryDateTime,
      clientName: r.clientId, // TODO: change to client info latter
      pickupAddress: r.pickupAddress,
      deliveryAddress: r.deliveryAddress,
      deliveryMan: [...r.pickupMoversAssigned, ...r.deliveryMoversAssigned],
      truckAddress: r.truckAddress,
      meetingTime: r.meetingUpDateTime,
    };
  });
};

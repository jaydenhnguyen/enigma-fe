import { EventDetailResponse, EventTableData } from '../models';
import { DELIVERY_ROLES } from '../constants';

export const mapRespondedEventListToTable = (respondedEvents: EventDetailResponse[]): EventTableData[] => {
  return respondedEvents.map((r) => {
    return {
      _id: r._id,
      pickupDate: r.pickupDateTime,
      deliveryDate: r.deliveryDateTime,
      clientName: r.clientId, // TODO: change to client info latter
      pickupAddress: r.pickupAddress,
      deliveryAddress: r.deliveryAddress,
      deliveryMan: [
        ...r.pickupMoversAssigned.map((pm) => ({
          ...pm,
          deliveryManType: DELIVERY_ROLES.PICKUP,
        })),
        ...r.deliveryMoversAssigned.map((dm) => ({
          ...dm,
          deliveryManType: DELIVERY_ROLES.DELIVERY,
        })),
      ],
      truckAddress: r.truckAddress,
      meetingTime: r.meetingUpDateTime,
    };
  });
};

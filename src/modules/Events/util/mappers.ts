import { EventDetailResponse, EventTableData } from '../models';
import { DELIVERY_ROLES } from '../constants';

export const mapRespondedEventListToTable = (respondedEvents: EventDetailResponse[]): EventTableData[] => {
  return respondedEvents.map((r) => {
    return {
      ...r,
      pickupDate: r.pickupDateTime,
      deliveryDate: r.deliveryDateTime,
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
      meetingTime: r.meetingUpDateTime,
    };
  });
};

export type MoverResponse = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type EventDetailResponse = {
  _id: string;
  clientId: string;
  pickupDateTime: string;
  pickupAddress: string;
  pickupMoversAssigned: MoverResponse[];
  pickupTrucksCount: number;
  pickupAddressSize: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  deliveryMoversAssigned: MoverResponse[];
  deliveryTrucksCount: number;
  deliveryAddressSize: string;
  inventoryList: string[];
  notes: string[];
  crewArrivalAddress: string;
  crewArrivalDateTime: string;
  associatedEvent: string[];
  extraServices: string[];
  clientComments: string[];
  serviceRate: number;
  truckAddress: string;
  meetingUpDateTime: string;
};

export type GetEventDetailResponse = {
  data: EventDetailResponse;
};

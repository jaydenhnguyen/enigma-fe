export type CreatedEventItemResponse = {
  _id: string;
  clientId: string;
  pickupDateTime: string;
  pickupAddress: string;
  pickupMoversAssigned: string[];
  pickupTrucksCount: number;
  pickupAddressSize: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  deliveryMoversAssigned: string[];
  deliveryTrucksCount: number;
  deliveryAddressSize: string;
  truckAddress: string;
  meetingUpDateTime: string;
  inventoryList: string[];
  notes: string[];
  crewArrivalAddress: string;
  crewArrivalDateTime: string;
  associatedEvent: string[];
  extraServices: string[];
  clientComments: string[];
  serviceRate: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventResponse = {
  data: CreatedEventItemResponse;
};

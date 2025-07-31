import { PopulatedClientResponse } from 'src/modules/Clients';
import { PaginationResponse, SortingResponse } from 'src/shared/models';

export type MoverResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isActivated: boolean;
};

export type EventDetailResponse = {
  _id: string;
  clientInfo: PopulatedClientResponse;
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

export type GetEventsResponse = {
  data: EventDetailResponse[];
  pagination: PaginationResponse;
  sorting: SortingResponse;
};

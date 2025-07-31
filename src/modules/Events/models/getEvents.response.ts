import { PopulatedUserResponse } from 'src/modules/Users';
import { PopulatedClientResponse } from 'src/modules/Clients';
import { PaginationResponse, SortingResponse } from 'src/shared/models';

export type EventDetailResponse = {
  _id: string;
  clientInfo: PopulatedClientResponse;
  pickupDateTime: string;
  pickupAddress: string;
  pickupMoversAssigned: PopulatedUserResponse[];
  pickupTrucksCount: number;
  pickupAddressSize: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  deliveryMoversAssigned: PopulatedUserResponse[];
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

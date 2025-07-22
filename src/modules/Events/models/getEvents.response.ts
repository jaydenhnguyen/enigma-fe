import { PaginationResponse, SortingResponse } from 'src/shared/models';

export type EventResponse = {
  _id: string;
  clientId: string;
  pickupDateTime: string;
  pickupAddress: string;
  pickupMoversAssigned: string[];
  pickupTrucksCount: number;
  pickupAddressSize?: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  deliveryMoversAssigned: string[];
  deliveryTrucksCount: number;
  deliveryAddressSize?: string;
  inventoryList: string[];
  notes: string[];
  crewArrivalAddress: string;
  crewArrivalDateTime: string;
  associatedEvent: string[];
  extraServices: string[];
  clientComments: string[];
  serviceRate: number | null;
  truckAddress: string;
  meetingUpDateTime: string;
};

export type GetEventsResponse = {
  data: EventResponse[];
  pagination: PaginationResponse;
  sorting: SortingResponse;
};

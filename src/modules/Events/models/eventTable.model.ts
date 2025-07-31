import { PopulatedClientResponse } from 'src/modules/Clients';
import { DELIVERY_ROLES } from '../constants';
import { MoverResponse } from './getEvents.response';

export const EVENT_TABLE_COLUMNS_LABEL = {
  PICKUP_DATE_TIME: 'Pickup Date',
  DELIVERY_DATE_TIME: 'Delivery Date',
  CLIENT_INFO: 'Client Name',
  PICKUP_ADDRESS: 'Pickup Address',
  DELIVERY_ADDRESS: 'Delivery Address',
  DELIVERY_MAN: 'Delivery Employee',
  TRUCK_ADDRESS: 'Truck Address',
  MEETING_TIME: 'Meeting Time',
};

export const EVENT_TABLE_COLUMNS_KEY = {
  PICKUP_DATE_TIME: 'pickupDateTime',
  DELIVERY_DATE_TIME: 'deliveryDateTime',
  CLIENT_INFO: 'clientInfo',
  PICKUP_ADDRESS: 'pickupAddress',
  DELIVERY_ADDRESS: 'deliveryAddress',
  DELIVERY_MAN: 'deliveryMan',
  TRUCK_ADDRESS: 'truckAddress',
  MEETING_TIME: 'meetingTime',
};

export type EventTableData = {
  _id: string;
  pickupDate: string;
  deliveryDate: string;
  clientInfo: PopulatedClientResponse;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryMan: (MoverResponse & { deliveryManType: DELIVERY_ROLES })[];
  truckAddress: string;
  meetingTime: string;
};

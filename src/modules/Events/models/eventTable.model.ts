export const EVENT_TABLE_COLUMNS_LABEL = {
  PICKUP_DATE: 'Pickup Date',
  DELIVERY_DATE: 'Delivery Date',
  CLIENT_NAME: 'Client Name',
  PICKUP_ADDRESS: 'Pickup Address',
  DELIVERY_ADDRESS: 'Delivery Address',
  DELIVERY_MAN: 'Delivery Employee',
  TRUCK_ADDRESS: 'Truck Address',
  MEETING_TIME: 'Meeting Time',
};

export const EVENT_TABLE_COLUMNS_KEY = {
  PICKUP_DATE: 'pickupDate',
  DELIVERY_DATE: 'deliveryDate',
  CLIENT_NAME: 'clientName',
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
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryMan: string[];
  truckAddress: string;
  meetingTime: string;
};

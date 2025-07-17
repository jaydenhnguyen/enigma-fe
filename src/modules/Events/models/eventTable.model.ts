export const EVENT_TABLE_COLUMNS_LABEL = {
  MOVING_DATE: 'Moving Date',
  CLIENT_NAME: 'Client Name',
  PICKUP_ADDRESS: 'Pickup Address',
  DELIVERY_ADDRESS: 'Delivery Address',
  DELIVERY_MAN: 'Delivery Employee',
  TRUCK_ADDRESS: 'Truck Address',
  MEETING_TIME: 'Meeting Time',
};

export const EVENT_TABLE_COLUMNS_KEY = {
  MOVING_DATE: 'movingDate',
  CLIENT_NAME: 'clientName',
  PICKUP_ADDRESS: 'pickupAddress',
  DELIVERY_ADDRESS: 'deliveryAddress',
  DELIVERY_MAN: 'deliveryMan',
  TRUCK_ADDRESS: 'truckAddress',
  MEETING_TIME: 'meetingTime',
} as const;

export type EventTableData = {
  [EVENT_TABLE_COLUMNS_KEY.MOVING_DATE]: string;
  [EVENT_TABLE_COLUMNS_KEY.CLIENT_NAME]: string;
  [EVENT_TABLE_COLUMNS_KEY.PICKUP_ADDRESS]: string;
  [EVENT_TABLE_COLUMNS_KEY.DELIVERY_ADDRESS]: string;
  [EVENT_TABLE_COLUMNS_KEY.DELIVERY_MAN]: string[];
  [EVENT_TABLE_COLUMNS_KEY.TRUCK_ADDRESS]: string;
  [EVENT_TABLE_COLUMNS_KEY.MEETING_TIME]: string;
};

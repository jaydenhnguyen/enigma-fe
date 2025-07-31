import { SearchOptionItem } from 'src/shared/models';
import { EVENT_TABLE_COLUMNS_KEY, EVENT_TABLE_COLUMNS_LABEL } from '../models';

export enum EVENT_TYPE {
  UP_COMING = 'UP_COMING',
  PAST = 'PAST',
}

export const SEARCH_EVENT_OPTIONS: SearchOptionItem[] = [
  {
    value: EVENT_TABLE_COLUMNS_KEY.CLIENT_INFO,
    label: EVENT_TABLE_COLUMNS_LABEL.CLIENT_INFO,
  },
  {
    value: EVENT_TABLE_COLUMNS_KEY.PICKUP_ADDRESS,
    label: EVENT_TABLE_COLUMNS_LABEL.PICKUP_ADDRESS,
  },
  {
    value: EVENT_TABLE_COLUMNS_KEY.DELIVERY_ADDRESS,
    label: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_ADDRESS,
  },
  {
    value: EVENT_TABLE_COLUMNS_KEY.DELIVERY_MAN,
    label: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_MAN,
  },
];

export enum DELIVERY_ROLES {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

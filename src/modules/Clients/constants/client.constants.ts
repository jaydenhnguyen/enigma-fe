import { SearchOptionItem } from 'src/shared/models';
import { CLIENT_TABLE_COLUMN_KEY, CLIENT_TABLE_COLUMN_LABEL } from '../model';

export const SEARCH_CLIENT_OPTIONS: SearchOptionItem[] = [
  {
    value: CLIENT_TABLE_COLUMN_KEY.EMAIL,
    label: CLIENT_TABLE_COLUMN_LABEL.EMAIL,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.PHONE_NUMBER,
    label: CLIENT_TABLE_COLUMN_LABEL.PHONE_NUMBER,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.FIRST_NAME,
    label: CLIENT_TABLE_COLUMN_LABEL.FIRST_NAME,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.LAST_NAME,
    label: CLIENT_TABLE_COLUMN_LABEL.LAST_NAME,
  },
];

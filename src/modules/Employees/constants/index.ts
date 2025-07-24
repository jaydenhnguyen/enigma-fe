import { SearchOptionItem } from 'src/shared/models';
import { USER_TABLE_COLUMN_KEY, USER_TABLE_COLUMN_LABEL } from '../model';

export const SEARCH_USER_OPTIONS: SearchOptionItem[] = [
  {
    value: USER_TABLE_COLUMN_KEY.EMAIL,
    label: USER_TABLE_COLUMN_LABEL.EMAIL,
  },
  {
    value: USER_TABLE_COLUMN_KEY.PHONE,
    label: USER_TABLE_COLUMN_LABEL.PHONE,
  },
  {
    value: USER_TABLE_COLUMN_KEY.FIRST_NAME,
    label: USER_TABLE_COLUMN_LABEL.FIRST_NAME,
  },
  {
    value: USER_TABLE_COLUMN_KEY.LAST_NAME,
    label: USER_TABLE_COLUMN_LABEL.LAST_NAME,
  },
  {
    value: USER_TABLE_COLUMN_KEY.IS_ACTIVE,
    label: USER_TABLE_COLUMN_LABEL.IS_ACTIVE,
  },
  {
    value: USER_TABLE_COLUMN_KEY.ROLE,
    label: USER_TABLE_COLUMN_LABEL.ROLE,
  },
];

import { SearchOptionItem } from 'src/shared/models';
import { CLIENT_TABLE_COLUMN_KEY, CLIENT_TABLE_COLUMN_LABEL } from '../model/clientTable.model';

export const SEARCH_CLIENT_OPTIONS: SearchOptionItem[] = [
  {
    value: CLIENT_TABLE_COLUMN_KEY.email,
    label: CLIENT_TABLE_COLUMN_LABEL.email,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.phone,
    label: CLIENT_TABLE_COLUMN_LABEL.phone,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.fullName,
    label: CLIENT_TABLE_COLUMN_LABEL.fullName,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.assignee,
    label: CLIENT_TABLE_COLUMN_LABEL.assignee,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.moveDates,
    label: CLIENT_TABLE_COLUMN_LABEL.moveDates,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.eventsAssociated,
    label: CLIENT_TABLE_COLUMN_LABEL.eventsAssociated,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.currentStatus,
    label: CLIENT_TABLE_COLUMN_LABEL.currentStatus,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.utm.utm_campaign,
    label: CLIENT_TABLE_COLUMN_LABEL.utm.utm_campaign,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.utm.utm_content,
    label: CLIENT_TABLE_COLUMN_LABEL.utm.utm_content,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.utm.utm_medium,
    label: CLIENT_TABLE_COLUMN_LABEL.utm.utm_medium,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.utm.utm_source,
    label: CLIENT_TABLE_COLUMN_LABEL.utm.utm_source,
  },
  {
    value: CLIENT_TABLE_COLUMN_KEY.utm.utm_term,
    label: CLIENT_TABLE_COLUMN_LABEL.utm.utm_term,
  },
];

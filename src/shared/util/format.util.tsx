import { format } from 'date-fns';
import { NOT_AVAILABLE_VALUE } from '../constants';

export const arrayValuesRender = (value: any) =>
  Array.isArray(value) && value.length <= 0 ? NOT_AVAILABLE_VALUE : value.join(', ');

export const commonValueRender = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length <= 0)
    ? NOT_AVAILABLE_VALUE
    : value;

export const formatDateCell = (value: string): string => {
  if (!value) return NOT_AVAILABLE_VALUE;
  const date = new Date(value);
  return format(date, 'd, MMM yyyy - hh:mm a');
};

export const timeRenderer = (event: any, key: string) => {
  const timeValue = event[key];
  return timeValue
    ? new Date(timeValue).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : NOT_AVAILABLE_VALUE;
};

export const moneyRenderer = (amount: number) => (amount !== undefined ? `$${amount.toFixed(2)}` : NOT_AVAILABLE_VALUE);

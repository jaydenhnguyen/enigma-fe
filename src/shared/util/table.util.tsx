import { NOT_AVAILABLE_CELL_VALUE } from '../constants';

export const arrayValuesRender = (value: any) =>
  Array.isArray(value) && value.length <= 0 ? NOT_AVAILABLE_CELL_VALUE : value.join(', ');

export const commonValueRender = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length <= 0)
    ? NOT_AVAILABLE_CELL_VALUE
    : value;

export const dateRenderer = (value: any) => (value ? new Date(value).toLocaleDateString() : NOT_AVAILABLE_CELL_VALUE);

export const timeRenderer = (event: any, key: string) => {
  const timeValue = event[key];
  return timeValue
    ? new Date(timeValue).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : NOT_AVAILABLE_CELL_VALUE;
};

export const moneyRenderer = (amount: number) =>
  amount !== undefined ? `$${amount.toFixed(2)}` : NOT_AVAILABLE_CELL_VALUE;

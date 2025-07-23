import { formatDateCell, moneyRenderer, commonValueRender, arrayValuesRender, timeRenderer } from 'src/shared/util'
import { NOT_AVAILABLE_VALUE } from 'src/shared/constants';
import {describe, it, expect} from '@jest/globals'

describe('arrayValuesRender', () => {
  it('returns NOT_AVAILABLE_VALUE for empty array', () => {
    expect(arrayValuesRender([])).toBe(NOT_AVAILABLE_VALUE);
  });

  it('returns comma-separated string for non-empty array', () => {
    expect(arrayValuesRender(['a', 'b', 'c'])).toBe('a, b, c');
  });
});

describe('commonValueRender', () => {
  it('returns NOT_AVAILABLE_VALUE for undefined', () => {
    expect(commonValueRender(undefined)).toBe(NOT_AVAILABLE_VALUE);
  });

  it('returns NOT_AVAILABLE_VALUE for null', () => {
    expect(commonValueRender(null)).toBe(NOT_AVAILABLE_VALUE);
  });

  it('returns NOT_AVAILABLE_VALUE for empty string', () => {
    expect(commonValueRender('')).toBe(NOT_AVAILABLE_VALUE);
  });

  it('returns NOT_AVAILABLE_VALUE for empty array', () => {
    expect(commonValueRender([])).toBe(NOT_AVAILABLE_VALUE);
  });

  it('returns original value for non-empty string', () => {
    expect(commonValueRender('hello')).toBe('hello');
  });
});

describe('formatDateCell', () => {
  it('returns NOT_AVAILABLE_VALUE for empty string', () => {
    expect(formatDateCell('')).toBe(NOT_AVAILABLE_VALUE);
  });

  it('formats date string correctly', () => {
    const date = '2022-07-25T14:30:00.000Z';
    expect(formatDateCell(date)).toBe('25, Jul 2022 - 02:30 PM');
  });
});

describe('timeRenderer', () => {
  it('returns NOT_AVAILABLE_VALUE for undefined time value', () => {
    const event = {};
    expect(timeRenderer(event, 'time')).toBe(NOT_AVAILABLE_VALUE);
  });

  it('formats time string correctly', () => {
    const event = { time: '2022-07-25T14:30:00.000Z' };
    expect(timeRenderer(event, 'time')).toBe('02:30 PM'); 
  });
});

describe('moneyRenderer', () => {

  it('formats amount correctly', () => {
    expect(moneyRenderer(10.5)).toBe('$10.50');
  });
});

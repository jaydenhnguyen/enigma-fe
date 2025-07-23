import { getPaginationRange, getPageCount } from 'src/shared/util';
import {describe, it, expect} from '@jest/globals'
import '@testing-library/jest-dom/jest-globals';

describe('getPaginationRange', () => {
  it('should return correct start and end for page 1', () => {
    const result = getPaginationRange({ currentPage: 1, pageSize: 10 });
    expect(result).toEqual({ start: 1, end: 10 });
  });

  it('should return correct start and end for page 2', () => {
    const result = getPaginationRange({ currentPage: 2, pageSize: 10 });
    expect(result).toEqual({ start: 11, end: 20 });
  });

  it('should handle pageSize = 1', () => {
    const result = getPaginationRange({ currentPage: 3, pageSize: 1 });
    expect(result).toEqual({ start: 3, end: 3 });
  });

  it('should handle currentPage = 0', () => {
    const result = getPaginationRange({ currentPage: 0, pageSize: 10 });
    expect(result).toEqual({ start: -9, end: 0 });
  });
});

describe('getPageCount', () => {
  it('should return correct total pages for evenly divisible total', () => {
    const result = getPageCount({ total: 100, pageSize: 10 });
    expect(result).toBe(10);
  });

  it('should return correct total pages for uneven total', () => {
    const result = getPageCount({ total: 103, pageSize: 10 });
    expect(result).toBe(11);
  });

  it('should return 0 when total is 0', () => {
    const result = getPageCount({ total: 0, pageSize: 10 });
    expect(result).toBe(0);
  });

  it('should return Infinity if pageSize is 0', () => {
    const result = getPageCount({ total: 100, pageSize: 0 });
    expect(result).toBe(Infinity); // Consider validating against this in production
  });
});

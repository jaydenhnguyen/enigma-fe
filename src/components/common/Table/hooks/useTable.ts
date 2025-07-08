import { useState, useCallback } from 'react';
import { SortConfig } from '../types/table.types';

export function useTable<T>(initialSort?: SortConfig<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(initialSort || null);

  const updateSortConfig = useCallback((key: keyof T) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const resetSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  return {
    sortConfig,
    updateSortConfig,
    resetSort
  };
}

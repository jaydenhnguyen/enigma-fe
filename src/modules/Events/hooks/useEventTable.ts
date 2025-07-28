import { useState, useCallback } from 'react';
import type { Event, UseEventTableReturn } from '..';
import type { SortConfig } from 'src/components/@common/Table';

export const useEventTable = (): UseEventTableReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig<Event> | null>(null);

  const updateSortConfig = useCallback((key: keyof Event) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  return {
    sortConfig,
    updateSortConfig,
  };
};

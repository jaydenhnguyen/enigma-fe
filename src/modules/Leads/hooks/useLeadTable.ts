import { useState, useCallback } from 'react';
import type { Lead, UseLeadTableReturn } from '..';
import type { SortConfig } from 'src/components/common/Table';

export const useLeadTable = (): UseLeadTableReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig<Lead> | null>(null);

  const updateSortConfig = useCallback((key: keyof Lead) => {
    setSortConfig(prevConfig => {
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
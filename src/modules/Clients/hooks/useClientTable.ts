import { useState, useCallback } from 'react';
import type { Client, UseClientTableReturn } from '..';
import type { SortConfig } from 'src/components/@common/Table';

export const useClientTable = (): UseClientTableReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig<Client> | null>(null);

  const updateSortConfig = useCallback((key: keyof Client) => {
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

import { useState, useCallback } from 'react';
import { Lead } from '../models';

interface SortConfig {
  key: keyof Lead;
  direction: 'asc' | 'desc';
}

interface UseLeadTableReturn {
  sortConfig: SortConfig | null;
  updateSortConfig: (key: keyof Lead) => void;
}

export const useLeadTable = (): UseLeadTableReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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
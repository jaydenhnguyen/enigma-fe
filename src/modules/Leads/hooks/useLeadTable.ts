import { useState, useCallback } from 'react';
import { Lead } from '../models';

interface SortConfig {
  key: keyof Lead;
  direction: 'asc' | 'desc';
}

interface UseLeadTableReturn {
  sortConfig: SortConfig | null;
  handleSort: (key: keyof Lead) => void;
  selectedLeads: string[];
  handleSelectLead: (leadId: string) => void;
  handleSelectAll: (leadIds: string[]) => void;
  clearSelection: () => void;
}

export const useLeadTable = (): UseLeadTableReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleSort = useCallback((key: keyof Lead) => {
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

  const handleSelectLead = useCallback((leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  }, []);

  const handleSelectAll = useCallback((leadIds: string[]) => {
    setSelectedLeads(prev => 
      prev.length === leadIds.length ? [] : leadIds
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLeads([]);
  }, []);

  return {
    sortConfig,
    handleSort,
    selectedLeads,
    handleSelectLead,
    handleSelectAll,
    clearSelection,
  };
};
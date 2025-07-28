import { useState, useEffect, useCallback } from 'react';
import { getLeads } from 'src/apis/leads';
import type { Lead, LeadsRequest, UseLeadsReturn } from '..';

export const useLeads = (initialParams?: LeadsRequest): UseLeadsReturn => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [currentParams, setCurrentParams] = useState<LeadsRequest>(initialParams || {});

  const limit = initialParams?.limit || 10;
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch leads only when the currentParams change.
  const fetchLeads = useCallback(async (params?: LeadsRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // Merge currentParams with any new params provided
      const requestParams = { ...currentParams, ...params };
      setCurrentParams(requestParams);
      const response = await getLeads(requestParams);
      setLeads(response.leads);
      setTotalCount(response.totalCount);
      setCurrentPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [currentParams]);

  const refetch = useCallback(() => {
    return fetchLeads(currentParams);
  }, [fetchLeads, currentParams]);

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchLeads,
    refetch,
  };
};

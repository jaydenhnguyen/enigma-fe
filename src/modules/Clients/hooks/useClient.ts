import { useState, useEffect, useCallback } from 'react';
import { getLeads } from 'src/apis/leads';
import type { Client, ClientsRequest, UseClientsReturn } from '..';

export const useClients = (initialParams?: ClientsRequest): UseClientsReturn => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [currentParams, setCurrentParams] = useState<ClientsRequest>(initialParams || {});

  const limit = initialParams?.limit || 10;
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch clients only when the currentParams change.
  const fetchClients = useCallback(async (params?: ClientsRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // Merge currentParams with any new params provided
      const requestParams = { ...currentParams, ...params };
      setCurrentParams(requestParams);
      const response = await getClients(requestParams);
      setClients(response.clients);
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

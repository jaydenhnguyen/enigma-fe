import { useState, useEffect, useCallback } from 'react';
import { getClientById, updateClient } from 'src/apis/clients';
import type { UseClientDetailReturn, ClientDetail } from '..';


export const useClientDetail = (clientId: string): UseClientDetailReturn => {
  const [clientDetail, setClientDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('useClientDetail hook initialized with clientId:', clientId);
  const fetchClientDetail = useCallback(async () => {
    if (!clientId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getClientById(clientId);
      console.log('Fetched client detail:', response.data);
      setClientDetail(response.data);
    } catch (err) {
      setError('Failed to fetch client details');
      console.error('Error fetching client:', err);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  const updateClientStatus = useCallback(async (newStatus: string, previousStatus: string) => {
    if (!clientDetail || !clientId) return;

    // TODO: Get assignee ID from cookies/context (placeholder implementation)
    const assigneeId = document.cookie
      .split('; ')
      .find(row => row.startsWith('userId='))
      ?.split('=')[1] || 'unknown';

    const newStatusEntry = {
      modifiedToStatus: newStatus,
      timestamp: new Date().toISOString(),
      assigneeId,
      previousStatus
    };

    const updatedStatusHistory = [
      ...(clientDetail.statusHistory || []),
      newStatusEntry
    ];

    try {
      setLoading(true);
      const response = await updateClient(clientId, {
        currentStatus: newStatus,
        statusHistory: updatedStatusHistory
      });

      setClientDetail(response.data);
    } catch (err) {
      setError('Failed to update client status');
      console.error('Error updating client:', err);
    } finally {
      setLoading(false);
    }
  }, [clientDetail, clientId]);

  const refetch = useCallback(async () => {
    await fetchClientDetail();
  }, [fetchClientDetail]);

  useEffect(() => {
    fetchClientDetail();
  }, [fetchClientDetail]);

  return {
    clientDetail,
    loading,
    error,
    updateClientStatus,
    refetch
  };
};

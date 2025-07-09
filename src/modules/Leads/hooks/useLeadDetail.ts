import { useState, useEffect, useCallback } from 'react';
import { getLeadById, updateLead } from 'src/apis/leads';
import type { UseLeadDetailReturn, LeadDetail } from '..';


export const useLeadDetail = (leadId: string): UseLeadDetailReturn => {
  const [leadDetail, setLeadDetail] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeadDetail = useCallback(async () => {
    if (!leadId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getLeadById(leadId);
      setLeadDetail(response.data);
    } catch (err) {
      setError('Failed to fetch lead details');
      console.error('Error fetching lead:', err);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  const updateLeadStatus = useCallback(async (newStatus: string, previousStatus: string) => {
    if (!leadDetail || !leadId) return;

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
      ...(leadDetail.statusHistory || []),
      newStatusEntry
    ];

    try {
      setLoading(true);
      const response = await updateLead(leadId, {
        currentStatus: newStatus,
        statusHistory: updatedStatusHistory
      });
      
      setLeadDetail(response.data);
    } catch (err) {
      setError('Failed to update lead status');
      console.error('Error updating lead:', err);
    } finally {
      setLoading(false);
    }
  }, [leadDetail, leadId]);

  const refetch = useCallback(async () => {
    await fetchLeadDetail();
  }, [fetchLeadDetail]);

  useEffect(() => {
    fetchLeadDetail();
  }, [fetchLeadDetail]);

  return {
    leadDetail,
    loading,
    error,
    updateLeadStatus,
    refetch
  };
};

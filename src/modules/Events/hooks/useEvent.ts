import { useState, useEffect, useCallback } from 'react';
import { getEventList } from 'src/apis/event';
import type { Event, EventsRequest, EventType, UseEventsReturn } from '..';

export const useEvent = (type: EventType, initialParams?: EventsRequest): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);
  const [currentParams, setCurrentParams] = useState<EventsRequest>(initialParams || {});

  const limit = initialParams?.limit || 10;
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch events only when the currentParams change.
  const fetchEvents = useCallback(
    async (params?: EventsRequest) => {
      setLoading(true);
      setError(null);

      try {
        // Merge currentParams with any new params provided
        const requestParams = { ...currentParams, ...params };
        setCurrentParams(requestParams);
        const response = await getEventList(type, requestParams);
        setEvents(response.events);
        setTotalCount(response.totalCount);
        setCurrentPage(response.page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    },
    [currentParams],
  );

  const refetch = useCallback(() => {
    return fetchEvents(currentParams);
  }, [fetchEvents, currentParams]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchEvents,
    refetch,
  };
};

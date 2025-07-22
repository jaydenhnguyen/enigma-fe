import { useQuery } from '@tanstack/react-query';
import { getEvents } from 'src/apis';
import { GetEventRequest } from '../models';

export function useGetEvents({ payload }: { payload: GetEventRequest }) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getUpComingEvents', payload],
    queryFn: () => getEvents(payload),
  });

  return { data, status, error, isLoading, isFetching, refetch };
}

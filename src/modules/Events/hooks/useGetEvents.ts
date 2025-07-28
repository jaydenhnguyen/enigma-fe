import { useQuery } from '@tanstack/react-query';
import { getEventList } from 'src/apis';
import { GetEventRequest } from '../models';

export function useGetEvents({ payload }: { payload: GetEventRequest }) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getEventList', payload],
    queryFn: () => getEventList(payload),
  });

  return { data, status, error, isLoading, isFetching, refetch };
}

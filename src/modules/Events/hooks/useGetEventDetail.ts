import { useQuery } from '@tanstack/react-query';
import { getEventDetail } from 'src/apis';

export function useGetEventDetail(eventId: string) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getEventDetail', eventId],
    queryFn: () => getEventDetail(eventId),
    enabled: false,
  });

  return { data: data?.data, status, error, isLoading, isFetching, refetch };
}

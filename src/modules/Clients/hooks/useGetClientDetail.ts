import { useQuery } from '@tanstack/react-query';
import { getClientDetail } from 'src/apis/clients';

export function useGetClientDetail(clientId: string) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getClientDetail', clientId],
    queryFn: () => getClientDetail(clientId),
    enabled: false,
  });

  return { data: data?.data, status, error, isLoading, isFetching, refetch };
}

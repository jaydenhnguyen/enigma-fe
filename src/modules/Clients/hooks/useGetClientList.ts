import { useQuery } from '@tanstack/react-query';
import { getClientList } from 'src/apis/clients';
import { GetClientRequest } from '../model';

export function useGetClientList({ payload }: { payload: GetClientRequest }) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getClientList', payload],
    queryFn: () => getClientList(payload),
  });

  return { data, status, error, isLoading, isFetching, refetch };
}

import { useQuery } from '@tanstack/react-query';
import { getClientList } from '../../../apis/clients';
import {GetClientListRequest} from "../model/getClientListRequest"

export function useGetClientList({ payload }: { payload: GetClientListRequest }) {
  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['getClientList', payload],
    queryFn: () => getClientList(payload),
  });

  return { data, status, error, isLoading, isFetching, refetch };
}

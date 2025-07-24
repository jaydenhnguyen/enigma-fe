import * as React from 'react';
import { useRouter } from 'next/router';
import { notify, ToastType } from 'src/components';
import { useGetCurrentUserInfo } from 'src/modules/Users/hooks';
import { USER_CONTEXT_ACTIONS, useUserContext } from 'src/shared/context';

export function useLoadAndSetUserInfo() {
  const router = useRouter();
  const { data, refetch, isFetching, error } = useGetCurrentUserInfo();
  const { dispatch } = useUserContext();

  const loadUser = React.useCallback(async () => {
    const response = await refetch();
    const userData = response.data?.data;

    if (error || !userData) {
      notify({ message: 'Can not get current user info', type: ToastType.error });
      router.replace('/404').then();
    }

    if (!isFetching && userData) {
      dispatch({
        type: USER_CONTEXT_ACTIONS.SET_AUTHENTICATED_USER,
        payload: userData,
      });
    }
  }, [refetch, dispatch, data?.data]);

  return { loadUser };
}

import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from '../configs';

export default function IndexPage() {
  const router = useRouter();
  const isAuthenticated = tokenManager.isAuthenticated();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home').then();
    } else {
      router.replace('/login').then();
    }
  }, [isAuthenticated]);

  return null;
}

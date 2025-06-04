import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/configs';

export function PrivateLayout({ children }: { children: React.ReactElement }): React.ReactElement {
  const router = useRouter();

  React.useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace('/login').then();
    }
    if (router.pathname === '/') {
      router.replace('/home').then();
    }
  }, [router]);

  return <div>{children}</div>;
}

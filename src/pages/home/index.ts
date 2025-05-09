import * as React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    if (router?.pathname === '/home') {
      router.replace('/').then();
    }
  }, [router]);
}

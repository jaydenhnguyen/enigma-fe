import * as React from 'react';
import Head from 'next/head';
import { Home } from 'src/modules/home';

export default function HomePage() {
  // const router = useRouter();
  //
  // React.useEffect(() => {
  //   if (router?.pathname === '/home') {
  //     router.replace('/').then();
  //   }
  // }, [router]);

  return (
    <>
      <Head>
        <title>A-Z Moving Admin</title>
      </Head>

      <Home />
    </>
  );
}

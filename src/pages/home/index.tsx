import * as React from 'react';
import Head from 'next/head';
import { Home } from 'src/modules/Home';
import { PrivateLayout } from 'src/layouts';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Head>
        <title>A-Z Moving Admin</title>
      </Head>
      <Home />
    </>
  );
}

HomePage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

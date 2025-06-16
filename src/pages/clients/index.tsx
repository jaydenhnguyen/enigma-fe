import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function ClientsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Clients</title>
      </Head>

      <div>this is Clients page</div>
    </>
  );
}

ClientsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

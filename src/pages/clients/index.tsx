import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { ClientsApp } from 'src/modules/Clients';

export default function ClientsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Clients</title>
      </Head>

      <ClientsApp/>
    </>
  );
}

ClientsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { LeadsApp } from 'src/modules/Leads';

export default function LeadsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Leads</title>
      </Head>

      <LeadsApp/>
    </>
  );
}

LeadsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

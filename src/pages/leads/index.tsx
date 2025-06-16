import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function LeadsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Leads</title>
      </Head>

      <div>this is Leads page</div>
    </>
  );
}

LeadsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

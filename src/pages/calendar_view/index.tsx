import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function CalendarViewPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Calendar View</title>
      </Head>

      <div>this is Calendar View page</div>
    </>
  );
}

CalendarViewPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

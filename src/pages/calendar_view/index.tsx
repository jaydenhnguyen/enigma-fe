import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { CalendarView } from 'src/modules/CalendarView';

export default function CalendarViewPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Calendar View</title>
      </Head>

      <CalendarView />
    </>
  );
}

CalendarViewPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

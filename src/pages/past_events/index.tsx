import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { Event, EVENT_TYPE } from 'src/modules/Events';

export default function PastEventsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Past Events</title>
      </Head>

      <Event eventType={EVENT_TYPE.PAST} />
    </>
  );
}

PastEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

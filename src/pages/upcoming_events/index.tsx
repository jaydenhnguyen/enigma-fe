import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { EVENT_TYPE, Event } from 'src/modules/Events';

export default function UpcomingEventsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Upcoming Events</title>
      </Head>

      <Event eventType={EVENT_TYPE.UP_COMING} />
    </>
  );
}

UpcomingEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

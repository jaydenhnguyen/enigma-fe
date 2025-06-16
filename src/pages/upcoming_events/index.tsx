import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function UpcomingEventsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Upcoming Events</title>
      </Head>

      <div>this is Upcoming Events page</div>
    </>
  );
}

UpcomingEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

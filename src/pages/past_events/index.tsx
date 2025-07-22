import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';

export default function PastEventsPage(): React.ReactElement {
  return (
    <>
      <Head>
        <title>A-Z Moving: Past Events</title>
      </Head>

      {/*<>*/}
      {/*  <EventApp type={eventType} />*/}
      {/*</>*/}
    </>
  );
}

PastEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

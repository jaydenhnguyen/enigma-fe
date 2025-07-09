import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { EventApp } from 'src/modules/Events/components/EventApp';
import type { EventType } from 'src/modules/Events';

export default function PastEventsPage(): React.ReactElement {
  const eventType: EventType = "past";
  return (
    <>
      <Head>
        <title>A-Z Moving: Past Events</title>
      </Head>

      <><EventApp type={eventType} /></>
    </>
  );
}

PastEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

import * as React from 'react';
import Head from 'next/head';
import { PrivateLayout } from 'src/layouts';
import { EventDetailPopUp, AppPopUp } from 'src/components';

export default function UpcomingEventsPage(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);

  const handleOpen = () => {
    setSelectedEvent({
      clientName: 'Kevin Dohery',
      phone: '067999777888',
      email: 'dummy@email.com',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Saved!', selectedEvent);
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>A-Z Moving: Upcoming Events</title>
      </Head>

      <div>this is Upcoming Events page</div>

      <button onClick={handleOpen}>Open PopUp</button>

      <AppPopUp isOpen={open} onClose={handleClose} onSave={handleSave} title="Event Details" width="1200px">
        <EventDetailPopUp event={selectedEvent} />
      </AppPopUp>
    </>
  );
}

UpcomingEventsPage.getLayout = (page: React.ReactElement) => <PrivateLayout>{page}</PrivateLayout>;

import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppCard } from 'src/components/common';
import classes from './CalendarView.module.scss';

type Props = {};

export function CalendarView({}: Props): React.ReactElement {
  const [events, setEvents] = React.useState([{ title: 'Meeting', start: new Date().toISOString().slice(0, 10) }]);

  const handleDateClick = (info) => {
    const title = prompt('Enter event title');
    if (title) {
      setEvents([...events, { title, start: info.dateStr }]);
    }
  };

  const handleEventDrop = (info) => {
    const updated = events.map((event) =>
      event.title === info.event.title ? { ...event, start: info.event.startStr } : event,
    );
    setEvents(updated);
  };

  return (
    <AppCard>
      <div className={classes['calendar-view-wrapper']}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          dateClick={handleDateClick}
          editable={true}
          eventDrop={handleEventDrop}
          viewClassNames={classes['check']}
          height="100%"
        />
      </div>
    </AppCard>
  );
}

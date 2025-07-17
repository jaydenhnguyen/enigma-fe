import * as React from 'react';
import classNames from 'classnames';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { isAfter, isBefore, startOfDay } from 'date-fns';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { AppCard } from 'src/components/@common';
import classes from './CalendarView.module.scss';

enum VIEW_TYPE {
  MONTH = 'dayGridMonth',
  WEEK = 'timeGridWeek',
  DAY = 'timeGridDay',
}

export function CalendarView(): React.ReactElement {
  const [events, setEvents] = React.useState([{ title: 'Meeting', start: new Date().toISOString().slice(0, 10) }]);
  const calendarRef = React.useRef<FullCalendar>(null);
  // 1 = next, -1 = prev, 0 = no animation
  const [slideDirection, setSlideDirection] = React.useState<1 | -1 | 0>(0);
  // Title from calendar
  const [title, setTitle] = React.useState('');
  // Current view type to highlight active button
  const [currentView, setCurrentView] = React.useState<VIEW_TYPE>(VIEW_TYPE.MONTH);

  // Navigation handlers
  const handleNext = () => {
    setSlideDirection(1);
    calendarRef.current?.getApi().next();
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    calendarRef.current?.getApi().prev();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();

    if (calendarApi) {
      const currentDate = startOfDay(calendarApi.getDate());
      const today = startOfDay(new Date());

      let dir: typeof slideDirection = 0;
      if (isAfter(today, currentDate)) dir = 1;
      else if (isBefore(today, currentDate)) dir = -1;

      setSlideDirection(dir);
      calendarApi.today();
    }
  };

  const getSlideAnimationClass = (dir: typeof slideDirection) => {
    if (dir === 1) return classes['slide-left'];
    if (dir === -1) return classes['slide-right'];
    return '';
  };

  // Change view handlers
  const handleChangeView = (event: SelectChangeEvent) => {
    const selectedView = event.target.value as VIEW_TYPE;
    calendarRef.current?.getApi().changeView(selectedView);
    setCurrentView(selectedView);
    setSlideDirection(0); // optional: no slide on view change
  };

  // Update title on calendar dates set
  const handleDatesSet = (arg: any) => {
    setTitle(arg.view.title);
    setCurrentView(arg.view.type);
  };

  // Clear slideDirection after animation duration (300ms)
  React.useEffect(() => {
    if (!slideDirection) return;
    const timer = setTimeout(() => setSlideDirection(0), 300);
    return () => clearTimeout(timer);
  }, [slideDirection]);

  const handleEventDrop = (info: any) => {
    const updated = events.map((event) =>
      event.title === info.event.title ? { ...event, start: info.event.startStr } : event,
    );
    setEvents(updated);
  };

  return (
    <AppCard>
      <>
        <div className={classes['top-wrapper']}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handlePrev} startIcon={<ArrowBackIosIcon />}>
              Prev
            </Button>
            <Button variant="contained" onClick={handleToday}>
              Today
            </Button>
            <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIosIcon />}>
              Next
            </Button>
          </Stack>

          <Typography variant="h4" fontWeight={600}>
            {title}
          </Typography>

          <FormControl sx={{ width: '150px' }} size="small">
            <InputLabel id="calendar-view-type-label">View type</InputLabel>
            <Select
              labelId="calendar-view-type-label"
              id="calendar-view-type"
              value={currentView}
              label="View type"
              onChange={handleChangeView}
            >
              <MenuItem value={VIEW_TYPE.MONTH}>Month</MenuItem>
              <MenuItem value={VIEW_TYPE.WEEK}>Week</MenuItem>
              <MenuItem value={VIEW_TYPE.DAY}>Day</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classNames(classes['calendar-view-wrapper'], getSlideAnimationClass(slideDirection))}>
          <FullCalendar
            ref={calendarRef}
            height="100%"
            initialView={VIEW_TYPE.MONTH}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            headerToolbar={false} // hide default toolbar
            events={events}
            eventDrop={handleEventDrop}
            datesSet={handleDatesSet}
          />
        </div>
      </>
    </AppCard>
  );
}

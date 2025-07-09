import PeopleIcon from '@mui/icons-material/People';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { MenuItem } from '../types';
import { APP_ROUTES } from './routes.constant';

export const SIDE_MENU_ITEM_NAME = {
  CALENDAR: 'Calendar',
  LEADS: 'Leads',
  UPCOMING_EVENTS: 'Upcoming Events',
  PAST_EVENTS: 'Past Events',
  MANAGE_EMPLOYEES: 'Manage Employees',
  CLIENTS: 'Clients',
};

export const SIDE_MENU_ADMIN_ITEMS: MenuItem[] = [
  {
    text: SIDE_MENU_ITEM_NAME.CALENDAR,
    icon: CalendarMonthIcon,
    route: APP_ROUTES.CALENDAR_VIEW,
  },
  {
    text: SIDE_MENU_ITEM_NAME.LEADS,
    icon: PeopleIcon,
    route: APP_ROUTES.LEADS,
  },
  {
    text: SIDE_MENU_ITEM_NAME.UPCOMING_EVENTS,
    icon: UpcomingIcon,
    route: APP_ROUTES.UPCOMING_EVENTS,
  },
  {
    text: SIDE_MENU_ITEM_NAME.PAST_EVENTS,
    icon: FindReplaceIcon,
    route: APP_ROUTES.PAST_EVENTS,
  },
  {
    text: SIDE_MENU_ITEM_NAME.MANAGE_EMPLOYEES,
    icon: EngineeringIcon,
    route: APP_ROUTES.MANAGE_EMPLOYEES,
  },
  {
    text: SIDE_MENU_ITEM_NAME.CLIENTS,
    icon: GroupAddIcon,
    route: APP_ROUTES.CLIENTS,
  },
];

export const SIDE_MENU_EMPLOYEE_ITEMS: MenuItem[] = [
  {
    text: SIDE_MENU_ITEM_NAME.CALENDAR,
    icon: CalendarMonthIcon,
    route: APP_ROUTES.CALENDAR_VIEW,
  },
  {
    text: SIDE_MENU_ITEM_NAME.UPCOMING_EVENTS,
    icon: UpcomingIcon,
    route: APP_ROUTES.UPCOMING_EVENTS,
  },
  {
    text: SIDE_MENU_ITEM_NAME.PAST_EVENTS,
    icon: FindReplaceIcon,
    route: APP_ROUTES.PAST_EVENTS,
  },
];

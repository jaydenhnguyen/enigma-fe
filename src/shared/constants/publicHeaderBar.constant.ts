import { APP_ROUTES } from './routes.constant';

export const NAV_NAME = {
  HOME: 'Home',
  ABOUT: 'About',
  CONTACT: 'Contact',
};

export const NAV_ITEMS = [
  { label: NAV_NAME.HOME, href: APP_ROUTES.INTRODUCTION },
  { label: NAV_NAME.ABOUT, href: APP_ROUTES.ABOUT_US },
  { label: NAV_NAME.CONTACT, href: APP_ROUTES.CONTACT_US },
];

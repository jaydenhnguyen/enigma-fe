// NOTE: this constant must be matched with the pages folder structure

export const APP_ROUTES = {
  /**
   *  Redirect route
   * if authenticated -> CALENDAR_VIEW
   * else -> INTRODUCTION
   * */
  HOME: '/',

  // Public routes
  INTRODUCTION: '/intro',
  ABOUT_US: '/about',
  CONTACT_US: '/contact',
  LOGIN: '/login',

  // Private routes
  CALENDAR_VIEW: '/calendar_view',
  LEADS: '/leads',
  UPCOMING_EVENTS: '/upcoming_events',
  PAST_EVENTS: '/past_events',
  MANAGE_EMPLOYEES: '/employee_management',
  CLIENTS: '/clients',
};

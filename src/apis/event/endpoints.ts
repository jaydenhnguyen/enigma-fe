export const EVENTS_ENDPOINTS = {
  GET_EVENTS: '/events',
  CREATE_EVENT: '/events',
  UPDATE_EVENT: (id: string) => `/events/${id}`,
  DELETE_EVENT: (id: string) => `/events/${id}`,
  GET_EVENT_BY_ID: (id: string) => `/events/${id}`,
} as const;

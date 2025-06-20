export const LEADS_ENDPOINTS = {
  GET_LEADS: '/leads',
  CREATE_LEAD: '/leads',
  UPDATE_LEAD: (id: string) => `/leads/${id}`,
  DELETE_LEAD: (id: string) => `/leads/${id}`,
  GET_LEAD_BY_ID: (id: string) => `/leads/${id}`,
} as const;


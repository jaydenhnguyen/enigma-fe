export const CLIENTS_ENDPOINTS = {
  GET_CLIENTS: '/clients',
  CREATE_CLIENT: '/clients',
  UPDATE_CLIENT: (id: string) => `/clients/${id}`,
  DELETE_CLIENT: (id: string) => `/clients/${id}`,
  GET_CLIENT_BY_ID: (id: string) => `/clients/${id}`,
} as const;

import type { SortConfig } from 'src/components/@common/Table';

export type Event = {
  id: string;
  toLoad?: boolean;
  moveDate: string;
  startTime: string;
  finishTime?: string;
  fullAddress: string;
  moversAssigned: string[];
  trucksAssigned: number;
  addressSize?: string;
  associatedEvent?: string[];
  inventoryList?: string[];
  extraServices?: string[];
  heardAboutUsFrom?: string;
  clientComments?: string;
  amountPaid?: number;
  amountDue?: number;
  hstRate?: number;
  total?: number;
  subtotal?: number;
  serviceRate?: number;
};

export type EventType = 'past' | 'future';

export type EventResponse = {
  events: Event[];
  totalCount: number;
  page: number;
  limit: number;
};
export type GetEventResponse = {
  data: Event | null;
  message: string;
  success: boolean;
};

export type EventsRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
};

export type UseEventsReturn = {
  events: Event[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  fetchEvents: (params?: EventsRequest) => Promise<void>;
  refetch: () => Promise<void>;
};

export type UseEventTableReturn = {
  sortConfig: SortConfig<Event> | null;
  updateSortConfig: (key: keyof Event) => void;
};

export type EventsTableProps = {
  events: Event[];
  loading?: boolean;
  onSort?: (key: keyof Event, direction: 'asc' | 'desc') => void;
  onRowClick?: (event: Event) => void;
};

export type CreateEventRequest = Omit<Event, 'id'>;
export type UpdateEventRequest = Partial<Event> & { id: string }; // id field is required for updates

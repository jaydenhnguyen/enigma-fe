import { request } from 'src/configs';
import type { EventsRequest, CreateEventRequest, EventResponse, UpdateEventRequest, GetEventResponse, EventType } from 'src/modules/Events';
import { EVENTS_ENDPOINTS } from './endpoints';
import { staticEvents } from './staticEvent';

export const getEvents = async (type: EventType, params: EventsRequest): Promise<EventResponse> => {
  const queryParams = new URLSearchParams();
  /* 
  - page: The page number for pagination.
  - limit: The number of events per page.
  - sortBy: The field to sort the events by.
  - order: The order of sorting (asc or desc).
  - search: A search term to filter events.
  */
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.order) queryParams.append('order', params.order);
  if (params.search) queryParams.append('search', params.search);

  const url = `${EVENTS_ENDPOINTS.GET_EVENTS}/${type}?${queryParams.toString()}`;
  // TODO: To implement pagination, the endpoint should return totalCount, page and limit in the response. Mock API only provide events data to get more parameters requires premium subscription. We will add those parameters manually for mock API responses.

  // NOTE: For some reason mock API was returning me "id" as attribute instead of "_id", so I had to change _id to id in the following files:
  //* 1. EventTable
  //* 2. event.type.ts
  // return await request.get(url);

  if (!process.env['NEXT_PUBLIC_MOCK_API_URL']) {
    // NOTE: Ideal API call when not using mock API.
    return await request.get(url);
  } else {
    let response = staticEvents;

    // NOTE: Adding totalCount, page and limit in the return object to mock the pagination response. 
    return {
      events: Array.isArray(response) ? response : [],
      totalCount: 3, // Mocked total count
      page: params.page || 1, // Mocked current page
      limit: params.limit || 10, // Mocked limit
    };
  }

};

export const createEvent = async (data: CreateEventRequest): Promise<EventResponse> => {
  return await request.post(EVENTS_ENDPOINTS.CREATE_EVENT, data);
};

export const updateEvent = async (id: string, data: UpdateEventRequest): Promise<EventResponse> => {
  return await request.put(EVENTS_ENDPOINTS.UPDATE_EVENT(id), data);
};

export const deleteEvent = async (id: string): Promise<void> => {
  return await request.delete(EVENTS_ENDPOINTS.DELETE_EVENT(id));
};

export const getEventById = async (id: string): Promise<GetEventResponse> => {
  // TODO: Remove this static value when the API is ready.
  const staticEvent: GetEventResponse = {
    data: staticEvents.find(event => event.id === id) ?? null,
    message: "Event fetched successfully",
    success: true
  };
  return await staticEvent; // For now, returning static event data.
};

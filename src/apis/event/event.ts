import { request } from 'src/configs';
import { GetEventRequest, GetEventsResponse, GetEventDetailResponse } from 'src/modules/Events';
import { EVENTS_ENDPOINTS } from './endpoints';

export const getEvents = async (payload: GetEventRequest): Promise<GetEventsResponse> => {
  const queryParams = new URLSearchParams();

  /*
    - page: The page number for pagination.
    - pageSize: The number of events per page.
    - sortBy: The field to sort the events by.
    - order: The order of sorting (asc or desc).
    - search: A search term to filter events.
  */

  if (payload.page) queryParams.append('page', payload.page.toString().trim());
  if (payload.pageSize) queryParams.append('pageSize', payload.pageSize.toString().trim());
  if (payload.sortBy) queryParams.append('sortBy', payload.sortBy.toString().trim());
  if (payload.sortType) queryParams.append('order', payload.sortType.toString().trim());
  if (payload.searchBy) queryParams.append('searchBy', payload.searchBy.toString().trim());
  if (payload.searchValue) queryParams.append('searchValue', payload.searchValue.toString().trim());

  const url = `${EVENTS_ENDPOINTS.GET_EVENTS}/${payload.type}?${queryParams.toString()}`;
  return await request.get(url);
};

export const getEventDetail = async (eventId: string): Promise<GetEventDetailResponse> => {
  const url = `${EVENTS_ENDPOINTS.GET_EVENTS_DETAILS}/${eventId?.trim()}`;

  return await request.get(url);
};

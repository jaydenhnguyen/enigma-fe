import { request } from 'src/configs';
import { GetEventRequest, GetEventsResponse } from 'src/modules/Events';
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

  if (payload.page) queryParams.append('page', payload.page.toString());
  if (payload.pageSize) queryParams.append('pageSize', payload.pageSize.toString());
  if (payload.sortField) queryParams.append('sortBy', payload.sortField);
  if (payload.sortType) queryParams.append('order', payload.sortType);
  if (payload.search) queryParams.append('search', payload.search);

  const url = `${EVENTS_ENDPOINTS.GET_EVENTS}/${payload.type}?${queryParams.toString()}`;
  return await request.get(url);
};

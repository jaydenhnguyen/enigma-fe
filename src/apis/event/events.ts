import { request } from 'src/configs';
import { buildListingRequestPayload } from 'src/shared/util';
import { GetEventRequest, GetEventsResponse, GetEventDetailResponse } from 'src/modules/Events';
import { EVENTS_ENDPOINTS } from './endpoints';

export const getEventList = async (payload: GetEventRequest): Promise<GetEventsResponse> => {
  const url = `${EVENTS_ENDPOINTS.GET_EVENT_LIST}/${payload.type}?${buildListingRequestPayload(payload)}`;
  return await request.get(url);
};

export const getEventDetail = async (eventId: string): Promise<GetEventDetailResponse> => {
  const url = `${EVENTS_ENDPOINTS.GET_EVENTS_DETAILS}/${eventId?.trim()}`;

  return await request.get(url);
};

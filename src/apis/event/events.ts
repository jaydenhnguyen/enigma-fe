import { request } from 'src/configs';
import { buildListingRequestPayload } from 'src/shared/util';
import {
  CreateEventRequest,
  CreateEventResponse,
  GetEventDetailResponse,
  GetEventRequest,
  GetEventsResponse,
} from 'src/modules/Events';
import { EVENTS_ENDPOINTS } from './endpoints';

export const getEventList = async (payload: GetEventRequest): Promise<GetEventsResponse> => {
  const url = `${EVENTS_ENDPOINTS.MAIN_EVENTS_ENDPOINT}/${payload.type}?${buildListingRequestPayload(payload)}`;
  return await request.get(url);
};

export const getEventDetail = async (eventId: string): Promise<GetEventDetailResponse> => {
  const url = `${EVENTS_ENDPOINTS.GET_EVENTS_DETAILS}/${eventId.trim()}`;

  return await request.get(url);
};

export const createEvent = async (payload: CreateEventRequest): Promise<CreateEventResponse> => {
  const url = EVENTS_ENDPOINTS.MAIN_EVENTS_ENDPOINT;
  return await request.post(url, payload);
};

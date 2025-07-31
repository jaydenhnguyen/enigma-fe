import { request } from 'src/configs';
import { buildListingRequestPayload } from 'src/shared/util';
import { GetClientRequest, GetClientListResponse, GetClientDetailResponse } from 'src/modules/Clients';
import { CLIENTS_ENDPOINTS } from './endpoints';

export const getClientList = async (payload: GetClientRequest): Promise<GetClientListResponse> => {
  const url = `${CLIENTS_ENDPOINTS.GET_CLIENT_LIST}?${buildListingRequestPayload(payload)}`;
  return await request.get(url);
};

export const getClientDetail = async (clientId: string): Promise<GetClientDetailResponse> => {
  const url = `${CLIENTS_ENDPOINTS.GET_CLIENT_DETAIL}/${clientId.trim()}`;
  return await request.get(url);
};

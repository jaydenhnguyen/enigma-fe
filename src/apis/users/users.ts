import { request } from 'src/configs';
import { buildListingRequestPayload } from 'src/shared/util';
import { GetMeResponse, GetUserListRequest, GetUserListResponse } from 'src/modules/Users';
import { USER_ENDPOINTS } from './endpoints';

export const getUserList = async (payload: GetUserListRequest): Promise<GetUserListResponse> => {
  const url = `${USER_ENDPOINTS.GET_USER_LIST}?${buildListingRequestPayload(payload)}`;
  return await request.get(url);
};

export const getUserDetail = async (userId: string): Promise<GetMeResponse> => {
  const url = `${USER_ENDPOINTS.GET_USER_DETAIL}/${userId?.trim()}`;

  return await request.get(url);
};

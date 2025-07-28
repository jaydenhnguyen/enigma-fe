import { request } from 'src/configs';
import { GetMeResponse } from 'src/modules/Users/models';
import { USER_ENDPOINTS } from './endpoints';

export const getMe = async (): Promise<GetMeResponse> => await request.get(USER_ENDPOINTS.ME);

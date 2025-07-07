import { request } from 'src/configs';
import { LoginRequest, LoginResponse } from 'src/modules/Authentication/Login/models';
import { AUTH_ENDPOINTS } from './endpoints';

export const login = async (loginPayload: LoginRequest): Promise<LoginResponse> =>
  await request.post(AUTH_ENDPOINTS.LOGIN, loginPayload);

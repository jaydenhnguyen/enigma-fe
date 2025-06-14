import { request } from 'src/configs';
import { AUTH_ENDPOINTS } from './endpoints';
import { LoginRequest, LoginResponse } from 'src/modules/Authentication/Login/models';

export const login = async (loginPayload: LoginRequest): Promise<LoginResponse> =>
  await request.post(AUTH_ENDPOINTS.LOGIN, loginPayload);

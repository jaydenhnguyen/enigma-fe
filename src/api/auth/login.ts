import { request } from 'src/utils';
import { RegisterRequest } from 'src/modules/Register/models';
import { UpdateCurrentUserPasswordRequest } from 'src/modules/UserProfile/models';
import { LoginRequest, RefreshTokenRequest, RefreshTokenResponse } from 'src/modules/Login/models';

export const login = async (loginPayload: LoginRequest) => await request.post('/auth/login', loginPayload);

export const refreshAccessToken = async (payload: RefreshTokenRequest): Promise<RefreshTokenResponse> =>
  await request.post('/auth/refresh-token', payload);

export const register = (data: RegisterRequest) => request.post('/auth/register', data, {});

export const updateCurrentUserPassword = async (payload: UpdateCurrentUserPasswordRequest) =>
  await request.post('/auth/reset-password', payload);

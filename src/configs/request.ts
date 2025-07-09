import qs from 'qs';
import axios, { AxiosError } from 'axios';
import isNil from 'lodash/isNil';
import camelcaseKeys from 'camelcase-keys';
import { envVariables } from './environment';
import { tokenManager } from './tokensManager';
import { StatusCodes } from 'http-status-codes';

// TODO: Added to provide mock API endpoint for the lead table. Remove this when the API is ready.
const baseURL = process.env['NEXT_PUBLIC_MOCK_API_URL'] ? envVariables.MOCK_API_URL : envVariables.BASE_API_URL;

export const request = axios.create({
  timeout: 10000,
  baseURL: envVariables.BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

request.interceptors.request.use(
  (config) => {
    const accessToken: string = tokenManager.getAccessToken();
    if (!isNil(accessToken)) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => camelcaseKeys(response.data),
  (error: AxiosError) => {
    const errorResponse = error.response as {
      status: number;
      data: {
        code: string;
        message: string;
      };
    };
    const status = errorResponse?.status;

    if (status === StatusCodes.UNAUTHORIZED) {
      tokenManager.clearSession();
      // window.location.href = PathName.AuthLogin;
      return Promise.reject(errorResponse?.data);
    }
    return Promise.reject(errorResponse?.data);
  },
);

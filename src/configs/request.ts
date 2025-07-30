import qs from 'qs';
import isNil from 'lodash/isNil';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { StatusCodes } from 'http-status-codes';
import { APP_ROUTES } from 'src/shared/constants';
import { envVariables } from './environment';
import { tokenManager } from './tokensManager';

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
      window.location.href = APP_ROUTES.INTRODUCTION;
      return Promise.reject(errorResponse?.data);
    }
    return Promise.reject(errorResponse?.data);
  },
);

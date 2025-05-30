import qs from 'qs';
import axios from 'axios';
import { isNil } from 'lodash';
import { envVariables } from './environment';
import { CookiesStorage } from './cookies';

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
    const accessToken: string = CookiesStorage.getAccessToken();
    if (!isNil(accessToken)) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

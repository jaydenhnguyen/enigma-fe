import axios from 'axios';
import qs from 'qs';
import { envVariables } from './environment';

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

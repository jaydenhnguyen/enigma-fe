import Cookies from 'js-cookie';
import { isNil } from 'lodash';
import { addSeconds } from 'date-fns';
import { CookieKey } from 'src/shared/constants';
import { envVariables } from './environment';

export const CookiesStorage = {
  get(key: string): string | undefined {
    return Cookies.get(key) as string | undefined;
  },

  setCookieData(key: string, data: string | number | null | undefined, expireTimestamp?: number, path?: string) {
    if (isNil(data)) return;

    const domain = window.location.hostname;
    const expires = expireTimestamp
      ? new Date(expireTimestamp * 1000)
      : addSeconds(new Date(), envVariables.ACCESS_TOKEN_TTL);

    return Cookies.set(key, data.toString(), { domain, expires, path: path ?? '/' });
  },

  clearCookieData(key: string, path = '/') {
    const domain = window.location.hostname;
    return Cookies.remove(key, { domain, path: path ?? '/' });
  },

  getAccessToken() {
    return Cookies.get(CookieKey.AccessToken) as string;
  },

  getRefreshToken() {
    return Cookies.get(CookieKey.RefreshToken) as string;
  },

  isAuthenticated() {
    const accessToken = Cookies.get(CookieKey.AccessToken) as string;
    const refreshToken = Cookies.get(CookieKey.RefreshToken) as string;
    return !!accessToken || !!refreshToken;
  },

  clearSession() {
    this.clearCookieData(CookieKey.AccessToken);
  },
};

import Cookies from 'js-cookie';
import { CookieKey } from 'src/shared/constants/auth.constant';
import { envVariables } from './environment';
import { CookiesStorage, cookiesStorage } from './cookies';

type TokensParams = {
  accessToken: string;
  expireIn: number;
};

class TokensManager {
  constructor(private readonly cookiesStorage: CookiesStorage) {}

  setAccessToken({ accessToken, expireIn }: TokensParams): void {
    console.log('CookieKey.AccessToken', CookieKey.AccessToken);
    this.cookiesStorage.setCookieData(CookieKey.AccessToken, accessToken, expireIn ?? envVariables.ACCESS_TOKEN_TTL);
  }

  getAccessToken() {
    return this.cookiesStorage.get(CookieKey.AccessToken) as string;
  }

  getRefreshToken() {
    return this.cookiesStorage.get(CookieKey.RefreshToken) as string;
  }

  isAuthenticated() {
    const accessToken = Cookies.get(CookieKey.AccessToken) as string;
    const refreshToken = Cookies.get(CookieKey.RefreshToken) as string;
    return !!accessToken || !!refreshToken;
  }

  clearSession() {
    this.cookiesStorage.clearCookieData(CookieKey.AccessToken);
  }

  removeAllCredentials(): void {
    this.cookiesStorage.clearCookieData(CookieKey.AccessToken);
    this.cookiesStorage.clearCookieData(CookieKey.RefreshToken);
  }
}

export const tokenManager = new TokensManager(cookiesStorage);

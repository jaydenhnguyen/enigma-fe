import { envVariables } from 'src/configs';

export const CookieKey = {
  AccessToken: `${envVariables.APP_NAME}/accessToken`,
  RefreshToken: `${envVariables.APP_NAME}/refreshToken`,
};

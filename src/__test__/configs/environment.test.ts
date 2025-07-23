import { describe, it, expect } from '@jest/globals';
import { envVariables } from 'src/configs/environment';

describe('envVariables', () => {
  it('should not have undefined values', () => {
    expect(envVariables.APP_NAME).not.toBeUndefined();
    expect(envVariables.BASE_API_URL).not.toBeUndefined();
    expect(envVariables.MOCK_API_URL).not.toBeUndefined();
    expect(envVariables.ACCESS_TOKEN_TTL).not.toBeUndefined();
  });
});

// src/configs/cookies.test.ts

import Cookies from 'js-cookie';
import { addSeconds } from 'date-fns';
import { CookiesStorage } from 'src/configs/cookies';
import {describe, it, beforeAll, beforeEach, expect, jest} from '@jest/globals'
import '@testing-library/jest-dom/jest-globals';

jest.mock('js-cookie');

describe('CookiesStorage', () => {
  let cookiesStorage: CookiesStorage;
  const mockHostname = 'test.domain.com';

  beforeAll(() => {
    // Mock window.location.hostname
    Object.defineProperty(window, 'location', {
      value: {
        hostname: mockHostname,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    cookiesStorage = new CookiesStorage();
  });

  describe('get', () => {
    it('should call Cookies.get with the given key and return the value', () => {
      (Cookies.get as jest.Mock).mockReturnValue('cookieValue');
      const result = cookiesStorage.get('testKey');
      expect(Cookies.get).toHaveBeenCalledWith('testKey');
      expect(result).toBe('cookieValue');
    });
  });

  describe('setCookieData', () => {
    it('should not set cookie if data is null or undefined', () => {
      cookiesStorage.setCookieData('key1', null);
      cookiesStorage.setCookieData('key2', undefined);
      expect(Cookies.set).not.toHaveBeenCalled();
    });

    it('should call Cookies.set with correct parameters', () => {
      const key = 'myKey';
      const data = 'myData';
      const expireIn = 100; // seconds
      const path = '/custom-path';

      const now = new Date();
      jest.useFakeTimers().setSystemTime(now);

      cookiesStorage.setCookieData(key, data, expireIn, path);

      expect(Cookies.set).toHaveBeenCalledWith(
        key,
        data.toString(),
        expect.objectContaining({
          domain: mockHostname,
          path,
          expires: addSeconds(now, expireIn),
        }),
      );

      jest.useRealTimers();
    });

    it('should use default expire time and path when not provided', () => {
      const key = 'keyDefault';
      const data = 123;

      const now = new Date();
      jest.useFakeTimers().setSystemTime(now);

      cookiesStorage.setCookieData(key, data);

      expect(Cookies.set).toHaveBeenCalledWith(
        key,
        data.toString(),
        expect.objectContaining({
          domain: mockHostname,
          path: '/',
          expires: addSeconds(now, 3600),
        }),
      );

      jest.useRealTimers();
    });
  });

  describe('clearCookieData', () => {
    it('should call Cookies.remove with the given key and path', () => {
      const key = 'keyToRemove';
      const path = '/customPath';

      cookiesStorage.clearCookieData(key, path);

      expect(Cookies.remove).toHaveBeenCalledWith(key, {
        domain: mockHostname,
        path,
      });
    });

    it('should default path to "/" if not provided', () => {
      const key = 'keyDefaultPath';

      cookiesStorage.clearCookieData(key);

      expect(Cookies.remove).toHaveBeenCalledWith(key, {
        domain: mockHostname,
        path: '/',
      });
    });
  });
});

import { Path } from 'react-hook-form';
import { LoginRequest } from '../models';

export const PASSWORD_LENGTH = 8;

export const LOGIN_FORM_FIELDS: { [K in keyof LoginRequest]: Path<LoginRequest> } = {
  email: 'email',
  password: 'password',
} as const;

import { Path } from 'react-hook-form';
import { LoginFormSchema } from '../hooks';

export const PASSWORD_LENGTH = 8;

export const LOGIN_FORM_FIELDS: { [K in keyof LoginFormSchema]: Path<LoginFormSchema> } = {
  email: 'email',
  password: 'password',
} as const;

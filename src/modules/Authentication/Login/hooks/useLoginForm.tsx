import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequest } from '../models';
import { PASSWORD_LENGTH } from '../constants';

export const loginFormValidator = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(PASSWORD_LENGTH, { message: `Password must be at least ${PASSWORD_LENGTH} characters` }),
});

export function useLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginFormValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {
    control,
    formHandleSubmit: handleSubmit,
    formState: { errors, isSubmitting },
  };
}

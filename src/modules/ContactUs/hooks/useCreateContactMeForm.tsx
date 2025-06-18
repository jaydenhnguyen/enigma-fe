import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateContactMeRequest } from '../models';

export const createContactMeValidator = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  message: z.string().min(1, 'Message is required'),
});

export function useCreateContactMeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateContactMeRequest>({
    resolver: zodResolver(createContactMeValidator),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  return {
    control,
    formHandleSubmit: handleSubmit,
    formState: { errors, isSubmitting },
  };
}

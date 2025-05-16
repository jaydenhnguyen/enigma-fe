import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PASSWORD_LENGTH } from '../constants';

const loginFormValidator = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(PASSWORD_LENGTH, { message: `Password must be at least ${PASSWORD_LENGTH} characters` }),
});

export type LoginFormSchema = z.infer<typeof loginFormValidator>;

export function useLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data: LoginFormSchema) => {
    console.log(data);
    //   TODO: handle call API here
  });

  return {
    onSubmit,
    control,
    formState: { errors, isSubmitting },
  };
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactRequest = z.infer<typeof contactSchema>;

export function useContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  return {
    control,
    formHandleSubmit: handleSubmit,
    errors,
  };
}

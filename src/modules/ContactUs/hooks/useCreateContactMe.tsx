import { useMutation } from '@tanstack/react-query';
import { createContactMe } from 'src/apis';
import { CreateContactMeRequest } from '../models';

export function useCreateContactMe(onSuccess?: () => void, onError?: () => void) {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (createContactMePayload: CreateContactMeRequest) => createContactMe(createContactMePayload),
    onSuccess: () => onSuccess?.(),
    onError: () => onError?.(),
  });

  return { mutate, data, error, isPending };
}

import { useMutation } from '@tanstack/react-query';
import { notify, ToastType } from 'src/components';
import { createEvent } from 'src/apis';
import { CreateEventRequest } from '../models';

export function useCreateEvent(onSuccess?: () => void) {
  const { mutate, status, error, isPending } = useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
    onSuccess: () => {
      notify({ message: 'Create Event Success', type: ToastType.success });
      return onSuccess?.();
    },
    onError: () => notify({ message: 'Fail to create event', type: ToastType.error }),
  });

  return { mutate, status, error, isLoading: isPending };
}

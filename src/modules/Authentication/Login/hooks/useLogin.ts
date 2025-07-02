import { useMutation } from '@tanstack/react-query';
import { login } from 'src/apis';
import { LoginRequest, LoginResponse } from '../models';

export function useLogin(onLoginSuccess: (loginResponse: LoginResponse) => void, onError?: (error: any) => void) {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (loginPayload: LoginRequest) => login(loginPayload),
    onSuccess: (data: LoginResponse) => onLoginSuccess(data as unknown as LoginResponse),
    onError,
  });
  return { mutate, data, error, isPending };
}

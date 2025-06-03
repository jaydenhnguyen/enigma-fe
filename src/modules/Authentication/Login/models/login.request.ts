import * as z from 'zod';
import { loginFormValidator } from '../hooks';

export type LoginRequest = z.infer<typeof loginFormValidator>;

import * as z from 'zod';
import { createContactMeValidator } from '../hooks';

export type CreateContactMeRequest = z.infer<typeof createContactMeValidator>;

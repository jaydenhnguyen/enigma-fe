import { request } from 'src/configs';
import { CreateContactMeRequest } from 'src/modules/ContactUs/models';
import { CONTACT_ME_ENDPOINTS } from './endpoint';

export const createContactMe = async (payload: CreateContactMeRequest): Promise<void> => {
  await request.post(CONTACT_ME_ENDPOINTS.CONTACT_ME_REQUEST, payload);
};

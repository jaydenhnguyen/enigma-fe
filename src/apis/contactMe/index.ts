import { request } from 'src/configs';
import { CreateContactMeRequest } from 'src/modules/ContactUs/models';
import { CONTACT_ME_ENDPOINTS } from './endpoint';

export const createContactMe = async (payload: CreateContactMeRequest): Promise<void> => {
  const check = {
    customerName: payload.name,
    customerEmail: payload.email,
    customerPhoneNumber: '+1 437 595 2745',
    message: payload.message,
  };
  await request.post(CONTACT_ME_ENDPOINTS.CONTACT_ME_REQUEST, check);
};

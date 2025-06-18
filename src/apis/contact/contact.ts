import { ContactRequest } from 'src/modules/Contact/useContactForm';
import { request } from 'src/configs';
import { CONTACT_ENDPOINTS } from './endpoint';

export const contact = async (payload: ContactRequest): Promise<void> => {
    await request.post(CONTACT_ENDPOINTS.CONTACT, payload);

//   const response = await fetch(CONTACT_ENDPOINTS.CONTACT, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to send contact message');
//   }
};

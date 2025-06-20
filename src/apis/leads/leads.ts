import { request } from '../../configs';
import { LeadsRequest, LeadsResponse, CreateLeadRequest, LeadResponse } from '../../modules/Leads/models';
import { LEADS_ENDPOINTS } from './endpoints';

export const getLeads = async (params: LeadsRequest): Promise<LeadsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.search) queryParams.append('search', params.search);

  const url = `${LEADS_ENDPOINTS.GET_LEADS}?${queryParams.toString()}`;
  
  return await request.get(url);
};

export const createLead = async (data: CreateLeadRequest): Promise<LeadResponse> => {
  return await request.post(LEADS_ENDPOINTS.CREATE_LEAD, data);
};

export const updateLead = async (id: string, data: Partial<CreateLeadRequest>): Promise<LeadResponse> => {
  return await request.put(LEADS_ENDPOINTS.UPDATE_LEAD(id), data);
};

export const deleteLead = async (id: string): Promise<void> => {
  return await request.delete(LEADS_ENDPOINTS.DELETE_LEAD(id));
};

export const getLeadById = async (id: string): Promise<LeadResponse> => {
  return await request.get(LEADS_ENDPOINTS.GET_LEAD_BY_ID(id));
};

import { request } from 'src/configs';
import type { LeadsRequest, LeadsResponse, CreateLeadRequest, LeadResponse } from 'src/modules/Leads';
import { LEADS_ENDPOINTS } from './endpoints';
import { staticLead as staticValueOfLead } from './staticLead';

export const getLeads = async (params: LeadsRequest): Promise<LeadsResponse> => {
  const queryParams = new URLSearchParams();
  /* 
  - page: The page number for pagination.
  - limit: The number of leads per page.
  - sortBy: The field to sort the leads by.
  - order: The order of sorting (asc or desc).
  - search: A search term to filter leads.
  */
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.order) queryParams.append('order', params.order);
  if (params.search) queryParams.append('search', params.search);

  const url = `${LEADS_ENDPOINTS.GET_LEADS}?${queryParams.toString()}`;
  // TODO: To implement pagination, the endpoint should return totalCount, page and limit in the response. Mock API only provide leads data to get more parameters requires premium subscription. We will add those parameters manually for mock API responses.

  // NOTE: For some reason mock API was returning me "id" as attribute instead of "_id", so I had to change _id to id in the following files:
  //* 1. LeadTable
  //* 2. lead.type.ts
  // return await request.get(url);

  if (!process.env['NEXT_PUBLIC_MOCK_API_URL']) {
    // NOTE: Ideal API call when not using mock API.
    return await request.get(url);
  } else {
    console.log('Using mock API for leads data: ', url);
    let response = await request.get(url);
    console.log(response)
    // NOTE: Adding totalCount, page and limit in the return object to mock the pagination response. 
    return {
      leads: Array.isArray(response) ? response : [],
      totalCount: 80, // Mocked total count
      page: params.page || 1, // Mocked current page
      limit: params.limit || 10, // Mocked limit
    };
  }

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
  // TODO: Remove this static value when the API is ready.
  const staticLead: LeadResponse = {
    data: staticValueOfLead,
    message: "Lead fetched successfully",
    success: true
  };
  return await staticLead; // For now, returning static lead data.
};

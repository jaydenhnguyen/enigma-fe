import { request } from 'src/configs';
import type { ClientsRequest, ClientsResponse, ClientResponse, UpdateClientRequest } from 'src/modules/Clients';
import { CLIENTS_ENDPOINTS } from './endpoints';
import { staticClient as staticValueOfClient, staticClients as staticValueOfClients } from './staticClient';

export const getClients = async (params: ClientsRequest): Promise<ClientsResponse> => {
  const queryParams = new URLSearchParams();
  /* 
  - page: The page number for pagination.
  - limit: The number of clients per page.
  - sortBy: The field to sort the clients by.
  - order: The order of sorting (asc or desc).
  - search: A search term to filter clients.
  */
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.order) queryParams.append('order', params.order);
  if (params.search) queryParams.append('search', params.search);

  const url = `${CLIENTS_ENDPOINTS.GET_CLIENTS}?${queryParams.toString()}`;
  // TODO: To implement pagination, the endpoint should return totalCount, page and limit in the response. Mock API only provide clients data to get more parameters requires premium subscription. We will add those parameters manually for mock API responses.

  // NOTE: For some reason mock API was returning me "id" as attribute instead of "_id", so I had to change _id to id in the following files:
  //* 1. ClientTable
  //* 2. client.type.ts
  // return await request.get(url);

  if (!process.env['NEXT_PUBLIC_MOCK_API_URL']) {
    // NOTE: Ideal API call when not using mock API.
    return await request.get(url);
  } else {
    let response = staticValueOfClients; // Using static clients data for mock API.
    // NOTE: Adding totalCount, page and limit in the return object to mock the pagination response. 
    return {
      clients: Array.isArray(response) ? response : [],
      totalCount: 80, // Mocked total count
      page: params.page || 1, // Mocked current page
      limit: params.limit || 10, // Mocked limit
    };
  }

};

export const updateClient = async (id: string, data: UpdateClientRequest): Promise<ClientResponse> => {
  return await request.put(CLIENTS_ENDPOINTS.UPDATE_CLIENT(id), data);
};

export const deleteClient = async (id: string): Promise<void> => {
  return await request.delete(CLIENTS_ENDPOINTS.DELETE_CLIENT(id));
};

export const getClientById = async (id: string): Promise<ClientResponse> => {
  // TODO: Remove this static value when the API is ready.
  const staticClient: ClientResponse = {
    data: staticValueOfClient,
    message: "Client fetched successfully",
    success: true
  };
  return await staticClient; // For now, returning static client data.
};

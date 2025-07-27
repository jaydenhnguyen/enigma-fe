import { Client } from './client.type';
import { PaginationResponse, SortingResponse } from '../../../shared/models';

export type GetClientListResponse = {
  data: Client[];
  pagination: PaginationResponse;
  sorting: SortingResponse;
};

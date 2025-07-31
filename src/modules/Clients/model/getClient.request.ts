import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';

export type GetClientRequest = PaginateRequest & SortingRequest & SearchingRequest;

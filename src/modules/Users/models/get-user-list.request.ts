import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';

export type GetUserListRequest = PaginateRequest & SortingRequest & SearchingRequest;

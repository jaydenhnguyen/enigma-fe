import { User } from './user.model';
import { PaginationResponse, SortingResponse } from 'src/shared/models';

export type GetUserListResponse = {
  data: User[];
  pagination: PaginationResponse;
  sorting: SortingResponse;
};

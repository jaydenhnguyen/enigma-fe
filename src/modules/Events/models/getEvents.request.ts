import { EVENT_TYPE } from '../constants';
import { PaginateRequest, SortingRequest } from 'src/shared/models';

export type GetEventRequest = {
  type: EVENT_TYPE;
  search?: string;
} & PaginateRequest &
  SortingRequest;

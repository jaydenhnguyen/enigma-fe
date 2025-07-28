import { EVENT_TYPE } from '../constants';
import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';

export type GetEventRequest = {
  type: EVENT_TYPE;
} & PaginateRequest &
  SortingRequest &
  SearchingRequest;

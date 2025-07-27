import { PaginateRequest, SearchingRequest, SortingRequest } from "src/shared/models";

export type GetClientListRequest = PaginateRequest & SortingRequest & SearchingRequest;

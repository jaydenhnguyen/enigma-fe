import { PopulatedUserResponse } from 'src/modules/Users';
import { PaginationResponse, SortingResponse } from 'src/shared/models';

export type PopulatedClientResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type ClientDetailResponse = {
  _id: string;
  hiredUs: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  moveDates: string[];
  currentStatus: string;
  statusHistory: {
    modifiedToStatus: string;
    timestamp: string;
    modifiedBy: PopulatedUserResponse;
  }[];
  utm: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
  assignee: PopulatedUserResponse[];
};

export type ClientListItemResponse = {
  _id: string;
  hiredUs: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  moveDates: string[];
  currentStatus: string;
  statusHistory: {
    modifiedToStatus: string;
    timestamp: string;
    modifiedBy: string | undefined;
  };
  utm: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
  assignees: PopulatedUserResponse[];
  createdAt: string;
  updatedAt: string;
};

export type GetClientListResponse = {
  data: ClientListItemResponse[];
  pagination: PaginationResponse;
  sorting: SortingResponse;
};

export type GetClientDetailResponse = {
  data: ClientDetailResponse;
};

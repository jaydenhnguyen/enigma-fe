import { Client } from "./lead.type";

export type ClientDetailsProps = {
  client: Client;
}

export type StatusHistoryEntry = {
  modifiedToStatus: string;
  timestamp: string;
  _id?: string;
  assigneeId?: string;
  previousStatus?: string;
};

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export type ClientDetail = {
  _id: string;
  hiredUs: boolean;
  fullName: string;
  email?: string;
  phone?: string;
  moveDates: string[];
  eventsAssociated?: string[];
  currentStatus?: string;
  statusHistory?: StatusHistoryEntry[];
  utm?: UtmData;
  assignee?: string[];
  createdAt: string;
  updatedAt: string;
  amountPaid?: number;
}

export type UpdateClientRequest = {
  hiredUs?: boolean;
  fullName?: string;
  email?: string;
  phone?: string;
  moveDates?: string[];
  eventsAssociated?: string[];
  currentStatus?: string;
  statusHistory?: StatusHistoryEntry[];
  utm?: UtmData;
  assignee?: string[];
}

export type ClientResponse = {
  data: ClientDetail;
  message?: string;
  success?: boolean;
}

export type UseClientDetailReturn = {
  clientDetail: ClientDetail | null;
  loading: boolean;
  error: string | null;
  updateClientStatus: (newStatus: string, previousStatus: string) => Promise<void>;
  refetch: () => Promise<void>;
}

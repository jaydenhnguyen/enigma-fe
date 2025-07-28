import { Lead } from "./lead.type";

export type LeadDetailsProps = {
  lead: Lead;
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

export type LeadDetail = {
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
}

export type CreateLeadRequest = {
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

export type LeadResponse = {
  data: LeadDetail;
  message?: string;
  success?: boolean;
}

export type UseLeadDetailReturn = {
  leadDetail: LeadDetail | null;
  loading: boolean;
  error: string | null;
  updateLeadStatus: (newStatus: string, previousStatus: string) => Promise<void>;
  refetch: () => Promise<void>;
}


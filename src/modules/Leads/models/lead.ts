import { LEADS_CONSTANTS } from "../constants";

export type LeadStatus = typeof LEADS_CONSTANTS.LEAD_STATUSES[number];

export interface Lead {
  _id: string;
  fullName: string;
  moveDate: string;
  phone: string;
  email: string;
  currentStatus?: LeadStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  utm_campaign?: string;
  utm_metric?: string;
  utm_source?: string;
  utm_term?: string;
  refusalReason?: string;
}

// Add an interface for single lead response.
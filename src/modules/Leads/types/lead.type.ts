import { LEADS_CONSTANTS } from "../constants/lead.constants";
import type { SortConfig } from 'src/components/common/Table';

export type LeadStatus = typeof LEADS_CONSTANTS.LEAD_STATUSES[number];

export type Lead = {
  id: string;
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

export type LeadsResponse = {
  leads: Lead[];
  totalCount: number;
  page: number;
  limit: number;
}

export type LeadResponse = {
  success: boolean;
  data: Lead;
  message?: string;
}

export type LeadsRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export type CreateLeadRequest = {
  name: string;
  movingDate: string;
  phone: string;
  email: string;
  utm_campaign?: string;
  utm_metric?: string;
  utm_source?: string;
}

export type UseLeadsReturn = {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  fetchLeads: (params?: LeadsRequest) => Promise<void>;
  refetch: () => Promise<void>;
}

export type UseLeadTableReturn = {
  sortConfig: SortConfig<Lead> | null;
  updateSortConfig: (key: keyof Lead) => void;
}

export type LeadsTableProps = {
  leads: Lead[];
  loading?: boolean;
  onSort?: (key: keyof Lead, direction: 'asc' | 'desc') => void;
}

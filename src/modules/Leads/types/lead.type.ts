import { LEADS_CONSTANTS } from "..";
import type { SortConfig } from 'src/components/common/Table';

export type LeadStatus = typeof LEADS_CONSTANTS.LEAD_STATUSES[number];

export interface Lead {
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

export interface LeadsResponse {
  leads: Lead[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface LeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
}

export interface LeadsRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface CreateLeadRequest {
  name: string;
  movingDate: string;
  phone: string;
  email: string;
  utm_campaign?: string;
  utm_metric?: string;
  utm_source?: string;
}

export interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  fetchLeads: (params?: LeadsRequest) => Promise<void>;
  refetch: () => Promise<void>;
}

export interface UseLeadTableReturn {
  sortConfig: SortConfig<Lead> | null;
  updateSortConfig: (key: keyof Lead) => void;
}

export interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
  onSort?: (key: keyof Lead, direction: 'asc' | 'desc') => void;
}
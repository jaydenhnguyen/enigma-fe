import { Lead } from "./index";

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
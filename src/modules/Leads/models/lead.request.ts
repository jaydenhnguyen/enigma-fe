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
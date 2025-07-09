import { CLIENTS_CONSTANTS } from "../constants/client.constants";
import type { SortConfig } from 'src/components/common/Table';

export type ClientStatus = typeof CLIENTS_CONSTANTS.CLIENT_STATUS[number];

export type Client = {
  id: string;
  fullName: string;
  moveDate: string;
  phone: string;
  email: string;
  currentStatus?: ClientStatus;
  createdAt: string;
  updatedAt: string;
  utm_campaign?: string;
  utm_metric?: string;
  utm_source?: string;
  utm_term?: string;
  amountPaid?: number;
}

export type ClientsResponse = {
  clients: Client[];
  totalCount: number;
  page: number;
  limit: number;
} 

export type ClientsRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}


export type UseClientsReturn = {
  clients: Client[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  fetchClients: (params?: ClientsRequest) => Promise<void>;
  refetch: () => Promise<void>;
}

export type UseClientTableReturn = {
  sortConfig: SortConfig<Client> | null;
  updateSortConfig: (key: keyof Client) => void;
}

export type ClientsTableProps = {
  clients: Client[];
  loading?: boolean;
  onSort?: (key: keyof Client, direction: 'asc' | 'desc') => void;
  onRowClick?: (client: Client) => void;
}

import React from 'react';
import type { Client, ClientStatus, ClientsTableProps } from '../types/client.type';
import { useClientTable } from '../hooks/useClientTable';
import {
  Table,
  TableColumn,
  dateRenderer,
  statusBadgeRenderer,
  emptyValueRenderer,
} from 'src/components/@common/Table';
import { CLIENTS_CONSTANTS } from '../constants/client.constants';
import classes from '../styles/ClientsTable.module.scss';

export function ClientsTable({ clients, loading = false, onSort, onRowClick }: ClientsTableProps): React.ReactElement {
  const clientStatuses: ClientStatus[] = [...CLIENTS_CONSTANTS.CLIENT_STATUS];
  const { sortConfig, updateSortConfig } = useClientTable();

  const handleSortClick = (key: keyof Client) => {
    updateSortConfig(key);
    if (onSort && sortConfig) {
      onSort(key, sortConfig.direction);
    }
  };

  const getStatusBadge = statusBadgeRenderer({
    new: classes['statusNew'] || '',
    contacted: classes['statusContacted'] || '',
    qualified: classes['statusQualified'] || '',
    converted: classes['statusConverted'] || '',
    lost: classes['statusLost'] || '',
  });

  const renderClientStatus = (status: any) => {
    const validStatus =
      typeof status === 'string' && clientStatuses.includes(status.toLowerCase() as ClientStatus)
        ? (status.toLowerCase() as ClientStatus)
        : 'new';

    return getStatusBadge(validStatus);
  };

  const columns: TableColumn<Client>[] = [
    {
      key: 'fullName',
      label: 'Name',
      sortable: true,
      className: classes['nameColumn'],
    },
    {
      key: 'moveDate',
      label: 'Moving Date',
      sortable: true,
      render: dateRenderer,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: classes['emailColumn'],
    },
    {
      key: 'amountPaid',
      label: 'Amount Paid',
      sortable: true,
      render: (amount: number) => {
        return amount ? `$${amount.toLocaleString()}` : 'N/A';
      },
    },
    {
      key: 'currentStatus',
      label: 'Client Status',
      sortable: true,
      render: renderClientStatus,
    },
    {
      key: 'createdAt',
      label: 'Client Creation Date',
      sortable: true,
      render: dateRenderer,
    },
    {
      key: 'updatedAt',
      label: 'Client Modified Date',
      sortable: true,
      render: dateRenderer,
    },
    {
      key: 'utm_campaign',
      label: 'UTM Campaign',
      sortable: false,
      render: emptyValueRenderer,
    },
    {
      key: 'utm_metric',
      label: 'UTM Metric',
      sortable: false,
      render: emptyValueRenderer,
    },
    {
      key: 'utm_source',
      label: 'UTM Source',
      sortable: false,
      render: emptyValueRenderer,
    },
  ];

  return (
    <Table
      data={clients}
      columns={columns}
      loading={loading}
      onSort={handleSortClick}
      onRowClick={onRowClick}
      sortConfig={sortConfig}
      emptyMessage="No Clients found"
      rowKey="id"
    />
  );
}

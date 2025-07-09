import React from 'react';
import type { Lead, LeadStatus, LeadsTableProps } from '../types/lead.type';
import { useLeadTable } from '../hooks/useLeadTable';
import { Table, TableColumn, dateRenderer, statusBadgeRenderer, emptyValueRenderer } from 'src/components/common/Table';
import { LEADS_CONSTANTS } from '../constants/lead.constants';
import classes from '../constants/LeadsTable.module.scss';

export function LeadsTable({ leads, loading = false, onSort }: LeadsTableProps): React.ReactElement {
  const leadStatuses: LeadStatus[] = [...LEADS_CONSTANTS.LEAD_STATUSES];
  const { sortConfig, updateSortConfig } = useLeadTable();

  const handleSortClick = (key: keyof Lead) => {
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

  const renderLeadStatus = (status: any) => {
    const validStatus = typeof status === 'string' && 
      leadStatuses.includes(status.toLowerCase() as LeadStatus)
      ? (status.toLowerCase() as LeadStatus)
      : 'new';
    
    return getStatusBadge(validStatus);
  };

  const columns: TableColumn<Lead>[] = [
    {
      key: 'fullName',
      label: 'Name',
      sortable: true,
      className: classes['nameColumn']
    },
    {
      key: 'moveDate',
      label: 'Moving Date',
      sortable: true,
      render: dateRenderer
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: classes['emailColumn']
    },
    {
      key: 'currentStatus',
      label: 'Lead Status',
      sortable: true,
      render: renderLeadStatus
    },
    {
      key: 'createdAt',
      label: 'Lead Creation Date',
      sortable: true,
      render: dateRenderer
    },
    {
      key: 'updatedAt',
      label: 'Lead Modified Date',
      sortable: true,
      render: dateRenderer
    },
    {
      key: 'refusalReason',
      label: 'Refusal Reason',
      sortable: false,
      render: emptyValueRenderer
    },
    {
      key: 'utm_campaign',
      label: 'UTM Campaign',
      sortable: false,
      render: emptyValueRenderer
    },
    {
      key: 'utm_metric',
      label: 'UTM Metric',
      sortable: false,
      render: emptyValueRenderer
    },
    {
      key: 'utm_source',
      label: 'UTM Source',
      sortable: false,
      render: emptyValueRenderer
    }
  ];

  return (
    <Table
      data={leads}
      columns={columns}
      loading={loading}
      onSort={handleSortClick}
      sortConfig={sortConfig}
      emptyMessage="No leads found"
      rowKey="id"
    />
  );
}

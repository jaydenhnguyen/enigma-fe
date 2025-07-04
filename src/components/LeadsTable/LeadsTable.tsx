import React from 'react';
import { Lead, LeadStatus } from 'src/modules/Leads/models';
import { useLeadTable } from 'src/modules/Leads/hooks';
import classes from './LeadsTable.module.scss';
import { LEADS_CONSTANTS } from 'src/modules/Leads/constants';

interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
  onSort?: (key: keyof Lead, direction: 'asc' | 'desc') => void;
}

// onSort actually sorts by refetching the leads with the new sort parameters.
function LeadsTable({ leads, loading = false, onSort }: LeadsTableProps): React.ReactElement {
  const leadStatuses: LeadStatus[] = [...LEADS_CONSTANTS.LEAD_STATUSES];
  const { sortConfig, updateSortConfig } = useLeadTable();
  const handleSortClick = (key: keyof Lead) => {
    updateSortConfig(key);
    if (onSort && sortConfig) {
      onSort(key, sortConfig.direction);
    }
  };

  const getSortIcon = (key: keyof Lead) => {
    if (sortConfig?.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: LeadStatus) => {
    const statusClasses: Record<LeadStatus, string | undefined> = {
      new: classes['statusNew'],
      contacted: classes['statusContacted'],
      qualified: classes['statusQualified'],
      converted: classes['statusConverted'],
      lost: classes['statusLost'],
    };

    return (
      <span className={`${classes['statusBadge']} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={classes['loadingContainer']}>
        <div className={classes['spinner']}>Loading leads...</div>
      </div>
    );
  }

  return (
    <div className={classes['tableContainer']}>
      <div className={classes['tableWrapper']}>
        <table className={classes['table']}>
          <thead className={classes['tableHead']}>
            <tr>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('fullName')}>
                Name {getSortIcon('fullName')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('moveDate')}>
                Moving Date {getSortIcon('moveDate')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('phone')}>
                Phone {getSortIcon('phone')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('email')}>
                Email {getSortIcon('email')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('currentStatus')}>
                Lead Status {getSortIcon('currentStatus')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('createdAt')}>
                Lead Creation Date {getSortIcon('createdAt')}
              </th>
              <th className={classes['sortableHeader']} onClick={() => handleSortClick('updatedAt')}>
                Lead Modified Date {getSortIcon('updatedAt')}
              </th>
              <th>Refusal Reason</th>
              <th>UTM Campaign</th>
              <th>UTM Metric</th>
              <th>UTM Source</th>
            </tr>
          </thead>
          <tbody className={classes['tableBody']}>
            {leads.map((lead) => (
              <tr key={lead._id} className={classes['tableRow']}>
                <td className={classes['nameColumn']}>{lead.fullName}</td>
                <td>{formatDate(lead.moveDate)}</td>
                <td>{lead.phone}</td>
                <td className={classes['emailColumn']}>{lead.email}</td>
                <td>
                  {getStatusBadge(
                    typeof lead.currentStatus === 'string' &&
                      leadStatuses.includes(lead.currentStatus.toLowerCase() as LeadStatus)
                      ? (lead.currentStatus.toLowerCase() as LeadStatus)
                      : 'new',
                  )}
                </td>
                <td>{formatDate(lead.createdAt)}</td>
                <td>{formatDate(lead.updatedAt)}</td>
                <td>{lead.refusalReason || '-'}</td>
                <td>{lead.utm_campaign || '-'}</td>
                <td>{lead.utm_metric || '-'}</td>
                <td>{lead.utm_source || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className={classes['emptyState']}>
          <p>No leads found</p>
        </div>
      )}
    </div>
  );
}

export { LeadsTable };


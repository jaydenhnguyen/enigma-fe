import React from 'react';
import { Lead } from '../../modules/Leads/models';
import { useLeadTable } from '../../modules/Leads/hooks';
import classes from './LeadsTable.module.scss';

interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
  onSort?: (key: keyof Lead, direction: 'asc' | 'desc') => void;
}

function LeadsTable({ 
    leads, 
    loading = false,
    onSort 
}: LeadsTableProps) {
    const {
        sortConfig,
        handleSort,
        selectedLeads,
        handleSelectLead,
        handleSelectAll,
    } = useLeadTable();

    const handleSortClick = (key: keyof Lead) => {
        handleSort(key);
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

    const getStatusBadge = (
        status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
    ) => {
        const statusClasses: Record<
            'new' | 'contacted' | 'qualified' | 'converted' | 'lost',
            string | undefined
        > = {
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
                            <th className={classes['checkboxColumn']}>
                                <input
                                    type="checkbox"
                                    checked={selectedLeads.length === leads.length && leads.length > 0}
                                    onChange={() => handleSelectAll(leads.map(lead => lead.id))}
                                />
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('name')}
                            >
                                Name {getSortIcon('name')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('movingDate')}
                            >
                                Moving Date {getSortIcon('movingDate')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('phone')}
                            >
                                Phone {getSortIcon('phone')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('email')}
                            >
                                Email {getSortIcon('email')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('leadStatus')}
                            >
                                Lead Status {getSortIcon('leadStatus')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('leadCreationDate')}
                            >
                                Lead Creation Date {getSortIcon('leadCreationDate')}
                            </th>
                            <th 
                                className={classes['sortableHeader']}
                                onClick={() => handleSortClick('leadModifiedDate')}
                            >
                                Lead Modified Date {getSortIcon('leadModifiedDate')}
                            </th>
                            <th>Refusal Reason</th>
                            <th>UTM Campaign</th>
                            <th>UTM Metric</th>
                            <th>UTM Source</th>
                        </tr>
                    </thead>
                    <tbody className={classes['tableBody']}>
                        {leads.map((lead) => (
                            <tr key={lead.id} className={classes['tableRow']}>
                                <td className={classes['checkboxColumn']}>
                                    <input
                                        type="checkbox"
                                        checked={selectedLeads.includes(lead.id)}
                                        onChange={() => handleSelectLead(lead.id)}
                                    />
                                </td>
                                <td className={classes['nameColumn']}>{lead.name}</td>
                                <td>{formatDate(lead.movingDate)}</td>
                                <td>{lead.phone}</td>
                                <td className={classes['emailColumn']}>{lead.email}</td>
                                <td>{getStatusBadge(lead.leadStatus)}</td>
                                <td>{formatDate(lead.leadCreationDate)}</td>
                                <td>{formatDate(lead.leadModifiedDate)}</td>
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

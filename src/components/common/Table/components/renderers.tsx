import React from 'react';
import classes from '../styles/Table.module.scss';

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const dateRenderer = (value: string) => {
  return formatDate(value);
};

export const statusBadgeRenderer = (statusClasses: Record<string, string>) => 
  (status: string): React.ReactNode => {
    const statusClass = statusClasses[status.toLowerCase()] || '';
    return (
      <span className={`${classes['statusBadge']} ${statusClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

export const emptyValueRenderer = (value: any) => value || '-';

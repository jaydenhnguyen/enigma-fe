import React from 'react';
import { TableHeader, TableBody } from '..';
import type { TableProps } from '..';
import classes from '../styles/Table.module.scss';

export function Table<T>({
  data,
  columns,
  loading = false,
  onSort,
  sortConfig,
  emptyMessage = 'No data found',
  className = '',
  rowKey,
}: TableProps<T>): React.ReactElement {
  const handleSort = (key: keyof T) => {
    if (onSort) {
      onSort(key);
    }
  };

  if (loading) {
    return (
      <div className={classes['loadingContainer']}>
        <div className={classes['spinner']}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`${classes['tableContainer']} ${className}`}>
      <div className={classes['tableWrapper']}>
        <table className={classes['table']}>
          <TableHeader columns={columns} sortConfig={sortConfig ?? null} onSort={handleSort} />
          <TableBody data={data} columns={columns} rowKey={rowKey} />
        </table>
      </div>

      {data.length === 0 && (
        <div className={classes['emptyState']}>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}


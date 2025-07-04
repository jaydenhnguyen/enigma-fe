import React from 'react';
import { TableColumn } from '..';
import type { TableHeaderProps } from '..';
import classes from '../styles/Table.module.scss';


export function TableHeader<T>({ columns, sortConfig, onSort }: TableHeaderProps<T>): React.ReactElement {
  const getSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleHeaderClick = (column: TableColumn<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  return (
    <thead className={classes['tableHead']}>
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`${column.sortable ? classes['sortableHeader'] : ''} ${column.className || ''}`}
            onClick={() => handleHeaderClick(column)}
            style={{ width: column.width }}
          >
            {column.label}
            {column.sortable && ` ${getSortIcon(column.key)}`}
          </th>
        ))}
      </tr>
    </thead>
  );
}


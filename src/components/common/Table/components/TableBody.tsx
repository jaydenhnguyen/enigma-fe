import React from 'react';
import { TableColumn } from '../';
import type { TableBodyProps } from '..';
import classes from '../styles/Table.module.scss';

export function TableBody<T>({ data, columns, rowKey }: TableBodyProps<T>): React.ReactElement {
  const renderCellContent = (column: TableColumn<T>, record: T) => {
    const value = record[column.key];
    
    if (column.render) {
      return column.render(value, record);
    }
    
    return value as React.ReactNode;
  };

  return (
    <tbody className={classes['tableBody']}>
      {data.map((record) => (
        <tr key={String(record[rowKey])} className={classes['tableRow']}>
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className={column.className || ''}
              style={{ width: column.width }}
            >
              {renderCellContent(column, record)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
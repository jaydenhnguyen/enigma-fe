import React from 'react';
import classes from '../styles/TablePage.module.scss';
import type { PaginationProps } from '..';

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  onPageChange,
  entityName
}: PaginationProps) {
  const renderPageButtons = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${classes['pageButton']} ${i === currentPage ? classes['activePageButton'] : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={classes['paginationSection']}>
      <div className={classes['pagination']}>
        <button
          className={classes['pageButton']}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageButtons()}
        <button
          className={classes['pageButton']}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className={classes['paginationInfo']}>
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of{' '}
        {totalCount} {entityName}
      </div>
    </div>
  );
}

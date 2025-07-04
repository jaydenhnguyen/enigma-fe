import React from 'react';
import type { TablePageProps } from '..';
import { SearchAndActions, Pagination } from '..';
import classes from '../styles/TablePage.module.scss';

export function TablePage<T>({
  title,
  data,
  totalCount,
  totalPages,
  currentPage,
  itemsPerPage,
  loading,
  error,
  searchTerm,
  onSearch,
  onSort,
  onPageChange,
  onRefresh,
  onAdd,
  renderTable,
  addButtonText,
  searchPlaceholder,
  className = '',
}: TablePageProps<T>): React.ReactElement {
  const entityName = title.toLowerCase();

  return (
    <div className={`${classes['dataPageContainer']} ${className}`}>
      <div className={classes['header']}>
        <div className={classes['titleSection']}>
          <h1 className={classes['title']}>{title}</h1>
          <span className={classes['count']}>
            {totalCount} {totalCount === 1 ? entityName.slice(0, -1) : entityName}
          </span>
        </div>

        <SearchAndActions
          searchTerm={searchTerm}
          onSearch={onSearch}
          onRefresh={onRefresh}
          onAdd={onAdd}
          loading={loading}
          addButtonText={addButtonText}
          searchPlaceholder={searchPlaceholder}
        />
      </div>

      {error && (
        <div className={classes['errorMessage']}>
          <p>Error: {error}</p>
          <button onClick={onRefresh} className={classes['retryButton']}>
            Retry
          </button>
        </div>
      )}

      <div className={classes['tableSection']}>{renderTable(data, loading, onSort)}</div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        entityName={entityName}
      />
    </div>
  );
}


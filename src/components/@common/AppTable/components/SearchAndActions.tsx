import React from 'react';
import classes from '../styles/AppTable.module.scss'
import type { SearchAndActionsProps } from 'src/shared/types';

export function SearchAndActions({
  searchTerm,
  onSearch,
  onRefresh,
  onAdd,
  loading,
  addButtonText = 'Add New',
  searchPlaceholder = 'Search...'
}: SearchAndActionsProps): React.ReactElement {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={classes['actions']}>
      <div className={classes['searchContainer']}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearch}
          className={classes['searchInput']}
        />
      </div>

      <button 
        onClick={onRefresh} 
        className={classes['refreshButton']} 
        disabled={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>

      {onAdd && (
        <button onClick={onAdd} className={classes['addButton']}>
          {addButtonText}
        </button>
      )}
    </div>
  );
}


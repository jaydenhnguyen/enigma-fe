// src/modules/Leads/Leads.tsx
import React, { useState } from 'react';
import { useLeads } from './hooks';
import { LeadsTable } from '../../components/LeadsTable';
import { Lead } from './models';
import classes from './Leads.module.scss';

const Leads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  
  const {
    leads,
    loading,
    error,
    totalCount,
    totalPages,
    fetchLeads,
    refetch,
  } = useLeads({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
    fetchLeads({
      page: 1,
      limit: itemsPerPage,
      search: e.target.value,
    });
  };

  const handleSort = (key: keyof Lead, direction: 'asc' | 'desc') => {
    fetchLeads({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      sortBy: key,
      sortOrder: direction,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchLeads({
      page,
      limit: itemsPerPage,
      search: searchTerm,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${classes['pageButton']} ${
            i === currentPage ? classes['activePageButton'] : ''
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={classes['pagination']}>
        <button
          className={classes['pageButton']}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages}
        <button
          className={classes['pageButton']}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={classes['leadsContainer']}>
      <div className={classes['header']}>
        <div className={classes['titleSection']}>
          <h1 className={classes['title']}>Leads</h1>
          <span className={classes['leadCount']}>
            {totalCount} {totalCount === 1 ? 'lead' : 'leads'}
          </span>
        </div>
        
        <div className={classes['actions']}>
          <div className={classes['searchContainer']}>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={handleSearch}
              className={classes['searchInput']}
            />
          </div>
          
          <button
            onClick={handleRefresh}
            className={classes['refreshButton']}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          
          <button className={classes['addButton']}>
            Add Lead
          </button>
        </div>
      </div>

      {error && (
        <div className={classes['errorMessage']}>
          <p>Error: {error}</p>
          <button onClick={handleRefresh} className={classes['retryButton']}>
            Retry
          </button>
        </div>
      )}

      <div className={classes['tableSection']}>
        <LeadsTable
          leads={leads}
          loading={loading}
          onSort={handleSort}
        />
      </div>

      {totalPages > 1 && (
        <div className={classes['paginationSection']}>
          {renderPagination()}
          <div className={classes['paginationInfo']}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} leads
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;

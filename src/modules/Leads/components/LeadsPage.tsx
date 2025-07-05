import React from 'react';
import { useLeads, LeadsTable } from '..';
import { TablePage, useTablePage } from 'src/components/common/TablePage';
import type { Lead } from '..';

export function Leads(): React.ReactElement {
  const { 
    searchTerm, 
    currentPage, 
    itemsPerPage, 
    handleSearch, 
    handlePageChange 
  } = useTablePage({
    initialItemsPerPage: 10
  });

  const { leads, loading, error, totalCount, totalPages, fetchLeads, refetch } = useLeads({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const handleSearchChange = (term: string, page: number) => {
    fetchLeads({
      page,
      limit: itemsPerPage,
      search: term,
    });
  };

  const handleSort = (key: keyof Lead, direction: 'asc' | 'desc') => {
    fetchLeads({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      sortBy: key,
      order: direction,
    });
  };

  const handlePageChangeInternal = (page: number) => {
    fetchLeads({
      page,
      limit: itemsPerPage,
      search: searchTerm,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderTable = (data: Lead[], loading: boolean, onSort: (key: keyof Lead, direction: 'asc' | 'desc') => void) => {
    return <LeadsTable leads={data} loading={loading} onSort={onSort} />;
  };
  return (
    <TablePage
      title="Leads"
      data={leads}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearch={(term) => handleSearch(term, handleSearchChange)}
      onSort={handleSort}
      onPageChange={(page) => handlePageChange(page, handlePageChangeInternal)}
      onRefresh={handleRefresh}
      renderTable={renderTable}
      addButtonText="Add Lead"
      searchPlaceholder="Search leads..."
    />
  );
}
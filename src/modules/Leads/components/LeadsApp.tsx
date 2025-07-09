import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import { LeadsTable } from './LeadsTable';
import { AppTable, useAppTable } from 'src/components/common/AppTable';
import type { Lead } from '../types/lead.type';
import { AppPopUp } from 'src/components/common';
import { LeadDetailDisplay } from './LeadDetailDisplay';

export function LeadsApp(): React.ReactElement {
  const { 
    searchTerm, 
    currentPage, 
    itemsPerPage, 
    handleSearch, 
    handlePageChange 
  } = useAppTable({
    initialItemsPerPage: 10
  });

  const [isLeadSelected, setIsLeadSelected] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
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

  const onRowClick = (lead: Lead) => {
    // Handle row click, e.g., navigate to lead details page
    setIsLeadSelected(!isLeadSelected);
    setSelectedLead(lead);
  };

  const renderTable = (
    data: Lead[],
    loading: boolean,
    onSort: (key: keyof Lead, direction: 'asc' | 'desc') => void,
    onRowClick?: (lead: Lead) => void
  ) => {
    return <LeadsTable leads={data} loading={loading} onSort={onSort} onRowClick={onRowClick} />;
  };
  return (
    <>
      <AppTable
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
        onRowClick={onRowClick}
        onPageChange={(page) => handlePageChange(page, handlePageChangeInternal)}
        onRefresh={handleRefresh}
        renderTable={renderTable}
        addButtonText="Add Lead"
        searchPlaceholder="Search leads..."
      />
      {isLeadSelected && selectedLead && (
        <AppPopUp
          isOpen={isLeadSelected}
          onClose={() => setIsLeadSelected(false)}
          title="Lead Details"
        >
          <LeadDetailDisplay lead={selectedLead} />
        </AppPopUp>
      )}
    </>
  );
}

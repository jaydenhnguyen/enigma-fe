import React, { useState } from 'react';
import { useClients } from '../hooks/useClient';
import { ClientsTable } from './ClientTable';
import { AppTable, useAppTable } from 'src/components/@common/AppTable';
import { ClientDetailDisplay, type Client } from '..';
import { AppPopUp } from 'src/components/@common';

// import { LeadDetailDisplay } from '../../../layouts/ClientDetailDisplay';

export function ClientsApp(): React.ReactElement {
  const { searchTerm, currentPage, itemsPerPage, handleSearch, handlePageChange } = useAppTable({
    initialItemsPerPage: 10,
  });

  const [isClientSelected, setIsClientSelected] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { clients, loading, error, totalCount, totalPages, fetchClients, refetch } = useClients({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const handleSearchChange = (term: string, page: number) => {
    fetchClients({
      page,
      limit: itemsPerPage,
      search: term,
    });
  };

  const handleSort = (key: keyof Client, direction: 'asc' | 'desc') => {
    fetchClients({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      sortBy: key,
      order: direction,
    });
  };

  const handlePageChangeInternal = (page: number) => {
    fetchClients({
      page,
      limit: itemsPerPage,
      search: searchTerm,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const onRowClick = (client: Client) => {
    // Handle row click, e.g., navigate to client details page
    setIsClientSelected(!isClientSelected);
    setSelectedClient(client);
  };

  const renderTable = (
    data: Client[],
    loading: boolean,
    onSort: (key: keyof Client, direction: 'asc' | 'desc') => void,
    onRowClick?: (client: Client) => void,
  ) => {
    return <ClientsTable clients={data} loading={loading} onSort={onSort} onRowClick={onRowClick} />;
  };
  return (
    <>
      <AppTable
        title="Clients"
        data={clients}
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
        addButtonText="Add Client"
        searchPlaceholder="Search clients..."
      />
      {isClientSelected && selectedClient && (
        <AppPopUp isOpen={isClientSelected} onClose={() => setIsClientSelected(false)} title="Client Details">
          <ClientDetailDisplay client={selectedClient} />
        </AppPopUp>
      )}
    </>
  );
}

import React, { useState } from "react";
import { useAppTable } from "src/components/common/AppTable";
import {type Event, type EventType, useEvent, EventTable } from "..";
import { AppTable } from "src/components/common/AppTable";
import { AppPopUp } from "src/components";

export function EventApp({type}: {type: EventType}): React.ReactElement {
const { 
    searchTerm, 
    currentPage, 
    itemsPerPage, 
    handleSearch, 
    handlePageChange 
  } = useAppTable({
    initialItemsPerPage: 10
  });

  const [isEventSelected, setIsEventSelected] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, loading, error, totalCount, totalPages, fetchEvents, refetch } = useEvent(type, {
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const handleSearchChange = (term: string, page: number) => {
    fetchEvents({
      page,
      limit: itemsPerPage,
      search: term,
    });
  };

  const handleSort = (key: keyof Event, direction: 'asc' | 'desc') => {
    fetchEvents({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
      sortBy: key,
      order: direction,
    });
  };

  const handlePageChangeInternal = (page: number) => {
    fetchEvents({
      page,
      limit: itemsPerPage,
      search: searchTerm,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const onRowClick = (event: Event) => {
    // Handle row click, e.g., navigate to event details page
    setIsEventSelected(!isEventSelected);
    setSelectedEvent(event);
  };

  const renderTable = (
    data: Event[],
    loading: boolean,
    onSort: (key: keyof Event, direction: 'asc' | 'desc') => void,
    onRowClick?: (event: Event) => void
  ) => {
    return <EventTable events={data} loading={loading} onSort={onSort} onRowClick={onRowClick} />;
  };
  return (
    <>
      <AppTable
        title="Events"
        data={events}
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
        addButtonText="Add Event"
        searchPlaceholder="Search events..."
      />
      {isEventSelected && selectedEvent && (
        <AppPopUp
          isOpen={isEventSelected}
          onClose={() => setIsEventSelected(false)}
          title="Event Details"
        >
          <></>
        </AppPopUp>
      )}
    </>
  );
}
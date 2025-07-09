import React from 'react';
import type { Event, EventsTableProps } from '..';
import { useEventTable } from '..';
import { Table, TableColumn, dateRenderer, emptyValueRenderer } from 'src/components/common/Table';
import classes from '../styles/LeadsTable.module.scss';

export function EventTable({ events, loading = false, onSort, onRowClick }: EventsTableProps): React.ReactElement {
  const { sortConfig, updateSortConfig } = useEventTable();

  const handleSortClick = (key: keyof Event) => {
    updateSortConfig(key);
    if (onSort && sortConfig) {
      onSort(key, sortConfig.direction);
    }
  };

  const timeRenderer = (event: Event, timeKey: 'startTime' | 'finishTime') => {
    const time = event[timeKey];
    return time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';
  };

  const moneyRenderer = (value: number | undefined) => {
    return value !== undefined ? `$${value.toFixed(2)}` : 'N/A';
  };

  const columns: TableColumn<Event>[] = [
    {
        key: 'id',
        label: 'Event ID',
        sortable: true,
        render: (event: Event) => {
          return <span className={classes['event-id']}>{event.id}</span>;
        }
    },
    {
      key: 'moveDate',
      label: 'Moving Date',
      sortable: true,
      render: dateRenderer,
    },
    {
      key: 'startTime',
      label: 'Start Time',
      sortable: true,
      render: (event: Event) => {
        return timeRenderer(event, 'startTime');
      },
    },
    {
      key: 'finishTime',
      label: 'Finish Time',
      sortable: true,
      render: (event: Event) => {
        return timeRenderer(event, 'finishTime');
      },
    },
    {
      key: 'toLoad',
      label: 'Event Type',
      sortable: true,
      render: (event: Event) => {
        if (event.toLoad === undefined) {
          return 'N/A';
        }
        return event.toLoad ? 'Loading' : 'Unloading';
      },
    },
    {
      key: 'fullAddress',
      label: 'Full Address',
      sortable: true,
      render: emptyValueRenderer,
    },
    {
      key: 'moversAssigned',
      label: 'Movers Assigned',
      sortable: true,
      render: (event: Event) => event.moversAssigned.join(', ') || 'N/A',
    },
    {
      key: 'trucksAssigned',
      label: 'Trucks Assigned',
      sortable: true,
      render: emptyValueRenderer,
    },
    {
      key: 'addressSize',
      label: 'Address Size',
      sortable: true,
      render: emptyValueRenderer,
    },
    {
      key: 'associatedEvent',
      label: 'Previous Events',
      sortable: false,
      render: (event: Event) => {
        if (!event.associatedEvent || event.associatedEvent.length === 0) {
          return 'N/A';
        }
        return event.associatedEvent.length;
      },
    },
    {
      key: 'inventoryList',
      label: 'Inventory List',
      sortable: false,
      render: (event: Event) => {
        if (!event.inventoryList || event.inventoryList.length === 0) {
          return 'N/A';
        }
        return event.inventoryList.join(', ');
      },
    },

    {
      key: 'extraServices',
      label: 'Extra Services',
      sortable: false,
      render: (event: Event) => {
        if (!event.extraServices || event.extraServices.length === 0) {
          return 'N/A';
        }
        return event.extraServices.join(', ');
      },
    },
    {
      key: 'heardAboutUsFrom',
      label: 'Heard About Us From',
      sortable: false,
      render: emptyValueRenderer,
    },
    {
      key: 'clientComments',
      label: 'Client Comments',
      sortable: false,
      render: emptyValueRenderer,
    },
    {
      key: 'amountPaid',
      label: 'Amount Paid',
      sortable: false,
      render: (event: Event) => {
        return event.amountPaid !== undefined ? moneyRenderer(event.amountPaid) : 'N/A';
      },
    },

    {
      key: 'amountDue',
      label: 'Amount Due',
      sortable: false,
      render: (event: Event) => {
        return event.amountDue !== undefined ? moneyRenderer(event.amountDue) : 'N/A';
      },
    },
    {
      key: 'hstRate',
      label: 'HST Rate',
      sortable: false,
      render: (event: Event) => {
        return event.hstRate !== undefined ? `${(event.hstRate * 100).toFixed(2)}%` : 'N/A';
      },
    },
    {
      key: 'total',
      label: 'Total',
      sortable: false,
      render: (event: Event) => {
        return event.total !== undefined ? moneyRenderer(event.total) : 'N/A';
      },
    },
    {
      key: 'subtotal',
      label: 'Subtotal',
      sortable: false,
      render: (event: Event) => {
        return event.subtotal !== undefined ? moneyRenderer(event.subtotal) : 'N/A';
      },
    },
    {
      key: 'serviceRate',
      label: 'Service Rate',
      sortable: false,
      render: (event: Event) => {
        return event.serviceRate !== undefined ? moneyRenderer(event.serviceRate) : 'N/A';
      },
    },
  ];

  return (
    <Table
      data={events}
      columns={columns}
      loading={loading}
      onSort={handleSortClick}
      onRowClick={onRowClick}
      sortConfig={sortConfig}
      emptyMessage="No leads found"
      rowKey="id"
    />
  );
}


import * as React from 'react';
import { ColDef } from 'ag-grid-enterprise';
import { SortingRequest } from 'src/shared/models';
import { DEFAULT_TABLE_COLUMN_CONFIG } from 'src/shared/constants';
import { commonValueRender, generateSortableColumnHeaderMenu, renderActionColumn } from 'src/shared/util';
import { CLIENT_TABLE_COLUMN_KEY, CLIENT_TABLE_COLUMN_LABEL, ClientTableData } from '../model';

type Props = {
  setSortModel: (sortModel: SortingRequest) => void;
  onClickView?: (clientId: string) => void;
  onClickEdit?: (clientId: string) => void;
};
const formatDate = (value: Date | string): string => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString();
};

export function useBuildClientTableColumn({ setSortModel, onClickView, onClickEdit }: Props): ColDef[] {
  return React.useMemo(
    () => [
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.email,
        headerName: CLIENT_TABLE_COLUMN_LABEL.email,
        minWidth: 300,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.email,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.email),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.phone,
        headerName: CLIENT_TABLE_COLUMN_LABEL.phone,
        minWidth: 150,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.phone,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.phone),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.fullName,
        headerName: CLIENT_TABLE_COLUMN_LABEL.fullName,
        minWidth: 150,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.fullName,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.fullName),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.hiredUs,
        headerName: CLIENT_TABLE_COLUMN_LABEL.hiredUs,
        minWidth: 150,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.hiredUs,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => (data.hiredUs ? 'Yes' : 'No'),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.moveDates,
        headerName: CLIENT_TABLE_COLUMN_LABEL.moveDates,
        minWidth: 160,
        cellRenderer: ({ data }: { data: ClientTableData }) =>
          data.moveDates?.length ? data.moveDates.map(formatDate).join(', ') : '-',
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.eventsAssociated,
        headerName: CLIENT_TABLE_COLUMN_LABEL.eventsAssociated,
        minWidth: 300,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.eventsAssociated,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) =>
          data.eventsAssociated?.length ? data.eventsAssociated.join(',') : '-',
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.currentStatus,
        headerName: CLIENT_TABLE_COLUMN_LABEL.currentStatus,
        minWidth: 150,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.currentStatus,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.currentStatus),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.assignee,
        headerName: CLIENT_TABLE_COLUMN_KEY.assignee,
        minWidth: 300,
        cellRenderer: ({ data }: { data: ClientTableData }) => (data.assignee?.length ? data.assignee.join(', ') : '-'),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_source,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_source,
        minWidth: 150,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_source),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_medium,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_medium,
        minWidth: 150,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_medium),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_campaign,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_campaign,
        minWidth: 150,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_campaign),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_content,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_content,
        minWidth: 150,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_content),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_campaign,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_campaign,
        minWidth: 200,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_campaign),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.utm.utm_term,
        headerName: CLIENT_TABLE_COLUMN_KEY.utm.utm_term,
        minWidth: 150,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.utm?.utm_term),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        suppressHeaderMenuButton: true,
        headerClass: 'ag-header-cell-center',
        cellClass: 'flex items-center justify-center',
        cellRenderer: ({ data }: { data: ClientTableData }) =>
          renderActionColumn({
            onClickView: () => onClickView?.(data._id),
            onClickEdit: () => onClickEdit?.(data._id),
          }),
        pinned: 'right',
      },
    ],
    [],
  );
}

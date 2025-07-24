import * as React from 'react';
import { ColDef } from 'ag-grid-enterprise';
import { SortingRequest } from 'src/shared/models';
import {
  arrayValuesRender,
  commonValueRender,
  formatDateCell,
  generateSortableColumnHeaderMenu,
  renderActionColumn,
} from 'src/shared/util';
import { EVENT_TABLE_COLUMNS_KEY, EVENT_TABLE_COLUMNS_LABEL, EventTableData } from '../models';

type Props = {
  setSortModel: (sortModel: SortingRequest) => void;
  onClickView?: (eventId: string) => void;
  onClickEdit?: (eventId: string) => void;
};

export function useBuildEventTableColumns({ setSortModel, onClickView, onClickEdit }: Props): ColDef[] {
  return React.useMemo(
    () => [
      {
        field: EVENT_TABLE_COLUMNS_KEY.PICKUP_DATE_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.PICKUP_DATE_TIME,
        width: 200,
        flex: 1,
        sortable: false,
        suppressHeaderFilterButton: true,
        suppressAutoSize: true,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: EVENT_TABLE_COLUMNS_KEY.PICKUP_DATE_TIME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.pickupDate),
        pinned: 'left',
        headerClass: 'ag-header-cell-center',
        editable: false,
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_DATE_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_DATE_TIME,
        width: 200,
        flex: 1,
        sortable: true,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: EVENT_TABLE_COLUMNS_KEY.DELIVERY_DATE_TIME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.deliveryDate),
        pinned: 'left',
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.CLIENT_NAME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.CLIENT_NAME,
        minWidth: 200,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.clientName),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.PICKUP_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.PICKUP_ADDRESS,
        minWidth: 300,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.pickupAddress),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_ADDRESS,
        minWidth: 300,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.deliveryAddress),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_MAN,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_MAN,
        minWidth: 200,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => arrayValuesRender(data.deliveryMan),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.TRUCK_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.TRUCK_ADDRESS,
        minWidth: 300,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.truckAddress),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.MEETING_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.MEETING_TIME,
        minWidth: 150,
        flex: 1,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.meetingTime),
        headerClass: 'ag-header-cell-center',
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        cellRenderer: ({ data }: { data: EventTableData }) =>
          renderActionColumn({
            onClickView: () => onClickView?.(data._id),
            onClickEdit: () => onClickEdit?.(data._id),
          }),
        pinned: 'right',
        headerClass: 'ag-header-cell-center',
        cellClass: 'flex items-center justify-center',
      },
    ],
    [],
  );
}

import * as React from 'react';
import { Box, Chip } from '@mui/material';
import { ColDef } from 'ag-grid-enterprise';
import {
  commonValueRender,
  formatDateCell,
  generateSortableColumnHeaderMenu,
  renderActionColumn,
} from 'src/shared/util';
import { ClientChip, MoverChip } from 'src/components';
import { SortingRequest } from 'src/shared/models';
import { DEFAULT_TABLE_COLUMN_CONFIG } from 'src/shared/constants';
import { EVENT_TABLE_COLUMNS_KEY, EVENT_TABLE_COLUMNS_LABEL, EventTableData } from '../models';
import isEmpty from 'lodash/isEmpty';

type Props = {
  setSortModel: (sortModel: SortingRequest) => void;
  onClickView?: (eventId: string) => void;
  onClickEdit?: (eventId: string) => void;
  onClickViewMover?: (moverId: string) => void;
  onClickViewClient?: (clientId: string) => void;
};

export function useBuildEventTableColumns({
  setSortModel,
  onClickView,
  onClickEdit,
  onClickViewMover,
  onClickViewClient,
}: Props): ColDef[] {
  return React.useMemo(
    () => [
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.PICKUP_DATE_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.PICKUP_DATE_TIME,
        minWidth: 250,
        maxWidth: 300,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: EVENT_TABLE_COLUMNS_KEY.PICKUP_DATE_TIME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.pickupDate),
        pinned: 'left',
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_DATE_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_DATE_TIME,
        minWidth: 250,
        maxWidth: 300,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: EVENT_TABLE_COLUMNS_KEY.DELIVERY_DATE_TIME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.deliveryDate),
        pinned: 'left',
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.CLIENT_INFO,
        headerName: EVENT_TABLE_COLUMNS_LABEL.CLIENT_INFO,
        minWidth: 200,
        cellRenderer: ({ data }: { data: EventTableData }) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <ClientChip clientInfo={data.clientInfo} onClick={() => onClickViewClient?.(data.clientInfo._id)} />
          </Box>
        ),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.PICKUP_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.PICKUP_ADDRESS,
        minWidth: 300,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.pickupAddress),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_ADDRESS,
        minWidth: 300,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.deliveryAddress),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_MAN,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_MAN,
        minWidth: 350,
        cellRenderer: ({ data }: { data: EventTableData }) => {
          const hasDeliveryMen = !isEmpty(data.deliveryMan);

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
              {hasDeliveryMen ? (
                data.deliveryMan.map((mover) => (
                  <MoverChip key={`${mover._id}`} mover={mover} onClick={() => onClickViewMover?.(mover._id)} />
                ))
              ) : (
                <Chip
                  label="Unassigned"
                  variant="outlined"
                  size="small"
                  sx={{
                    fontStyle: 'italic',
                    opacity: 0.7,
                  }}
                />
              )}
            </Box>
          );
        },
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.TRUCK_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.TRUCK_ADDRESS,
        minWidth: 300,
        cellRenderer: ({ data }: { data: EventTableData }) => commonValueRender(data.truckAddress),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: EVENT_TABLE_COLUMNS_KEY.MEETING_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.MEETING_TIME,
        minWidth: 150,
        cellRenderer: ({ data }: { data: EventTableData }) => formatDateCell(data.meetingTime),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        suppressHeaderMenuButton: true,
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

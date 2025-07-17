import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { arrayValuesRender, commonValueRender, dateRenderer } from 'src/shared/util';
import { EVENT_TABLE_COLUMNS_KEY, EVENT_TABLE_COLUMNS_LABEL } from '../models';

export function useBuildEventTableColumns(): GridColDef[] {
  return React.useMemo(
    () => [
      {
        field: EVENT_TABLE_COLUMNS_KEY.MOVING_DATE,
        headerName: EVENT_TABLE_COLUMNS_LABEL.MOVING_DATE,
        headerAlign: 'center',
        sortable: true,
        width: 150,
        renderCell: (params) => dateRenderer(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.CLIENT_NAME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.CLIENT_NAME,
        headerAlign: 'center',
        sortable: true,
        flex: 1,
        minWidth: 200,
        renderCell: (params) => commonValueRender(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.PICKUP_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.PICKUP_ADDRESS,
        headerAlign: 'center',
        sortable: false,
        flex: 1,
        minWidth: 300,
        renderCell: (params) => commonValueRender(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_ADDRESS,
        headerAlign: 'center',
        sortable: false,
        flex: 1,
        minWidth: 300,
        renderCell: (params) => commonValueRender(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.DELIVERY_MAN,
        headerName: EVENT_TABLE_COLUMNS_LABEL.DELIVERY_MAN,
        headerAlign: 'center',
        sortable: false,
        flex: 1,
        minWidth: 200,
        renderCell: (params) => arrayValuesRender(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.TRUCK_ADDRESS,
        headerName: EVENT_TABLE_COLUMNS_LABEL.TRUCK_ADDRESS,
        headerAlign: 'center',
        sortable: false,
        flex: 1,
        minWidth: 300,
        renderCell: (params) => commonValueRender(params.value),
      },
      {
        field: EVENT_TABLE_COLUMNS_KEY.MEETING_TIME,
        headerName: EVENT_TABLE_COLUMNS_LABEL.MEETING_TIME,
        headerAlign: 'center',
        sortable: false,
        flex: 1,
        minWidth: 150,
        renderCell: (params) => commonValueRender(params.value),
      },
      {
        field: 'action',
        headerName: 'Action',
        headerAlign: 'center',
        sortable: false,
        width: 100,
        renderCell: () => 'Action',
      },
    ],
    [],
  );
}

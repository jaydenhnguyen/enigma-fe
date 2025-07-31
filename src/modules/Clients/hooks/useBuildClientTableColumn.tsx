import * as React from 'react';
import { Box, Chip } from '@mui/material';
import { ColDef } from 'ag-grid-enterprise';
import { ClientStatusChip, HiredStatusChip, MoverChip } from 'src/components';
import { SortingRequest } from 'src/shared/models';
import { DEFAULT_TABLE_COLUMN_CONFIG, NOT_AVAILABLE_VALUE } from 'src/shared/constants';
import {
  commonValueRender,
  formatDateCell,
  generateSortableColumnHeaderMenu,
  renderActionColumn,
} from 'src/shared/util';
import { CLIENT_TABLE_COLUMN_KEY, CLIENT_TABLE_COLUMN_LABEL, ClientTableData } from '../model';
import isEmpty from 'lodash/isEmpty';

type Props = {
  setSortModel: (sortModel: SortingRequest) => void;
  onClickView?: (clientId: string) => void;
  onClickEdit?: (clientId: string) => void;
  onClickViewAssignee?: (userId: string) => void;
};

export function useBuildClientTableColumn({
  setSortModel,
  onClickView,
  onClickEdit,
  onClickViewAssignee,
}: Props): ColDef[] {
  return React.useMemo(
    () => [
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.EMAIL,
        headerName: CLIENT_TABLE_COLUMN_LABEL.EMAIL,
        minWidth: 300,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.EMAIL,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.email),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.PHONE_NUMBER,
        headerName: CLIENT_TABLE_COLUMN_LABEL.PHONE_NUMBER,
        minWidth: 150,
        suppressHeaderMenuButton: false,
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.phoneNumber),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.FIRST_NAME,
        headerName: CLIENT_TABLE_COLUMN_LABEL.FIRST_NAME,
        minWidth: 150,
        maxWidth: 300,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.FIRST_NAME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.firstName),
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.LAST_NAME,
        headerName: CLIENT_TABLE_COLUMN_LABEL.LAST_NAME,
        minWidth: 150,
        maxWidth: 300,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.LAST_NAME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => commonValueRender(data.firstName),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.HIRED_STATUS,
        headerName: CLIENT_TABLE_COLUMN_LABEL.HIRED_STATUS,
        maxWidth: 250,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: CLIENT_TABLE_COLUMN_KEY.HIRED_STATUS,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: ClientTableData }) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <HiredStatusChip isHired={data?.hiredUs} />
          </Box>
        ),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.MOVE_DATES,
        headerName: CLIENT_TABLE_COLUMN_LABEL.MOVE_DATES,
        minWidth: 250,
        cellRenderer: ({ data }: { data: ClientTableData }) => {
          const lastMoveDate = data.moveDates[data.moveDates.length - 1];
          if (!lastMoveDate) return NOT_AVAILABLE_VALUE;
          return formatDateCell(lastMoveDate);
        },
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.CURRENT_STATUS,
        headerName: CLIENT_TABLE_COLUMN_LABEL.CURRENT_STATUS,
        minWidth: 200,
        maxWidth: 250,
        cellRenderer: ({ data }: { data: ClientTableData }) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <ClientStatusChip status={data.currentStatus} />
          </Box>
        ),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: CLIENT_TABLE_COLUMN_KEY.ASSIGNEES,
        headerName: CLIENT_TABLE_COLUMN_KEY.ASSIGNEES,
        minWidth: 350,
        cellRenderer: ({ data }: { data: ClientTableData }) => {
          const hasAssignees = !isEmpty(data.assignees);
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
              {hasAssignees ? (
                data.assignees.map((assignee) => (
                  <MoverChip
                    key={`${assignee._id}`}
                    populatedUser={assignee}
                    onClick={() => onClickViewAssignee?.(assignee._id)}
                  />
                ))
              ) : (
                <Chip
                  label="No Assignee"
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

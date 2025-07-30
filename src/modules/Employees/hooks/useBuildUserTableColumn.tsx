import * as React from 'react';
import { ColDef } from 'ag-grid-enterprise';
import { SortingRequest } from 'src/shared/models';
import {
  commonValueRender,
  formatDateCell,
  generateSortableColumnHeaderMenu,
  renderActionColumn,
} from 'src/shared/util';
import { DEFAULT_TABLE_COLUMN_CONFIG, ROLES } from 'src/shared/constants';
import { DrivingLicenseChip, UserActiveStatusChip, UserRoleChips } from 'src/components';
import { USER_TABLE_COLUMN_KEY, USER_TABLE_COLUMN_LABEL, UserTableData } from '../model';
import { Box } from '@mui/material';

type Props = {
  setSortModel: (sortModel: SortingRequest) => void;
  onClickView?: (userId: string) => void;
  onClickEdit?: (userId: string) => void;
};

export function useBuildUserTableColumn({ setSortModel, onClickView, onClickEdit }: Props): ColDef[] {
  return React.useMemo(
    () => [
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.EMAIL,
        headerName: USER_TABLE_COLUMN_LABEL.EMAIL,
        minWidth: 250,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: USER_TABLE_COLUMN_KEY.EMAIL,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: UserTableData }) => commonValueRender(data.email),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.PHONE,
        headerName: USER_TABLE_COLUMN_LABEL.PHONE,
        minWidth: 200,
        suppressHeaderMenuButton: false,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: USER_TABLE_COLUMN_KEY.PHONE,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: UserTableData }) => commonValueRender(data.phoneNumber),
        pinned: 'left',
      },

      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.FIRST_NAME,
        headerName: USER_TABLE_COLUMN_LABEL.FIRST_NAME,
        minWidth: 150,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: USER_TABLE_COLUMN_KEY.FIRST_NAME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: UserTableData }) => commonValueRender(data.firstName),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.LAST_NAME,
        headerName: USER_TABLE_COLUMN_LABEL.LAST_NAME,
        minWidth: 150,
        mainMenuItems: generateSortableColumnHeaderMenu({
          setSortModel,
          columnKey: USER_TABLE_COLUMN_KEY.LAST_NAME,
          menuItems: ['pinSubMenu'],
        }),
        cellRenderer: ({ data }: { data: UserTableData }) => commonValueRender(data.lastName),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.DOB,
        headerName: USER_TABLE_COLUMN_LABEL.DOB,
        minWidth: 200,
        cellRenderer: ({ data }: { data: UserTableData }) => formatDateCell(data.dob),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.LICENSE_TYPE,
        headerName: USER_TABLE_COLUMN_LABEL.LICENSE_TYPE,
        minWidth: 150,
        maxWidth: 200,
        cellRenderer: ({ data }: { data: UserTableData }) => (
          <DrivingLicenseChip licenseType={data.drivingLicenseType} />
        ),
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.IS_ACTIVE,
        headerName: USER_TABLE_COLUMN_LABEL.IS_ACTIVE,
        minWidth: 150,
        maxWidth: 150,
        cellRenderer: ({ data }: { data: UserTableData }) => <UserActiveStatusChip isActive={data.isActive} />,
      },
      {
        ...DEFAULT_TABLE_COLUMN_CONFIG,
        field: USER_TABLE_COLUMN_KEY.ROLE,
        headerName: USER_TABLE_COLUMN_LABEL.ROLE,
        minWidth: 200,
        cellRenderer: ({ data }: { data: UserTableData }) => (
          <Box className="flex flex-row gap-x-2 items-center">
            {data.roles.map((role: ROLES) => (
              <UserRoleChips role={role} />
            ))}
          </Box>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        suppressHeaderMenuButton: true,
        headerClass: 'ag-header-cell-center',
        cellClass: 'flex items-center justify-center',
        cellRenderer: ({ data }: { data: UserTableData }) =>
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

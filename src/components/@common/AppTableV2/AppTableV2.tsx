import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { GridColDef, GridPaginationModel, GridRowsProp, GridSortModel } from '@mui/x-data-grid';
import { DataGrid } from 'src/components/@core';

type FetchDataParams = {
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  search: string;
};

type Props = {
  columns: GridColDef[];
  pinnedColumns?: {
    left: string[];
    right: string[];
  };
  onFetchData: (params: FetchDataParams) => Promise<{ rows: GridRowsProp; total: number }>;
  onRowClick?: (row: any) => void;
  isShowSearch?: boolean;
  isShowPagination?: boolean;
  isShowSorting?: boolean;
};

export function AppTableV2({
  columns,
  pinnedColumns,
  onFetchData,
  onRowClick,
  isShowPagination = true,
  isShowSorting = true,
  isShowSearch = true,
}: Props): React.ReactElement {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { rows, total } = await onFetchData({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sortModel: isShowSorting ? sortModel : [],
        search: isShowSearch ? search : '',
      });
      setRows(rows);
      setRowCount(total);
      setLoading(false);
    };
    load();
  }, [paginationModel, sortModel, search]);

  return (
    <Box>
      {isShowSearch && (
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        paginationMode={isShowPagination ? 'server' : 'client'}
        sortingMode={isShowSorting ? 'server' : 'client'}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={loading}
        onRowClick={(params) => onRowClick?.(params.row)}
        hideFooter={!isShowPagination}
        pinnedColumns={pinnedColumns}
      />
    </Box>
  );
}

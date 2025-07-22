import * as React from 'react';
import { Box } from '@mui/material';
import { AppPagination, AppTable } from 'src/components';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { EVENT_TYPE } from './constants';
import { mapRespondedEventToTable } from './util';
import { useBuildEventTableColumns, useGetEvents } from './hooks';
import classes from './EventTable.module.scss';

// Define types (assuming these don't exist)
type GridPaginationModel = {
  page: number;
  pageSize: number;
};

type GridSortModel = Array<{
  field: string;
  sort: 'asc' | 'desc';
}>;

type Props = {
  eventType: EVENT_TYPE;
};

export function Event({ eventType }: Props): React.ReactElement {
  const columns = useBuildEventTableColumns();
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>(DEFAULT_PAGINATION_PARAMS);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [search, setSearch] = React.useState<string>('');
  const [paginationResponse, setPaginationResponse] = React.useState({
    ...DEFAULT_PAGINATION_PARAMS,
    total: 0,
  });

  const { data, isLoading } = useGetEvents({
    payload: {
      type: eventType,
      ...paginationModel,
      sort: sortModel[0]?.sort,
      field: sortModel[0]?.field ?? '',
      search: search,
    },
  });

  const mappedData = React.useMemo(() => mapRespondedEventToTable(data?.data ?? []), [data?.data]);

  const handlePageSizeChange = React.useCallback((pageSize: number) => {
    setPaginationModel({
      page: DEFAULT_PAGINATION_PAGE_NUM,
      pageSize,
    });
  }, []);

  const handlePageNumChange = React.useCallback((page: number) => {
    setPaginationModel((prev) => ({ ...prev, page }));
  }, []);

  // Handle sort changes
  const handleSortChange = React.useCallback((sortModel: any[]) => {
    setSortModel(sortModel);
  }, []);

  React.useEffect(() => {
    if (data?.pagination) {
      setPaginationResponse(data.pagination);
    }
  }, [data?.pagination]);

  return (
    <Box className={classes['wrapper']}>
      <AppTable columns={columns} rowData={mappedData} isLoading={isLoading} onSortChange={handleSortChange} />

      <AppPagination
        isLoading={isLoading}
        totalRows={paginationResponse?.total}
        onPageNumChange={handlePageNumChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
}

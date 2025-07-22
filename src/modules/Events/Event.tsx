import * as React from 'react';
import { AppPagination, AppTable } from 'src/components';
import { DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { EVENT_TYPE } from './constants';
import { useBuildEventTableColumns, useGetEvents } from './hooks';
import { mapRespondedEventToTable } from './util';
import { Box } from '@mui/material';
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

  const { data, isLoading, refetch, isFetching } = useGetEvents({
    payload: {
      type: eventType,
      ...paginationModel,
      sort: sortModel[0]?.sort,
      field: sortModel[0]?.field ?? '',
      search: search,
    },
  });

  const mappedData = React.useMemo(() => mapRespondedEventToTable(data?.data ?? []), [data?.data]);

  // Handle pagination changes
  const handlePaginationChange = React.useCallback((pagination: { pageIndex: number; pageSize: number }) => {
    setPaginationModel({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  }, []);

  // Handle sort changes
  const handleSortChange = React.useCallback((sortModel: any[]) => {
    setSortModel(sortModel);
  }, []);

  return (
    <Box className={classes['wrapper']}>
      <AppTable
        columns={columns}
        rowData={mappedData}
        totalRows={data?.pagination.total ?? 0}
        currentPage={data?.pagination.page}
        pageSize={data?.pagination.pageSize}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
        onSortChange={handleSortChange}
      />

      <AppPagination totalRows={100} onPageChange={() => {}} />
    </Box>
  );
}

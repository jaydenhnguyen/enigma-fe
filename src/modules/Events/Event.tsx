import * as React from 'react';
import { Box } from '@mui/material';
import { AppPagination, AppTable } from 'src/components';
import { PaginateRequest, SortingRequest } from 'src/shared/models';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { EVENT_TYPE } from './constants';
import { mapRespondedEventToTable } from './util';
import { useBuildEventTableColumns, useGetEvents } from './hooks';
import classes from './EventTable.module.scss';

type Props = {
  eventType: EVENT_TYPE;
};

export function Event({ eventType }: Props): React.ReactElement {
  const [paginationModel, setPaginationModel] = React.useState<PaginateRequest>(DEFAULT_PAGINATION_PARAMS);
  const [sortModel, setSortModel] = React.useState<SortingRequest>();
  const [search, setSearch] = React.useState<string>('');
  const [paginationResponse, setPaginationResponse] = React.useState({
    ...DEFAULT_PAGINATION_PARAMS,
    total: 0,
  });

  const { data, isLoading } = useGetEvents({
    payload: {
      type: eventType,
      sortField: sortModel?.sortField,
      sortType: sortModel?.sortType,
      ...paginationModel,
      search: search,
    },
  });

  const columns = useBuildEventTableColumns({ setSortModel });

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

  React.useEffect(() => {
    if (data?.pagination) {
      setPaginationResponse(data.pagination);
    }
  }, [data?.pagination]);

  return (
    <Box className={classes['wrapper']}>
      <AppTable columns={columns} rowData={mappedData} isLoading={isLoading} />

      <AppPagination
        isLoading={isLoading}
        totalRows={paginationResponse?.total}
        onPageNumChange={handlePageNumChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
}

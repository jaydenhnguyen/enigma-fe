import * as React from 'react';
import { Box } from '@mui/material';
import { AppPagination, AppTable, AppTableSearchBar } from 'src/components';
import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { EVENT_TYPE, SEARCH_EVENT_OPTIONS } from './constants';
import { mapRespondedEventToTable } from './util';
import { useBuildEventTableColumns, useGetEvents } from './hooks';
import classes from './EventTable.module.scss';
import { EVENT_TABLE_COLUMNS_KEY } from './models';

type Props = {
  eventType: EVENT_TYPE;
};

export function Event({ eventType }: Props): React.ReactElement {
  const [paginationModel, setPaginationModel] = React.useState<PaginateRequest>(DEFAULT_PAGINATION_PARAMS);
  const [sortModel, setSortModel] = React.useState<SortingRequest>();
  const [searchModel, setSearchModel] = React.useState<SearchingRequest>();
  const [paginationResponse, setPaginationResponse] = React.useState({
    ...DEFAULT_PAGINATION_PARAMS,
    total: 0,
  });

  const { data, isLoading } = useGetEvents({
    payload: {
      type: eventType,
      ...sortModel,
      ...paginationModel,
      ...searchModel,
    },
  });

  const columns = useBuildEventTableColumns({ setSortModel });

  React.useEffect(() => {
    if (data?.pagination) {
      setPaginationResponse(data.pagination);
    }
  }, [data?.pagination]);

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

  const ClearSearchAndReset = React.useCallback(() => {
    setPaginationModel(DEFAULT_PAGINATION_PARAMS);
    setSortModel({ sortBy: EVENT_TABLE_COLUMNS_KEY.PICKUP_DATE_TIME, sortType: 'desc' });
    setSearchModel({ searchBy: '', searchValue: '' });
  }, []);

  return (
    <Box className={classes['wrapper']}>
      <AppTableSearchBar searchOptions={SEARCH_EVENT_OPTIONS} onSearch={setSearchModel} onClear={ClearSearchAndReset} />

      <Box className={classes['table-section']}>
        <AppTable columns={columns} rowData={mappedData} isLoading={isLoading} />

        <AppPagination
          isLoading={isLoading}
          totalRows={paginationResponse?.total}
          onPageNumChange={handlePageNumChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
}

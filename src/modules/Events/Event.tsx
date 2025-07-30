import * as React from 'react';
import { Box } from '@mui/material';
import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';
import { AppPagination, AppTable, AppTableSearchBar, EventDetailPopUp, UserDetailPopup } from 'src/components';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { EVENT_TABLE_COLUMNS_KEY } from './models';
import { mapRespondedEventListToTable } from './util';
import { EVENT_TYPE, SEARCH_EVENT_OPTIONS } from './constants';
import { useBuildEventTableColumns, useGetEvents } from './hooks';
import classes from './EventTable.module.scss';

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
  const [isOpenEventDetailPopup, setIsOpenEventDetailPopup] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const [isOpenMoverDetailPopup, setIsOpenMoverDetailPopup] = React.useState(false);
  const [selectedMoverId, setSelectedMoverId] = React.useState<string | null>(null);

  const { data: eventList, isLoading: isLoadingEventList } = useGetEvents({
    payload: {
      type: eventType,
      ...sortModel,
      ...paginationModel,
      ...searchModel,
    },
  });

  const handleOpenEventDetailPopup = React.useCallback(async (eventId: string) => {
    setSelectedEventId(eventId);
    setIsOpenEventDetailPopup(true);
  }, []);

  const handleCloseEventDetailPopup = React.useCallback(() => {
    setSelectedEventId(null);
    setIsOpenEventDetailPopup(false);
  }, []);

  const handleOpenMoverDetailPopup = React.useCallback(async (moverId: string) => {
    setSelectedMoverId(moverId);
    setIsOpenMoverDetailPopup(true);
  }, []);

  const handleCloseMoverDetailPopup = React.useCallback(() => {
    setSelectedMoverId(null);
    setIsOpenMoverDetailPopup(false);
  }, []);

  const columns = useBuildEventTableColumns({
    setSortModel,
    onClickView: (eventId: string) => handleOpenEventDetailPopup(eventId),
    onClickEdit: (eventId: string) => handleOpenEventDetailPopup(eventId),
    onClickViewMover: (moverId: string) => handleOpenMoverDetailPopup(moverId),
  });

  React.useEffect(() => {
    if (eventList?.pagination) {
      setPaginationResponse(eventList.pagination);
    }
  }, [eventList?.pagination]);

  const mappedData = React.useMemo(() => mapRespondedEventListToTable(eventList?.data ?? []), [eventList?.data]);

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
    <>
      <Box className={classes['wrapper']}>
        <AppTableSearchBar
          searchOptions={SEARCH_EVENT_OPTIONS}
          onSearch={setSearchModel}
          onClear={ClearSearchAndReset}
        />

        <Box className={classes['table-section']}>
          <AppTable columns={columns} rowData={mappedData} isLoading={isLoadingEventList} />

          <AppPagination
            isLoading={isLoadingEventList}
            totalRows={paginationResponse?.total}
            onPageNumChange={handlePageNumChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Box>

      <EventDetailPopUp
        isOpen={isOpenEventDetailPopup && !!selectedEventId?.trim()}
        eventId={selectedEventId ?? ''}
        onClose={handleCloseEventDetailPopup}
      />

      <UserDetailPopup
        title="Mover Details"
        isOpen={isOpenMoverDetailPopup && !!selectedMoverId?.trim()}
        userId={selectedMoverId ?? ''}
        onClose={handleCloseMoverDetailPopup}
      />
    </>
  );
}

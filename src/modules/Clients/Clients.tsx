import * as React from 'react';
import { Box } from '@mui/material';
import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { AppPagination, AppTable, AppTableSearchBar, ClientDetailPopup } from 'src/components';
import { CLIENT_TABLE_COLUMN_KEY } from './model';
import { SEARCH_CLIENT_OPTIONS } from './constants';
import { mapRespondedClientLisToTable } from './util';
import { useBuildClientTableColumn, useGetClientList } from './hooks';
import classes from './Clients.module.scss';

type Props = {};

export function Clients({}: Props): React.ReactElement {
  const [paginationModel, setPaginationModel] = React.useState<PaginateRequest>(DEFAULT_PAGINATION_PARAMS);
  const [sortModel, setSortModel] = React.useState<SortingRequest>();
  const [searchModel, setSearchModel] = React.useState<SearchingRequest>();
  const [paginationResponse, setPaginationResponse] = React.useState({
    ...DEFAULT_PAGINATION_PARAMS,
    total: 0,
  });

  const [isOpenClientDetailPopup, setIsOpenClientDetailPopup] = React.useState(false);
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(null);

  const { data: clientList, isLoading: isLoadingClientList } = useGetClientList({
    payload: {
      ...sortModel,
      ...paginationModel,
      ...searchModel,
    },
  });

  const handleOpenClientDetailPopup = React.useCallback(async (eventId: string) => {
    setSelectedClientId(eventId);
    setIsOpenClientDetailPopup(true);
  }, []);

  const handleCloseClientDetailPopup = React.useCallback(() => {
    setSelectedClientId(null);
    setIsOpenClientDetailPopup(false);
  }, []);

  const columns = useBuildClientTableColumn({
    setSortModel,
    onClickView: (clientId: string) => handleOpenClientDetailPopup(clientId),
    onClickEdit: (clientId: string) => handleOpenClientDetailPopup(clientId),
  });

  React.useEffect(() => {
    if (clientList?.pagination) {
      setPaginationResponse(clientList.pagination);
    }
  }, [clientList?.pagination]);

  const mappedData = React.useMemo(() => mapRespondedClientLisToTable(clientList?.data ?? []), [clientList?.data]);

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
    setSortModel({ sortBy: CLIENT_TABLE_COLUMN_KEY.EMAIL, sortType: 'desc' });
    setSearchModel({ searchBy: '', searchValue: '' });
  }, []);

  return (
    <>
      <Box className={classes['wrapper']}>
        <AppTableSearchBar
          searchOptions={SEARCH_CLIENT_OPTIONS}
          onSearch={setSearchModel}
          onClear={ClearSearchAndReset}
        />

        <Box className={classes['table-section']}>
          <AppTable columns={columns} rowData={mappedData} isLoading={isLoadingClientList} />

          <AppPagination
            isLoading={isLoadingClientList}
            totalRows={paginationResponse?.total}
            onPageNumChange={handlePageNumChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Box>

      <ClientDetailPopup
        isOpen={isOpenClientDetailPopup && !!selectedClientId?.trim()}
        clientId={selectedClientId ?? ''}
        onClose={handleCloseClientDetailPopup}
      />
    </>
  );
}

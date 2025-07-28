import * as React from 'react';
import { Box } from '@mui/material';
import { AppPagination, AppTable, AppTableSearchBar, UserDetailPopup } from 'src/components';
import { DEFAULT_PAGINATION_PAGE_NUM, DEFAULT_PAGINATION_PARAMS } from 'src/shared/constants';
import { PaginateRequest, SearchingRequest, SortingRequest } from 'src/shared/models';
import { useGetUserList } from '../Users';
import { USER_TABLE_COLUMN_KEY } from './model';
import { SEARCH_USER_OPTIONS } from './constants';
import { useBuildUserTableColumn } from './hooks';
import { mapRespondedUserLisToTable } from './util';
import classes from './Employees.module.scss';

type Props = {};

export function Employees({}: Props): React.ReactElement {
  const [paginationModel, setPaginationModel] = React.useState<PaginateRequest>(DEFAULT_PAGINATION_PARAMS);
  const [sortModel, setSortModel] = React.useState<SortingRequest>();
  const [searchModel, setSearchModel] = React.useState<SearchingRequest>();
  const [paginationResponse, setPaginationResponse] = React.useState({
    ...DEFAULT_PAGINATION_PARAMS,
    total: 0,
  });

  const [isOpenUserDetailPopup, setIsOpenUserDetailPopup] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  const { data: userList, isLoading: isLoadingUserList } = useGetUserList({
    payload: {
      ...sortModel,
      ...paginationModel,
      ...searchModel,
    },
  });

  React.useEffect(() => {
    if (userList?.pagination) {
      setPaginationResponse(userList.pagination);
    }
  }, [userList?.pagination]);

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
    setSortModel({ sortBy: USER_TABLE_COLUMN_KEY.EMAIL, sortType: 'desc' });
    setSearchModel({ searchBy: '', searchValue: '' });
  }, []);

  const handleOpenUserDetailPopup = React.useCallback(async (eventId: string) => {
    setSelectedUserId(eventId);
    setIsOpenUserDetailPopup(true);
  }, []);

  const handleCloseUserDetailPopup = React.useCallback(() => {
    setSelectedUserId(null);
    setIsOpenUserDetailPopup(false);
  }, []);

  const columns = useBuildUserTableColumn({
    setSortModel,
    onClickView: (eventId: string) => handleOpenUserDetailPopup(eventId),
    onClickEdit: (eventId: string) => handleOpenUserDetailPopup(eventId),
  });

  const mappedData = React.useMemo(() => mapRespondedUserLisToTable(userList?.data ?? []), [userList?.data]);

  return (
    <>
      <Box className={classes['wrapper']}>
        <AppTableSearchBar
          searchOptions={SEARCH_USER_OPTIONS}
          onSearch={setSearchModel}
          onClear={ClearSearchAndReset}
        />

        <Box className={classes['table-section']}>
          <AppTable columns={columns} rowData={mappedData} isLoading={isLoadingUserList} />

          <AppPagination
            isLoading={isLoadingUserList}
            totalRows={paginationResponse?.total}
            onPageNumChange={handlePageNumChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Box>

      <UserDetailPopup
        isOpen={isOpenUserDetailPopup && !!selectedUserId?.trim()}
        userId={selectedUserId ?? ''}
        onClose={handleCloseUserDetailPopup}
      />
    </>
  );
}

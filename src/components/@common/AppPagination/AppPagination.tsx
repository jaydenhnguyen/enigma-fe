import * as React from 'react';
import { Box, InputLabel, MenuItem, Select, Typography, Pagination } from '@mui/material';
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGINATION_PAGE_NUM,
  DEFAULT_PAGINATION_PAGE_SIZE,
  NOT_AVAILABLE_VALUE,
} from 'src/shared/constants';
import { getPaginationRange, getPageCount } from 'src/shared/util';
import classes from './AppPagination.module.scss';

type Props = {
  isLoading?: boolean;
  totalRows?: number;
  pageSizeOptions?: number[];
  onPageNumChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function AppPagination({
  totalRows = 0,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onPageNumChange,
  onPageSizeChange,
}: Props): React.ReactElement {
  const [selectedPageSize, setSelectedPageSize] = React.useState(DEFAULT_PAGINATION_PAGE_SIZE);
  const [selectedPageNum, setSelectedPageNum] = React.useState(DEFAULT_PAGINATION_PAGE_NUM);

  const { start, end } = React.useMemo(
    () =>
      getPaginationRange({
        currentPage: selectedPageNum,
        pageSize: selectedPageSize,
      }),
    [selectedPageNum, selectedPageSize],
  );

  const pageCount = React.useMemo(
    () =>
      getPageCount({
        total: totalRows,
        pageSize: selectedPageSize,
      }),
    [totalRows, selectedPageSize],
  );

  const handlePageSizeChange = React.useCallback((pageSize: number) => {
    setSelectedPageSize(pageSize);
    onPageSizeChange(pageSize);
  }, []);

  const handlePageNumChange = React.useCallback((page: number) => {
    setSelectedPageNum(page);
    onPageNumChange(page);
  }, []);

  return (
    <Box className={classes['wrapper']}>
      <Box className={classes['page-selector']}>
        <InputLabel>Page size:</InputLabel>

        <Select value={selectedPageSize} onChange={(e) => handlePageSizeChange(e.target.value)} size="small">
          {pageSizeOptions.map((size, idx) => (
            <MenuItem key={idx} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body2" color="textSecondary">
          {`${start}-${end} of ${totalRows ?? NOT_AVAILABLE_VALUE}`}
        </Typography>
      </Box>

      <Pagination
        count={pageCount}
        page={selectedPageNum}
        onChange={(_: any, page: number) => handlePageNumChange(page)}
        size="small"
        showFirstButton={true}
        showLastButton={true}
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}

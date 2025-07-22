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
  totalRows: number;
  pageSizeOptions?: number[];
  selectedPageSize?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export function AppPagination({
  totalRows,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  selectedPageSize = DEFAULT_PAGINATION_PAGE_SIZE,
  currentPage = DEFAULT_PAGINATION_PAGE_NUM,
  onPageChange,
}: Props): React.ReactElement {
  const { start, end } = React.useMemo(
    () =>
      getPaginationRange({
        currentPage,
        pageSize: selectedPageSize,
      }),
    [currentPage, selectedPageSize],
  );

  const pageCount = React.useMemo(
    () =>
      getPageCount({
        total: totalRows,
        pageSize: selectedPageSize,
      }),
    [totalRows, selectedPageSize],
  );

  return (
    <Box className={classes['wrapper']}>
      <Box className={classes['page-selector']}>
        <InputLabel>Page size:</InputLabel>

        <Select value={selectedPageSize} onChange={(e) => onPageChange(e.target.value)} size="small">
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
        page={currentPage}
        onChange={(_: any, page: number) => onPageChange(page)}
        size="small"
        showFirstButton={true}
        showLastButton={true}
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}

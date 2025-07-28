export const NOT_AVAILABLE_VALUE = 'N/A';

export const DEFAULT_PAGINATION_PAGE_NUM = 1;
export const DEFAULT_PAGINATION_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50];

export const DEFAULT_PAGINATION_PARAMS = {
  page: DEFAULT_PAGINATION_PAGE_NUM,
  pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
};

export const DEFAULT_TABLE_COLUMN_CONFIG = {
  flex: 1,
  sortable: false,
  suppressHeaderFilterButton: true,
  suppressAutoSize: true,
  suppressHeaderMenuButton: true,
  headerClass: 'flex items-center justify-center',
  editable: false,
  cellClass: 'flex items-center',
};

export type AppTableProps<T> = {
    title: string;
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    loading: boolean;
    error?: string | null;
    searchTerm: string;
    onSearch: (term: string) => void;
    onSort: (key: keyof T, direction: 'asc' | 'desc') => void;
    onPageChange: (page: number) => void;
    onRefresh: () => void;
    onAdd?: () => void;
    onRowClick?: (record: T) => void;
    renderTable: (data: T[], loading: boolean, onSort: (key: keyof T, direction: 'asc' | 'desc') => void, onRowClick?: (record: T) => void) => React.ReactNode;
    addButtonText?: string;
    searchPlaceholder?: string;
    emptyStateMessage?: string;
    className?: string;
}

export type SearchAndActionsProps = {
    searchTerm: string;
    onSearch: (term: string) => void;
    onRefresh: () => void;
    onAdd?: () => void;
    loading: boolean;
    addButtonText?: string;
    searchPlaceholder?: string;
}

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    entityName: string;
}

export type UseAppTableParams = {
  initialPage?: number;
  initialItemsPerPage?: number;
  initialSearchTerm?: string;
}

export type UseAppTableReturns = {
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  handleSearch: (term: string, onSearchChange: (term: string, page: number) => void) => void;
  handlePageChange: (page: number, onPageChange: (page: number) => void) => void;
  resetToFirstPage: () => void;
}

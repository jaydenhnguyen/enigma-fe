export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  sortConfig?: SortConfig<T> | null;
  emptyMessage?: string;
  className?: string;
  rowKey: keyof T;
}

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig: SortConfig<T> | null;
  onSort?: (key: keyof T) => void;
}

export interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: keyof T;
}
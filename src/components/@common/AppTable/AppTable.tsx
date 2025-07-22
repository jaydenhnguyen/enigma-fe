import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-enterprise';
import { ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule]);

type Props<TData> = {
  columns: ColDef[];
  rowData: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  totalRows?: number;
  pageSize?: number;
  currentPage?: number;
  onRowClick?: (data: TData) => void;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSortChange?: (sortModel: any) => void;
  onFilterChange?: (filterModel: any) => void;
};

export function AppTable<TData>({
  columns,
  rowData,
  isLoading,
  emptyMessage = 'No data available',
  pageSize = 10,
  totalRows,
  currentPage,
  onRowClick,
  onPaginationChange,
  onSortChange,
  onFilterChange,
}: Props<TData>) {
  const gridRef = React.useRef<AgGridReact<TData>>(null);

  // Handle row click
  const onRowClicked = React.useCallback(
    (event: any) => {
      if (onRowClick) {
        onRowClick(event.data);
      }
    },
    [onRowClick],
  );

  // Handle sort change
  const onSortChanged = React.useCallback(() => {
    if (onSortChange && gridRef.current) {
      const sortModel = gridRef.current.api.getSortModel();
      onSortChange(sortModel);
    }
  }, [onSortChange]);

  // Handle filter change
  const onFilterChanged = React.useCallback(() => {
    if (onFilterChange && gridRef.current) {
      const filterModel = gridRef.current.api.getFilterModel();
      onFilterChange(filterModel);
    }
  }, [onFilterChange]);

  return (
    <div style={{ width: '100%', height: '95%' }}>
      <AgGridReact<TData>
        ref={gridRef}
        columnDefs={columns}
        rowData={rowData} // Use rowData instead of rowModelType for client-side data
        paginationPageSize={pageSize}
        loading={isLoading}
        overlayNoRowsTemplate={`<span class="ag-overlay-no-rows-center">${emptyMessage}</span>`}
        overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading...</span>`}
        onRowClicked={onRowClicked}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
      />
    </div>
  );
}

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ColDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule]);

type Props<TData> = {
  columns: ColDef[];
  rowData: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
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
  onRowClick,
}: Props<TData>) {
  // Handle row click
  const onRowClicked = React.useCallback(
    (event: any) => {
      if (onRowClick) {
        onRowClick(event.data);
      }
    },
    [onRowClick],
  );

  return (
    <div style={{ width: '100%', height: '95%' }}>
      <AgGridReact<TData>
        columnDefs={columns}
        rowData={rowData}
        loading={isLoading}
        overlayNoRowsTemplate={`<span class="ag-overlay-no-rows-center">${emptyMessage}</span>`}
        overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading...</span>`}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

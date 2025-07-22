import { SortingRequest } from '../models';
import { DefaultMenuItem } from 'ag-grid-community';

export function generateSortableColumnHeaderMenu({
  menuItems,
  setSortModel,
  columnKey,
}: {
  menuItems: DefaultMenuItem[] | { name: string; action: () => void; icon: string }[];
  setSortModel: (sortModel: SortingRequest) => void;
  columnKey: string;
}) {
  return [
    {
      name: 'Sort Ascending',
      action: () => setSortModel({ sortField: columnKey, sortType: 'asc' }),
      icon: '<span class="ag-icon ag-icon-asc" role="presentation"/>',
    },
    {
      name: 'Sort Descending',
      action: () => setSortModel({ sortField: columnKey, sortType: 'desc' }),
      icon: '<span class="ag-icon ag-icon-desc" role="presentation"/>',
    },
    ...menuItems,
  ];
}

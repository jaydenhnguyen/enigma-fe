import { Box, IconButton } from '@mui/material';
import { DefaultMenuItem } from 'ag-grid-community';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { SortingRequest } from '../models';
import { useUserContext } from '../context';

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
      action: () => setSortModel({ sortBy: columnKey, sortType: 'asc' }),
      icon: '<span class="ag-icon ag-icon-asc" role="presentation"/>',
    },
    {
      name: 'Sort Descending',
      action: () => setSortModel({ sortBy: columnKey, sortType: 'desc' }),
      icon: '<span class="ag-icon ag-icon-desc" role="presentation"/>',
    },
    ...menuItems,
  ];
}

export function renderActionColumn({
  onClickView,
  onClickEdit,
}: {
  onClickView?: () => void;
  onClickEdit?: () => void;
}) {
  const {
    state: { isAdmin },
  } = useUserContext();
  
  return (
    <Box className="flex justify-center items-center gap-x-3">
      <IconButton aria-label="View" size="large" onClick={onClickView} sx={{ padding: 0 }} color="success">
        <VisibilityIcon />
      </IconButton>

      {isAdmin && (
        <IconButton onClick={onClickEdit} aria-label="Edit" sx={{ padding: 0 }}>
          <ModeEditOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
}

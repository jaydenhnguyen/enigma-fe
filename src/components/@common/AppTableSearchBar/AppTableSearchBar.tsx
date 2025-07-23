import * as React from 'react';
import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { SearchingRequest, SearchOptionItem } from 'src/shared/models';
import classes from './AppTableSearchBar.module.scss';

type Props = {
  searchOptions: SearchOptionItem[];
  onSearch: (searchModel: SearchingRequest) => void;
  onClear: () => void;
};

export function AppTableSearchBar({ searchOptions, onSearch, onClear }: Props): React.ReactElement {
  const [searchBy, setSearchBy] = React.useState(searchOptions?.[0]?.value);
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = () => {
    if (searchValue.trim()) onSearch({ searchBy, searchValue });
  };

  const handleClear = () => {
    setSearchValue('');
    onClear();
  };

  return (
    <Paper elevation={1} className={classes['wrapper']}>
      {/* Search By Dropdown */}
      <Box className={classes['search-by-wrapper']}>
        <FormControl fullWidth size="small">
          <InputLabel id="search-by-label">Search By</InputLabel>
          <Select
            labelId="search-by-label"
            id="searchBy"
            value={searchBy}
            label="Search By"
            onChange={(e: SelectChangeEvent) => setSearchBy(e.target.value)}
          >
            {searchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Search Input */}
      <Box className={classes['search-input-wrapper']}>
        <TextField
          fullWidth
          id="searchTerm"
          size="small"
          label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Input search value"
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={1}>
        <Button
          disabled={!searchValue.trim()}
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<Search fontSize="small" />}
        >
          Search
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Paper>
  );
}

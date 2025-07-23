import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  IconButton,
} from '@mui/material';
import { Search, Close as X } from '@mui/icons-material';
import classes from './AppTableSearchBar.module.scss';

type Props = {};

export function AppTableSearchBar({}: Props): React.ReactElement {
  const searchOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'id', label: 'ID' },
    { value: 'status', label: 'Status' },
  ];

  const [searchBy, setSearchBy] = React.useState(searchOptions[0].value);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Search by:', searchBy, 'Term:', searchTerm.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    console.log('Search by:', searchBy, 'Term: (cleared)');
  };

  return (
    <Box className={classes['wrapper']}>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Input search value"
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={1}>
        <Button
          disabled={!searchTerm.trim()}
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<Search fontSize="small" />}
        >
          Search
        </Button>
        <Button variant="outlined" onClick={handleClear} disabled={!searchTerm.trim()}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}

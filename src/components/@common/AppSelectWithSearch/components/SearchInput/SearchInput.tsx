import * as React from 'react';
import { CircularProgress, TextField } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';

type Props = {
  params: AutocompleteRenderInputParams;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
};

export function SearchInput({
  params,
  label,
  required,
  isLoading,
  placeholder = 'Search...',
  size = 'medium',
}: Props): React.ReactElement {
  return (
    <TextField
      {...params}
      label={label}
      placeholder={placeholder}
      required={required}
      variant="outlined"
      size={size}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading && <CircularProgress color="inherit" size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        },
      }}
    />
  );
}

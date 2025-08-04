import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';
import classes from './LoadingSelectOptions.module.scss';

export function LoadingSelectOptions(): React.ReactElement {
  return (
    <li>
      <Box className={classes['wrapper']}>
        <CircularProgress size={16} sx={{ mr: 1 }} />
      </Box>
    </li>
  );
}

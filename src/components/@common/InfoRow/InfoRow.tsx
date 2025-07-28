import * as React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  label: string;
  value?: number | string | React.ReactElement;
};

export function InfoRow({ label, value }: Props): React.ReactElement {
  return (
    <Box display="flex" mb={1}>
      <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 120, mr: 2 }}>
        {label}:
      </Typography>

      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

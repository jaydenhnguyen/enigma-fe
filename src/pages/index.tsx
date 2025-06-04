import * as React from 'react';
import { Box } from '@mui/material';
import { Home } from 'src/modules/home';
import { PublicLayout } from 'src/layouts/PublicLayout';

export default function Index() {
  return (
    <PublicLayout>
      <Box sx={{ width: '100%' }}>
        <Home />
      </Box>
    </PublicLayout>
  );
}

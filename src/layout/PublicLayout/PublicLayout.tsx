import React from 'react';
import { Box, Container } from '@mui/material';
import classes from './PublicLayout.module.scss';

export function PublicLayout({ children }: { children: React.ReactElement }): React.ReactElement | null {
  return (
    <Box sx={{ minHeight: '100vh', paddingBottom: '7.75rem' }}>
      <Container className={classes['container']}>
        <div className={classes['right-side']}>{children}</div>
      </Container>
    </Box>
  );
}

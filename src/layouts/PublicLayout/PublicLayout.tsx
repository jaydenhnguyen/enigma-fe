import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import { tokenManager } from 'src/configs';
import classes from './PublicLayout.module.scss';

export function PublicLayout({ children }: { children: React.ReactElement }): React.ReactElement | null {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);

  const isAuthenticated = tokenManager.isAuthenticated();

  React.useEffect(() => setIsClient(true), []);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home').then();
    }
  }, [isAuthenticated, router]);

  return isClient && !isAuthenticated ? (
    <Box sx={{ minHeight: '100vh', paddingBottom: '7.75rem' }}>
      <Container className={classes['container']}>{children}</Container>
    </Box>
  ) : (
    <Box></Box>
  );
}

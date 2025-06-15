import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { tokenManager } from 'src/configs';
import { PublicHeadBar } from 'src/components';
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
    <Box className={classes['wrapper']}>
      <PublicHeadBar />

      {/* Main content */}
      <Box component="main" flex={1} className={classes['main-wrapper']}>
        <Container maxWidth="lg" style={{ padding: 0 }}>
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        className={classes['footer-wrapper']}
        sx={{ boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)' }}
      >
        <Container maxWidth="lg">
          <Box className={classes['footer-content-wrapper']}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                A-Z Moving
              </Typography>

              <Typography variant="body2">1750 Finch Ave E, North York, ON M2J 2X5</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                About us
              </Typography>

              <Typography variant="body2">Learn more about us</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Contact us
              </Typography>

              <Typography variant="body2">+1 (434) 546 6464</Typography>

              <Typography variant="body2">info@azmoving.com</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Business Hours
              </Typography>

              <Typography variant="body2">Mon–Thu: 08:00 - 16:00</Typography>

              <Typography variant="body2">Fri: 08:00 - 15:00</Typography>
            </Box>
          </Box>

          <Typography variant="caption" display="block" textAlign="center" mt={3}>
            Powered by Loubna, Dmytro, Joshi, and Jayden
          </Typography>
        </Container>
      </Box>
    </Box>
  ) : null;
}

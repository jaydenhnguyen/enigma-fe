import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Container, AppBar, Toolbar, Stack, Link, Typography } from '@mui/material';
import { NavItem } from 'src/components';
import { tokenManager } from 'src/configs';
import AzMovingLogo from 'src/assets/az_moving_logo.svg';
import { NAV_ITEMS } from './constants';
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
      <AppBar
        position="sticky"
        color="default"
        className={classes['shadow']}
        sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
      >
        <Toolbar className={classes['toolbar-wrapper']}>
          <Container maxWidth="lg" className={classes['toolbar']}>
            <Box>
              <Image src={AzMovingLogo} alt="A-Z Moving" width={65} />
            </Box>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={3} className={classes['nav-wrapper']}>
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.label} href={item.href} content={item.label} />
                ))}
              </Stack>

              <Link href="https://az-moving.com/" underline="none" className={classes['main-page-btn']}>
                Main Page
              </Link>
            </div>
          </Container>
        </Toolbar>
      </AppBar>

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

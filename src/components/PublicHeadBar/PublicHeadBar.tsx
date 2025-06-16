import * as React from 'react';
import Image from 'next/image';
import { Box, Container, Link, Stack } from '@mui/material';
import { NAV_ITEMS } from 'src/shared/constants';
import AzMovingLogo from 'src/assets/az_moving_logo.svg';
import { TopBar } from '../common';
import { NavItem } from '../NavItem';
import classes from './PublicHeadBar.module.scss';

type Props = {};

export function PublicHeadBar({}: Props): React.ReactElement {
  return (
    <TopBar appBarProps={{ position: 'fixed' }} customClasses={{ container: 'pt-1' }}>
      <Container maxWidth="lg" className={classes['toolbar']}>
        <Box>
          <Image src={AzMovingLogo} alt="A-Z Moving" width={65} />
        </Box>

        <div className={classes['action-wrapper']}>
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
    </TopBar>
  );
}

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { tokenManager } from 'src/configs';
import { APP_ROUTES } from 'src/shared/constants';
import AzMovingLogo from 'src/assets/az_moving_logo.svg';
import { TopBar } from '../common';
import classes from './PrivateHeadBar.module.scss';

type Props = {
  onToggleSideMenu: () => void;
};

export function PrivateHeadBar({ onToggleSideMenu }: Props): React.ReactElement {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => setAnchorEl(null), []);

  const handleSignOut = React.useCallback(async () => {
    tokenManager.clearSession();
    router.replace(APP_ROUTES.INTRODUCTION).then();
  }, [router]);

  return (
    <TopBar customClasses={{ container: classes['container'] }} appBarProps={{ position: 'fixed' }}>
      <>
        <Box className={classes['header-left']}>
          <IconButton onClick={onToggleSideMenu} className={classes['toggle-btn']}>
            <MenuIcon />
          </IconButton>

          <Image src={AzMovingLogo} alt={'AZ moving logo'} width={65} />
        </Box>

        <Box>
          <IconButton onClick={handleClick} style={{ marginTop: '5px' }}>
            <Avatar className={classes['user-ava']}>JD</Avatar>
          </IconButton>

          <Menu
            sx={{ marginTop: '6px' }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem className={classes['menu-item']}>
              <AccountCircleIcon className={'text-primary-main'} /> View Profile
            </MenuItem>

            <MenuItem className={classes['menu-item']} onClick={handleSignOut}>
              <LogoutIcon className={'text-primary-main'} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </>
    </TopBar>
  );
}

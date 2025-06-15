import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { tokenManager } from 'src/configs';
import AzMovingLogo from 'src/assets/az_moving_logo.svg';
import classes from './HeadBar.module.scss';

type Props = {};

export function HeadBar({}: Props): React.ReactElement {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => setAnchorEl(null), []);

  const handleSignOut = React.useCallback(async () => {
    tokenManager.clearSession();
    router.replace('/login').then();
  }, [router]);

  return (
    <AppBar position="fixed" color="default" className={classes['wrapper']} elevation={1}>
      <Toolbar className={classes['container']}>
        <Box className={classes['header-left']}>
          <IconButton onClick={() => {}} className={classes['toggle-btn']}>
            <MenuIcon />
          </IconButton>

          <Image src={AzMovingLogo} alt={'AZ moving logo'} />
        </Box>

        <Box>
          <IconButton onClick={handleClick} style={{ marginTop: '5px' }}>
            <Avatar className={classes['user-ava']}>JD</Avatar>
          </IconButton>

          <Menu
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
      </Toolbar>
    </AppBar>
  );
}

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
import { LAYOUT_ACTIONS, useLayout, USER_CONTEXT_ACTIONS, useUserContext } from 'src/shared/context';
import { TopBar } from '../@common';
import classes from './PrivateHeadBar.module.scss';

export function PrivateHeadBar(): React.ReactElement {
  const router = useRouter();
  const { dispatch: layoutDispatch } = useLayout();
  const {
    state: { user: currentUser },
    dispatch: userContextDispatch,
  } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => setAnchorEl(null), []);

  const handleSignOut = React.useCallback(async () => {
    tokenManager.clearSession();

    router.replace(APP_ROUTES.INTRODUCTION).then(() => {
      handleClose();
      userContextDispatch({
        type: USER_CONTEXT_ACTIONS.SET_AUTHENTICATED_USER,
        payload: null,
      });
    });
  }, [router]);

  const handleNavToProfile = React.useCallback(() => {
    router.push(APP_ROUTES.PROFILE).then(() => handleClose());
  }, [router]);

  const onToggleSideMenu = React.useCallback(() => {
    layoutDispatch({ type: LAYOUT_ACTIONS.TOGGLE_SIDE_MENU });
  }, []);

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
            <Avatar
              className={classes['user-ava']}
              sx={{ width: '40px', height: '40px' }}
              children={`${currentUser?.firstName?.charAt(0).toUpperCase()}${currentUser?.lastName?.charAt(0).toUpperCase()}`}
            />
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
            <MenuItem className={classes['menu-item']} onClick={handleNavToProfile}>
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

import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, List } from '@mui/material';
import { MenuItem } from 'src/shared/types';
import { SIDE_MENU_ITEMS } from 'src/shared/constants';
import { SideMenuItem } from '../SideMenuItem';
import classes from './SideMenu.module.scss';

type Props = {
  width: number;
  isCollapsed: boolean;
};

export function SideMenu({ width, isCollapsed }: Props): React.ReactElement {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleClick = (item: MenuItem) => router.push(item.route).then();

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: classes['drawer-paper'] }}
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          transition: 'width 0.3s ease',
          height: '100vh',
          top: '4.125rem',
        },
      }}
    >
      <Box className={classes['content-wrapper']}>
        <Box className={classes['content-container']}>
          <List className={classes['content-list']}>
            {SIDE_MENU_ITEMS.map((item, idx) => {
              const isSelected = item.route === currentPath;

              return (
                <SideMenuItem
                  key={`${item.text}_${idx}`}
                  item={item}
                  isSelected={isSelected}
                  onClick={handleClick}
                  isCollapsed={isCollapsed}
                />
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, List } from '@mui/material';
import { useLayout } from 'src/context';
import { MenuItem } from 'src/shared/types';
import { SIDE_MENU_ITEMS } from 'src/shared/constants';
import { SideMenuItem } from '../SideMenuItem';
import classes from './SideMenu.module.scss';

const COLLAPSED_WIDTH = 85;
const EXPANDED_WIDTH = 280;

export function SideMenu(): React.ReactElement {
  const router = useRouter();
  const currentPath = router.pathname;

  const {
    state: { isSideMenuCollapsed },
  } = useLayout();

  const handleClick = (item: MenuItem) => router.push(item.route).then();

  const width = React.useMemo(() => (isSideMenuCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH), [isSideMenuCollapsed]);

  return (
    <div className={classes['wrapper']} style={{ width: width }}>
      <Drawer
        variant="permanent"
        classes={{ paper: classes['drawer-paper'] }}
        sx={{
          '& .MuiDrawer-paper': {
            width: width,
            transition: 'width 0.3s ease',
            height: 'calc(100vh - 66px)',
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
                    isCollapsed={isSideMenuCollapsed}
                  />
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

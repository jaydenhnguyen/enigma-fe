import * as React from 'react';
import { Drawer } from '@mui/material';
import classes from './SideMenu.module.scss';

type Props = {
  sidebarCollapsed: boolean;
};

export function SideMenu({ sidebarCollapsed }: Props): React.ReactElement {
  const drawerWidth = React.useMemo(() => (sidebarCollapsed ? 64 : 280), [sidebarCollapsed]);

  return (
    <Drawer
      variant="permanent"
      className={classes['wrapper']}
      classes={{ paper: classes['drawer-paper'] }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          transition: 'width 0.3s ease',
        },
      }}
    ></Drawer>
  );
}

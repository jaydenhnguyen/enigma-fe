import * as React from 'react';
import { PrivateHeadBar } from 'src/components';
import { SideMenu } from 'src/components/SideMenu';
import classes from './PrivateLayout.module.scss';

// In px
const COLLAPSED_WIDTH = 85;
const EXPANDED_WIDTH = 280;

export default function PrivateLayout({ children }: { children: React.ReactElement }) {
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = React.useState(false);

  const toggleSideMenu = React.useCallback(() => {
    setIsSideMenuCollapsed(!isSideMenuCollapsed);
  }, [isSideMenuCollapsed]);

  const sideMenuWidth = React.useMemo(() => {
    return isSideMenuCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  }, [isSideMenuCollapsed]);

  return (
    <div className={classes['wrapper']}>
      <SideMenu width={sideMenuWidth} isCollapsed={isSideMenuCollapsed} />

      {/* Header */}
      <PrivateHeadBar onToggleSideMenu={toggleSideMenu} />

      {/* Main Content */}
      <main
        className={classes['main-content-wrapper']}
        style={{
          marginLeft: sideMenuWidth,
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </main>
    </div>
  );
}

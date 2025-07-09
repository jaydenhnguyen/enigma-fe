import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/configs';
import { PrivateHeadBar } from 'src/components';
import { APP_ROUTES } from 'src/shared/constants';
import { SideMenu } from 'src/components/SideMenu';
import classes from './PrivateLayout.module.scss';

// In px
const COLLAPSED_WIDTH = 85;
const EXPANDED_WIDTH = 280;

export function PrivateLayout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (tokenManager.isAuthenticated()) {
      router.replace(APP_ROUTES.INTRODUCTION).then();
    } else {
      setHydrated(true);
    }
  }, []);

  const toggleSideMenu = React.useCallback(() => {
    setIsSideMenuCollapsed(!isSideMenuCollapsed);
  }, [isSideMenuCollapsed]);

  const sideMenuWidth = isSideMenuCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  if (!hydrated) return null;

  return (
    <div className={classes['wrapper']}>
      {/* Header */}
      <PrivateHeadBar onToggleSideMenu={toggleSideMenu} />

      {/* Body */}
      <div className={classes['content-area']}>
        {/* Side Menu with controlled width */}
        <div className={classes['side-menu-wrapper']} style={{ width: sideMenuWidth }}>
          <SideMenu width={sideMenuWidth} isCollapsed={isSideMenuCollapsed} />
        </div>

        {/* Main Content */}
        <main className={classes['main-content-wrapper']}>{children}</main>
      </div>
    </div>
  );
}

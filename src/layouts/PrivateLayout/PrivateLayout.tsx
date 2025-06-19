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
  // Toggles the side menu width (Hamburger menu expand or collapse)
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = React.useState(false);
  // Prevents layout from flashing before auth check is complete.
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace(APP_ROUTES.INTRODUCTION).then();
    } else {
      setHydrated(true);
    }
  }, []);

  // Passed as props to the head bar where it will toggle the hamburger menu.
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

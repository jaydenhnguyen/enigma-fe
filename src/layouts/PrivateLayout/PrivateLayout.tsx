import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/configs';
import { useLayout } from 'src/shared/context';
import { PrivateHeadBar } from 'src/components';
import { APP_ROUTES } from 'src/shared/constants';
import { useLoadAndSetUserInfo } from 'src/shared/hooks';
import { COLLAPSED_WIDTH, EXPANDED_WIDTH, SideMenu } from 'src/components/SideMenu';
import classes from './PrivateLayout.module.scss';

export function PrivateLayout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);
  const { loadUser } = useLoadAndSetUserInfo();
  const { state: layoutState } = useLayout();

  React.useEffect(() => {
    const init = async () => {
      if (!tokenManager.isAuthenticated()) {
        router.replace(APP_ROUTES.INTRODUCTION).then();
        return;
      }

      await loadUser();
      setHydrated(true);
    };

    init().then();
  }, []);

  if (!hydrated) return null;

  const mainWidth = `calc(100vw - ${layoutState.isSideMenuCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH}px)`;

  return (
    <div className={classes['wrapper']}>
      {/* Header */}
      <PrivateHeadBar />

      {/* Body */}
      <div className={classes['content-area']}>
        {/* Side Menu with controlled width */}
        <SideMenu />

        {/* Main Content */}
        <main className={classes['main-content-wrapper']} style={{ width: mainWidth }}>
          {children}
        </main>
      </div>
    </div>
  );
}

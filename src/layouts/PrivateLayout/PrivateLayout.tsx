import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/configs';
import { PrivateHeadBar } from 'src/components';
import { APP_ROUTES } from 'src/shared/constants';
import { SideMenu } from 'src/components/SideMenu';
import classes from './PrivateLayout.module.scss';

export function PrivateLayout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace(APP_ROUTES.INTRODUCTION).then();
    } else {
      setHydrated(true);
    }
  }, []);

  if (!hydrated) return null;

  return (
    <div className={classes['wrapper']}>
      {/* Header */}
      <PrivateHeadBar />

      {/* Body */}
      <div className={classes['content-area']}>
        {/* Side Menu with controlled width */}
        <SideMenu />

        {/* Main Content */}
        <main className={classes['main-content-wrapper']}>{children}</main>
      </div>
    </div>
  );
}

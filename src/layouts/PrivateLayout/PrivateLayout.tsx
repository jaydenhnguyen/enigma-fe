import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/configs';
import {
  CalendarMonth,
  People,
  Schedule,
  History,
  SupervisorAccount,
  Business,
  Dashboard as DashboardIcon,
  Settings,
  Analytics,
} from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarMonth />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Management',
  },
  {
    segment: 'leads',
    title: 'Leads',
    icon: <People />,
  },
  {
    segment: 'upcoming-events',
    title: 'Upcoming Events',
    icon: <Schedule />,
  },
  {
    segment: 'past-events',
    title: 'Past Events',
    icon: <History />,
  },
  {
    segment: 'employees',
    title: 'Manage Employees',
    icon: <SupervisorAccount />,
  },
  {
    segment: 'clients',
    title: 'Clients',
    icon: <Business />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'analytics',
    title: 'Analytics',
    icon: <Analytics />,
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <Settings />,
  },
];

const BRANDING = {
  title: 'A-Z Moving',
  logo: <img src="https://mui.com/static/logo.png" alt="A-Z Moving logo" style={{ height: 32 }} />,
};

export function PrivateLayout({ children }: { children: React.ReactElement }): React.ReactElement {
  const router = useRouter();

  React.useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace('/login').then();
    }
    if (router.pathname === '/') {
      router.replace('/home').then();
    }
  }, [router]);

  const handleSignOut = React.useCallback(async () => {
    tokenManager.clearSession();
    router.replace('/login').then();
  }, [router]);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        // This won't be called since we handle auth externally
      },
      signOut: handleSignOut,
    };
  }, [handleSignOut]);

  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING} authentication={authentication}>
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}

import * as React from 'react';
import { AdminPanelSettings, Help, Person, SupervisorAccount } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { ROLES } from 'src/shared/constants';

type Props = {
  role: ROLES;
};

export function UserRoleChips({ role }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return {
          label: 'Super Admin',
          color: 'secondary' as const,
          icon: <AdminPanelSettings />,
          description: 'Full System Access',
        };
      case ROLES.ADMIN:
        return {
          label: 'Admin',
          color: 'secondary' as 'secondary',
          icon: <SupervisorAccount />,
          description: 'Administrative Access',
        };
      case ROLES.EMPLOYEE:
        return {
          label: 'Employee',
          color: 'primary' as 'primary',
          icon: <Person />,
          backgroundColor: 'primary.lighter',
          textColor: 'primary.main',
          description: 'Standard User Access',
        };
      default:
        return {
          label: 'Unknown Role',
          color: 'default' as const,
          icon: <Help />,
          description: 'Unknown Role',
        };
    }
  }, [role]);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="filled"
      size={'medium'}
      icon={config.icon}
      sx={{
        fontWeight: 'bold',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        borderRadius: '6px',
        '& .MuiChip-icon': {
          fontSize: '20px',
          color: config.textColor,
        },
        ...(role === ROLES.SUPER_ADMIN && {
          background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
          color: 'white',
        }),
      }}
    />
  );
}

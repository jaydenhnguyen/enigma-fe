import * as React from 'react';
import { AdminPanelSettings, Help, Person, SupervisorAccount } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { ROLES } from 'src/shared/constants';

type Props = {
  role: ROLES;
};

export function UserRoleChips({ role }: Props): React.ReactElement {
  const getRoleConfig = (roleType: ROLES) => {
    switch (roleType) {
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
          color: 'primary' as const,
          icon: <SupervisorAccount />,
          description: 'Administrative Access',
        };
      case ROLES.EMPLOYEE:
        return {
          label: 'Employee',
          color: 'default' as const,
          icon: <Person />,
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
  };

  const config = getRoleConfig(role);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="filled"
      size={'medium'}
      icon={config.icon}
      sx={{
        borderRadius: '6px',
        '& .MuiChip-icon': {
          fontSize: '20px',
        },
        ...(role === ROLES.SUPER_ADMIN && {
          background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
          color: 'white',
          fontWeight: 'bold',
        }),
      }}
    />
  );
}

import * as React from 'react';
import { Chip } from '@mui/material';
import { Block, CheckCircle } from '@mui/icons-material';

type Props = {
  isActivated: boolean;
  size?: 'small' | 'medium';
};

export function UserActiveStatusChip({ isActivated, size = 'medium' }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    if (isActivated) {
      return {
        label: 'Active',
        color: 'success' as const,
        icon: <CheckCircle />,
        description: 'Currently Active',
      };
    }

    return {
      label: 'Inactive',
      color: 'default' as const,
      icon: <Block />,
      description: 'Not Active',
    };
  }, [isActivated]);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant={'filled'}
      size={size}
      icon={config.icon}
      sx={{
        fontWeight: 'medium',
        '& .MuiChip-icon': {
          fontSize: '20px',
        },
      }}
    />
  );
}

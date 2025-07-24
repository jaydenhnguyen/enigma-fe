import * as React from 'react';
import { Block, CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';

type Props = {
  isActive: boolean;
};

export function UserActiveStatusChip({ isActive }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    if (isActive) {
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
  }, [isActive]);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant={'filled'}
      size={'medium'}
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

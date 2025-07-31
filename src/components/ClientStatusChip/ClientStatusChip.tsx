import * as React from 'react';
import { Chip } from '@mui/material';

export enum CLIENT_STATUS {
  AWARE = 'AWARE',
  CONTACTED = 'CONTACTED',
  NURTURING = 'NURTURING',
  NOT_ANSWER = 'NOT_ANSWER',
  UNQUALIFIED = 'UNQUALIFIED',
}

type Props = {
  status: CLIENT_STATUS | string;
};

export function ClientStatusChip({ status }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    switch (status) {
      case CLIENT_STATUS.AWARE:
        return {
          label: 'Aware',
          color: 'info' as const,
          backgroundColor: 'info.lighter',
          textColor: 'info.main',
        };

      case CLIENT_STATUS.CONTACTED:
        return {
          label: 'Contacted',
          color: 'primary' as const,
          backgroundColor: 'primary.lighter',
          textColor: 'primary.main',
        };

      case CLIENT_STATUS.NURTURING:
        return {
          label: 'Nurturing',
          color: 'warning' as const,
          backgroundColor: 'warning.lighter',
          textColor: 'warning.dark',
        };

      case CLIENT_STATUS.NOT_ANSWER:
        return {
          label: 'No Answer',
          color: 'error' as const,
          backgroundColor: 'error.lighter',
          textColor: 'error.main',
        };

      case CLIENT_STATUS.UNQUALIFIED:
        return {
          label: 'Unqualified',
          color: 'secondary' as const,
          backgroundColor: 'grey.200',
          textColor: 'grey.700',
        };

      default:
        return {
          label: status || 'Unknown',
          color: 'default' as const,
          backgroundColor: 'grey.100',
          textColor: 'grey.600',
        };
    }
  }, [status]);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="filled"
      size="medium"
      sx={{
        borderRadius: '6px',
        fontWeight: 'medium',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        '&:hover': {
          backgroundColor: config.backgroundColor,
        },
      }}
    />
  );
}

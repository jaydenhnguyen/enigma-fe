import * as React from 'react';
import { DRIVING_LICENSE_TYPES } from 'src/modules/Users';
import { Chip } from '@mui/material';

type Props = {
  licenseType: DRIVING_LICENSE_TYPES;
};

export function DrivingLicenseChip({ licenseType }: Props): React.ReactElement {
  const getLicenseConfig = (type: DRIVING_LICENSE_TYPES) => {
    switch (type) {
      case DRIVING_LICENSE_TYPES.G_1:
        return {
          label: 'G1 License',
          color: 'warning' as const,
          description: "Learner's Permit",
        };
      case DRIVING_LICENSE_TYPES.G_2:
        return {
          label: 'G2 License',
          color: 'info' as const,
          description: 'Probationary License',
        };
      case DRIVING_LICENSE_TYPES.FULL_G:
        return {
          label: 'Full G License',
          color: 'success' as const,
          description: 'Full License',
        };
      default:
        return {
          label: 'Unknown License',
          color: 'default' as const,
          description: 'Unknown',
        };
    }
  };

  const config = getLicenseConfig(licenseType);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant={'filled'}
      size={'medium'}
      sx={{
        fontWeight: 'medium',
        '& .MuiChip-icon': {
          fontSize: '20px',
        },
      }}
    />
  );
}

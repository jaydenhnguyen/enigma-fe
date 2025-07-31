import * as React from 'react';
import { Chip } from '@mui/material';
import HailIcon from '@mui/icons-material/Hail';
import HikingIcon from '@mui/icons-material/Hiking';
import { DELIVERY_ROLES } from 'src/modules/Events';
import { PopulatedUserResponse } from 'src/modules/Users';

type Props = {
  mover: PopulatedUserResponse & { deliveryManType: DELIVERY_ROLES };
  onClick?: () => void;
};

export function MoverChip({ mover, onClick }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    const fullName = `${mover.firstName} ${mover.lastName}`;

    if (mover.deliveryManType === DELIVERY_ROLES.PICKUP) {
      return {
        label: fullName,
        color: 'primary' as 'primary',
        icon: <HailIcon />,
        backgroundColor: 'primary.lighter',
        textColor: 'primary.main',
      };
    }

    return {
      label: fullName,
      color: 'info' as 'info',
      icon: <HikingIcon />,
      backgroundColor: 'info.lighter',
      textColor: 'info.main',
    };
  }, [mover]);

  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="filled"
      size="medium"
      icon={config.icon}
      onClick={onClick}
      clickable={!!onClick}
      sx={{
        fontWeight: 'medium',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        '& .MuiChip-icon': {
          fontSize: '18px',
          color: config.textColor,
        },
        '&:hover': onClick
          ? {
              backgroundColor: config.backgroundColor,
              transform: 'scale(1.02)',
            }
          : {},
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  );
}

import * as React from 'react';
import { Chip } from '@mui/material';
import HailIcon from '@mui/icons-material/Hail';
import HikingIcon from '@mui/icons-material/Hiking';
import Person from '@mui/icons-material/Person';
import { DELIVERY_ROLES } from 'src/modules/Events';
import { PopulatedUserResponse } from 'src/modules/Users';

type Props = {
  populatedUser: PopulatedUserResponse & { deliveryManType?: DELIVERY_ROLES };
  onClick?: () => void;
};

export function MoverChip({ populatedUser, onClick }: Props): React.ReactElement {
  const config = React.useMemo(() => {
    const fullName = `${populatedUser.firstName} ${populatedUser.lastName}`;

    if (populatedUser.deliveryManType === DELIVERY_ROLES.PICKUP) {
      return {
        label: fullName,
        color: 'primary' as 'primary',
        icon: <HailIcon />,
        backgroundColor: 'primary.lighter',
        textColor: 'primary.main',
      };
    }

    if (populatedUser.deliveryManType === DELIVERY_ROLES.DELIVERY) {
      return {
        label: fullName,
        color: 'info' as 'info',
        icon: <HikingIcon />,
        backgroundColor: 'info.lighter',
        textColor: 'info.main',
      };
    }

    return {
      label: fullName,
      color: 'primary' as 'primary',
      icon: <Person />,
      backgroundColor: 'primary.lighter',
      textColor: 'primary.main',
    };
  }, [populatedUser]);

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
        borderRadius: '6px',
        '& .MuiChip-icon': {
          fontSize: '20px',
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

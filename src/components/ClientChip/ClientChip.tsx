import * as React from 'react';
import { Chip } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { PopulatedClientResponse } from 'src/modules/Clients';

type Props = {
  clientInfo: PopulatedClientResponse;
  onClick?: () => void;
};

export function ClientChip({ clientInfo, onClick }: Props): React.ReactElement {
  const fullName = `${clientInfo.firstName} ${clientInfo.lastName}`;

  return (
    <Chip
      label={fullName}
      icon={<VisibilityOutlinedIcon />}
      variant="filled"
      size="medium"
      onClick={onClick}
      clickable={!!onClick}
      sx={{
        fontWeight: 'medium',
        backgroundColor: 'success.lighter',
        color: 'success.main',
        '& .MuiChip-icon': {
          fontSize: '18px',
          color: 'success.main',
        },
        '&:hover': onClick
          ? {
              backgroundColor: 'success.lighter',
              transform: 'scale(1.02)',
            }
          : {},
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  );
}

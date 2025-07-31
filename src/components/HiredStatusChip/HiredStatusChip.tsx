import * as React from 'react';
import { Chip } from '@mui/material';
import { Block, CheckCircle } from '@mui/icons-material';

type Props = {
  isHired: boolean;
};

export function HiredStatusChip({ isHired }: Props): React.ReactElement {
  return (
    <Chip
      icon={isHired ? <CheckCircle /> : <Block />}
      label={isHired ? 'Hired' : 'Not Hired'}
      color={isHired ? 'success' : 'default'}
      size="small"
      sx={{
        borderRadius: '6px',
        fontWeight: 'medium',
      }}
    />
  );
}

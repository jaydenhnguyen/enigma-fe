import * as React from 'react';
import { Typography } from '@mui/material';
import { AppCard } from '../AppCard';

type Props = {
  title: string;
  children: React.ReactElement;
};

export function InfoSection({ title, children }: Props): React.ReactElement {
  return (
    <AppCard>
      <>
        <Typography variant="h6" gutterBottom color="primary">
          {title}
        </Typography>
        {children}
      </>
    </AppCard>
  );
}

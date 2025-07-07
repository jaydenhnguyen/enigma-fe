import * as React from 'react';
import classes from './AppCard.module.scss';
import { Card, CardContent } from '@mui/material';

type Props = {
  children?: React.ReactElement;
};

export function AppCard({ children }: Props): React.ReactElement {
  return (
    <Card className={classes['card-wrapper']}>
      <CardContent className={classes['card-content']}>{children}</CardContent>
    </Card>
  );
}

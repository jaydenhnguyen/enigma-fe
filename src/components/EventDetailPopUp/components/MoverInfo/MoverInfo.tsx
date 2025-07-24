import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { MoverResponse } from 'src/modules/Events';
import classes from './MoverInfo.module.scss';

type Props = {
  mover: MoverResponse;
};

export function MoverInfo({ mover }: Props): React.ReactElement {
  return (
    <Box className={classes['wrapper']}>
      <Typography variant="body2" fontWeight="bold">
        {mover.firstName} {mover.lastName}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {mover.phoneNumber} | {mover.email}
      </Typography>
    </Box>
  );
}

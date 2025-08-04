import * as React from 'react';
import { Box } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

type Props = {
  isHasTimePicker?: boolean;
};

export function AppDateTimePicker({ isHasTimePicker }: Props): React.ReactElement {
  return <Box>{isHasTimePicker ? <DateTimePicker /> : <DatePicker />}</Box>;
}

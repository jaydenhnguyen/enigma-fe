import * as React from 'react';
import { Box } from '@mui/material';
import { AppTableV2 } from 'src/components';
import { EVENT_TYPE } from './constants';
import { useBuildEventTableColumns } from './hooks';

type Props = {
  eventType: EVENT_TYPE;
};

export function Event({ eventType }: Props): React.ReactElement {
  const columns = useBuildEventTableColumns();

  return (
    <Box sx={{ width: '100%' }}>
      <AppTableV2
        columns={columns}
        onFetchData={() => {}}
        pinnedColumns={{ left: ['movingDate'], right: ['action'] }}
      />
    </Box>
  );
}

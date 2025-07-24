import * as React from 'react';
import { Box, Chip, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { formatDateCell } from 'src/shared/util';
import { notify, ToastType } from '../NotifyToast';
import { AppPopUp, InfoRow, InfoSection } from '../@common';
import { useGetEventDetail } from 'src/modules/Events';
import { MoverInfo } from './components';
import classes from './EventDetailPopUp.module.scss';

type Props = {
  isOpen: boolean;
  eventId: string;
  onClose: () => void;
};

export function EventDetailPopUp({ eventId, isOpen, onClose }: Props): React.ReactElement | null {
  const { data, isLoading, error, refetch, isFetching } = useGetEventDetail(eventId);

  React.useEffect(() => {
    if (!eventId?.trim()) return;
    refetch().then();
  }, [eventId]);

  React.useEffect(() => {
    if (!!error) {
      notify({ message: 'Can not get event details', type: ToastType.error });
      onClose();
    }
  }, [error, onClose]);

  return (
    <AppPopUp isOpen={isOpen} onClose={onClose} title="Moving Service Details">
      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <Box className={classes['wrapper']}>
        {/* Basic Information */}
        <InfoSection title="Service Overview">
          <Grid container spacing={2}>
            <Grid>
              <InfoRow label="Service ID" value={data?._id} />
              <InfoRow label="Client ID" value={data?.clientId} />
            </Grid>
            <Grid>
              <InfoRow
                label="Service Rate"
                value={
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    ${data?.serviceRate}/hour
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </InfoSection>

        {/* Pickup Information */}
        <InfoSection title="Pickup Details">
          <>
            <InfoRow label="Date & Time" value={formatDateCell(data?.pickupDateTime ?? '')} />
            <InfoRow label="Address" value={data?.pickupAddress} />
            <InfoRow label="Address Size" value={<Chip label={data?.pickupAddressSize} size="small" />} />
            <InfoRow label="Trucks Count" value={data?.pickupTrucksCount} />

            {data?.pickupMoversAssigned && data?.pickupMoversAssigned?.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" fontWeight="bold" mb={1}>
                  Assigned Movers:
                </Typography>
                {data?.pickupMoversAssigned.map((mover, index) => <MoverInfo key={index} mover={mover} />)}
              </Box>
            )}
          </>
        </InfoSection>

        {/* Delivery Information */}
        <InfoSection title="Delivery Details">
          <>
            <InfoRow label="Date & Time" value={formatDateCell(data?.deliveryDateTime ?? '')} />
            <InfoRow label="Address" value={data?.deliveryAddress} />
            <InfoRow label="Address Size" value={<Chip label={data?.deliveryAddressSize} size="small" />} />
            <InfoRow label="Trucks Count" value={data?.deliveryTrucksCount} />

            {data?.deliveryMoversAssigned && data?.deliveryMoversAssigned?.length > 0 ? (
              <Box mt={2}>
                <Typography variant="body2" fontWeight="bold" mb={1}>
                  Assigned Movers:
                </Typography>
                {data?.deliveryMoversAssigned.map((mover, index) => <MoverInfo key={index} mover={mover} />)}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" mt={1}>
                No movers assigned for delivery yet
              </Typography>
            )}
          </>
        </InfoSection>

        {/* Crew & Logistics */}
        <InfoSection title="Crew & Logistics">
          <>
            <InfoRow label="Meeting Time" value={formatDateCell(data?.meetingUpDateTime ?? '')} />
            <InfoRow label="Crew Arrival" value={formatDateCell(data?.crewArrivalDateTime ?? '')} />
            <InfoRow label="Crew Arrival Address" value={data?.crewArrivalAddress} />
            <InfoRow label="Truck Location" value={data?.truckAddress} />
          </>
        </InfoSection>

        {/* Inventory */}
        {data?.inventoryList && data?.inventoryList.length > 0 && (
          <InfoSection title="Inventory">
            <Box display="flex" flexWrap="wrap" gap={1}>
              {data?.inventoryList.map((item, index) => <Chip key={index} label={item} variant="outlined" />)}
            </Box>
          </InfoSection>
        )}

        {/* Notes & Comments */}
        {(data?.notes && data?.notes.length > 0) ||
          (data?.clientComments && data?.clientComments.length > 0 && (
            <InfoSection title="Notes & Comments">
              <>
                {data?.notes.length > 0 && (
                  <Box mb={2}>
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                      Internal Notes:
                    </Typography>
                    <List dense>
                      {data?.notes.map((note, index) => (
                        <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                          <ListItemText primary={note} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {data?.clientComments.length > 0 && (
                  <Box>
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                      Client Comments:
                    </Typography>
                    <List dense>
                      {data?.clientComments.map((comment, index) => (
                        <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                          <ListItemText primary={comment} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </>
            </InfoSection>
          ))}
      </Box>
    </AppPopUp>
  );
}

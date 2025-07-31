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

      {!isLoading && !data && !error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No event data available.
          </Typography>
        </Box>
      )}

      {data && (
        <Box className={classes['wrapper']}>
          {/* Service Overview */}
          <InfoSection title="Service Overview">
            <>
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12, sm: 6 }}>
                  <InfoRow label="Service ID" value={data?._id} />
                </Grid>
                <Grid sx={{ xs: 12, sm: 6 }}>
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

              {/* Client Details - New Section */}
              {data?.clientInfo && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    backgroundColor: 'grey.50',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                      <InfoRow label="Client ID" value={data.clientInfo._id} />
                      <InfoRow label="First Name" value={data.clientInfo.firstName} />
                      <InfoRow label="Last Name" value={data.clientInfo.lastName} />
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                      <InfoRow label="Email" value={data.clientInfo.email} />
                      <InfoRow label="Phone Number" value={data.clientInfo.phoneNumber} />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          </InfoSection>

          {/* Pickup Information */}
          <InfoSection title="Pickup Details">
            <>
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12, sm: 6 }}>
                  <InfoRow label="Date & Time" value={formatDateCell(data?.pickupDateTime ?? '')} />
                  <InfoRow label="Address" value={data?.pickupAddress} />
                  <InfoRow label="Address Size" value={<Chip label={data?.pickupAddressSize} size="small" />} />
                  <InfoRow label="Trucks Count" value={data?.pickupTrucksCount} />
                </Grid>
              </Grid>

              {data?.pickupMoversAssigned && data?.pickupMoversAssigned?.length > 0 && (
                <Box>
                  <Typography variant="body2" fontWeight="bold" mb={1}>
                    Assigned Movers:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {data?.pickupMoversAssigned.map((mover, index) => <MoverInfo key={index} mover={mover} />)}
                  </Box>
                </Box>
              )}
            </>
          </InfoSection>

          {/* Delivery Information */}
          <InfoSection title="Delivery Details">
            <>
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12, sm: 6 }}>
                  <InfoRow label="Date & Time" value={formatDateCell(data?.deliveryDateTime ?? '')} />
                  <InfoRow label="Address" value={data?.deliveryAddress} />
                  <InfoRow label="Address Size" value={<Chip label={data?.deliveryAddressSize} size="small" />} />
                  <InfoRow label="Trucks Count" value={data?.deliveryTrucksCount} />
                </Grid>
              </Grid>

              {data?.deliveryMoversAssigned && data?.deliveryMoversAssigned?.length > 0 ? (
                <Box mt={2}>
                  <Typography variant="body2" fontWeight="bold" mb={1}>
                    Assigned Movers:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {data?.deliveryMoversAssigned.map((mover, index) => <MoverInfo key={index} mover={mover} />)}
                  </Box>
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
            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Meeting Time" value={formatDateCell(data?.meetingUpDateTime ?? '')} />
                <InfoRow label="Crew Arrival" value={formatDateCell(data?.crewArrivalDateTime ?? '')} />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Crew Arrival Address" value={data?.crewArrivalAddress} />
                <InfoRow label="Truck Location" value={data?.truckAddress} />
              </Grid>
            </Grid>
          </InfoSection>

          {/* Inventory */}
          {data?.inventoryList && data?.inventoryList.length > 0 && (
            <InfoSection title="Inventory">
              <Box display="flex" flexWrap="wrap" gap={1}>
                {data?.inventoryList.map((item, index) => (
                  <Chip key={index} label={item} variant="outlined" size="small" />
                ))}
              </Box>
            </InfoSection>
          )}

          {/* Notes & Comments */}
          {((data?.notes && data?.notes.length > 0) || (data?.clientComments && data?.clientComments.length > 0)) && (
            <InfoSection title="Notes & Comments">
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12 }}>
                  {data?.notes && data.notes.length > 0 && (
                    <Box mb={2}>
                      <Typography variant="body2" fontWeight="bold" mb={1}>
                        Internal Notes:
                      </Typography>
                      <List dense>
                        {data.notes.map((note, index) => (
                          <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                            <ListItemText
                              primary={note}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.primary',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {data?.clientComments && data.clientComments.length > 0 && (
                    <Box>
                      <Typography variant="body2" fontWeight="bold" mb={1}>
                        Client Comments:
                      </Typography>
                      <List dense>
                        {data.clientComments.map((comment, index) => (
                          <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                            <ListItemText
                              primary={comment}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.primary',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </InfoSection>
          )}
        </Box>
      )}
    </AppPopUp>
  );
}

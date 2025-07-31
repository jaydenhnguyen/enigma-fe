import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { formatDateCell } from 'src/shared/util';
import { useGetClientDetail } from 'src/modules/Clients';
import { notify, ToastType } from '../NotifyToast';
import { HiredStatusChip } from '../HiredStatusChip';
import { ClientStatusChip } from '../ClientStatusChip';
import { UserActiveStatusChip } from '../UserActiveStatusChip';
import { AppPopUp, InfoRow, InfoSection } from '../@common';
import classes from './ClientDetailPopup.module.scss';

type Props = {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  title?: string;
};

export function ClientDetailPopup({ title, clientId, isOpen, onClose }: Props): React.ReactElement {
  const { data: clientDetail, isLoading, error, refetch, isFetching } = useGetClientDetail(clientId);

  React.useEffect(() => {
    if (!clientId?.trim()) return;
    refetch().then();
  }, [clientId]);

  React.useEffect(() => {
    if (!!error) {
      notify({ message: 'Can not get client details', type: ToastType.error });
      onClose();
    }
  }, [error, onClose]);

  return (
    <AppPopUp isOpen={isOpen} onClose={onClose} title={title ?? 'Client Details'}>
      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !clientDetail && !error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No client data available.
          </Typography>
        </Box>
      )}

      {clientDetail && (
        <Box className={classes['wrapper']}>
          {/* Personal Information */}
          <InfoSection title="Personal Information">
            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Client ID" value={clientDetail?._id} />
                <InfoRow label="First Name" value={clientDetail?.firstName} />
                <InfoRow label="Last Name" value={clientDetail?.lastName} />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Email" value={clientDetail?.email} />
                <InfoRow label="Phone Number" value={clientDetail?.phoneNumber} />
              </Grid>
            </Grid>
          </InfoSection>

          {/* Status & Hiring Information */}
          <InfoSection title="Status & Hiring">
            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Hired Status" value={<HiredStatusChip isHired={clientDetail?.hiredUs} />} />
                <InfoRow label="Current Status" value={<ClientStatusChip status={clientDetail?.currentStatus} />} />
              </Grid>
            </Grid>
          </InfoSection>

          {/* Move Dates */}
          {clientDetail?.moveDates && clientDetail.moveDates.length > 0 && (
            <InfoSection title="Move Dates">
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12 }}>
                  {clientDetail.moveDates.map((date, index) => (
                    <InfoRow key={index} label={`Move Date ${index + 1}`} value={formatDateCell(date)} />
                  ))}
                </Grid>
              </Grid>
            </InfoSection>
          )}

          {/* Assigned Users */}
          {clientDetail?.assignee && clientDetail.assignee.length > 0 && (
            <InfoSection title="Assigned Team Members">
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12 }}>
                  {clientDetail.assignee.map((user, index) => (
                    <InfoRow
                      key={user._id}
                      label={`Assignee ${index + 1}`}
                      value={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">
                            {user.firstName} {user.lastName}
                          </Typography>
                          <UserActiveStatusChip isActivated={user.isActivated} />
                        </Box>
                      }
                    />
                  ))}
                </Grid>
              </Grid>
            </InfoSection>
          )}

          {/* UTM Information */}
          {clientDetail?.utm &&
            Object.keys(clientDetail.utm).some((key) => clientDetail.utm[key as keyof typeof clientDetail.utm]) && (
              <InfoSection title="Marketing Attribution">
                <Grid container spacing={2}>
                  <Grid sx={{ xs: 12, sm: 6 }}>
                    {clientDetail.utm.utm_source && <InfoRow label="UTM Source" value={clientDetail.utm.utm_source} />}
                    {clientDetail.utm.utm_medium && <InfoRow label="UTM Medium" value={clientDetail.utm.utm_medium} />}
                    {clientDetail.utm.utm_campaign && (
                      <InfoRow label="UTM Campaign" value={clientDetail.utm.utm_campaign} />
                    )}
                  </Grid>

                  <Grid sx={{ xs: 12, sm: 6 }}>
                    {clientDetail.utm.utm_term && <InfoRow label="UTM Term" value={clientDetail.utm.utm_term} />}
                    {clientDetail.utm.utm_content && (
                      <InfoRow label="UTM Content" value={clientDetail.utm.utm_content} />
                    )}
                  </Grid>
                </Grid>
              </InfoSection>
            )}

          {/* Status History */}
          {clientDetail?.statusHistory && !isEmpty(clientDetail.statusHistory) && (
            <InfoSection title="Status History">
              <Grid container spacing={2}>
                <Grid sx={{ xs: 12, width: '100%' }}>
                  {clientDetail.statusHistory.map((history, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: index < clientDetail.statusHistory.length - 1 ? 3 : 0,
                        pb: index < clientDetail.statusHistory.length - 1 ? 2 : 0,
                        borderBottom: index < clientDetail.statusHistory.length - 1 ? '1px solid #e0e0e0' : 'none',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Status Change {index + 1}
                      </Typography>

                      <InfoRow label="Status" value={history.modifiedToStatus} />

                      <InfoRow label="Date" value={formatDateCell(history.timestamp)} />

                      {history.modifiedBy && (
                        <InfoRow
                          label="Modified By"
                          value={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">
                                {history.modifiedBy.firstName} {history.modifiedBy.lastName}
                              </Typography>

                              <UserActiveStatusChip isActivated={history.modifiedBy.isActivated} size="small" />
                            </Box>
                          }
                        />
                      )}
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </InfoSection>
          )}
        </Box>
      )}
    </AppPopUp>
  );
}

import * as React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { formatDateCell } from 'src/shared/util';
import { Role, useGetUserDetail } from 'src/modules/Users';
import { AppPopUp, InfoRow, InfoSection } from '../@common';
import { UserRoleChips } from '../UserRoleChip';
import { notify, ToastType } from '../NotifyToast';
import { DrivingLicenseChip } from '../DrivingLicenseChip';
import { UserActiveStatusChip } from '../UserActiveStatusChip';
import classes from './UserDetailPopup.module.scss';

type Props = {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
  title?: string;
};

export function UserDetailPopup({ title, userId, isOpen, onClose }: Props): React.ReactElement {
  const { data: userDetail, isLoading, error, refetch, isFetching } = useGetUserDetail(userId);

  React.useEffect(() => {
    if (!userId?.trim()) return;
    refetch().then();
  }, [userId]);

  React.useEffect(() => {
    if (!!error) {
      notify({ message: 'Can not get user details', type: ToastType.error });
      onClose();
    }
  }, [error, onClose]);

  return (
    <AppPopUp isOpen={isOpen} onClose={onClose} title={title ?? 'User Details'}>
      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !userDetail && !error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No user data available.
          </Typography>
        </Box>
      )}

      {userDetail && (
        <Box className={classes['wrapper']}>
          {/* Apply margin-bottom to InfoSections */}
          {/* Basic Information */}
          <InfoSection title="Personal Information">
            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="User ID" value={userDetail?._id} />
                <InfoRow label="First Name" value={userDetail?.firstName} />
                <InfoRow label="Last Name" value={userDetail?.lastName} />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Email" value={userDetail?.email} />
                <InfoRow label="Phone Number" value={userDetail?.phoneNumber} />
                <InfoRow label="Date of Birth" value={formatDateCell(userDetail?.dob)} />
              </Grid>
            </Grid>
          </InfoSection>

          {/* Status & Roles */}

          <InfoSection title="Status & Access">
            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <InfoRow label="Active Status" value={<UserActiveStatusChip isActive={userDetail?.isActive} />} />
                <InfoRow
                  label="Driving License"
                  value={<DrivingLicenseChip licenseType={userDetail?.drivingLicenseType} />}
                />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                {userDetail.roles.map((role: Role) => (
                  <InfoRow label="Roles" value={<UserRoleChips role={role.roleName} />} />
                ))}
              </Grid>
            </Grid>
          </InfoSection>
        </Box>
      )}
    </AppPopUp>
  );
}

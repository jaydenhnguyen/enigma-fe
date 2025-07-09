import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import classes from './Profile.module.scss';

type Props = {};

export function Profile({}: Props): React.ReactElement {
  const [formData, setFormData] = React.useState({
    firstName: 'Dmytro',
    lastName: 'Litvinov',
    email: 'dima@azmv.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2002-05-15',
    address: '123 Main Street',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'MXX 2YY',
    country: 'Canada',
    department: 'Delivery',
    position: 'Driver',
    employeeId: 'EMP001',
    startDate: '2020-01-15',
    licenseType: 'Full G',
    licenseNumber: 'G123456789',
    status: 'Active',
    emergencyContact: 'Jayden Ng',
    emergencyPhone: '+1 (123) 456-7890',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // const handleSelectChange = (field: string) => (event: any) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: event.target.value,
  //   }));
  // };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    // Implement save logic here
  };

  return (
    <Box className={classes['container']}>
      <Card className={classes['profileCard']}>
        <CardHeader
          avatar={<Avatar className={classes['avatar']}>DL</Avatar>}
          title={
            <Typography variant="h4" className={classes['title']}>
              My Profile
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              Manage your personal information and account settings
            </Typography>
          }
        />

        <CardContent>
          <form className={classes['form']}>
            {/* Personal Information Section */}
            <Typography variant="h6" className={classes['sectionTitle']}>
              Personal Information
            </Typography>

            <Grid container spacing={3} className={classes['section']}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  disabled
                  className={classes['disabledField']}
                  helperText="Contact admin to change email"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange('dateOfBirth')}
                  className={classes['textField']}
                />
              </Grid>
            </Grid>

            <Divider className={classes['divider']} />

            {/* Address Information Section */}
            <Typography variant="h6" className={classes['sectionTitle']}>
              Address Information
            </Typography>

            <Grid container spacing={3} className={classes['section']}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={formData.state}
                  onChange={handleInputChange('state')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  value={formData.zipCode}
                  onChange={handleInputChange('zipCode')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange('country')}
                  className={classes['textField']}
                />
              </Grid>
            </Grid>

            <Divider className={classes['divider']} />

            {/* Employment Information Section */}
            <Typography variant="h6" className={classes['sectionTitle']}>
              Employment Information
            </Typography>

            <Grid container spacing={3} className={classes['section']}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  value={formData.employeeId}
                  disabled
                  className={classes['disabledField']}
                  helperText="Assigned by HR"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Department"
                  value={formData.department}
                  disabled
                  className={classes['disabledField']}
                  helperText="Contact HR to change department"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Position"
                  value={formData.position}
                  disabled
                  className={classes['disabledField']}
                  helperText="Contact HR to change position"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  disabled
                  className={classes['disabledField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth className={classes['selectField']}>
                  <InputLabel>Status</InputLabel>
                  <Select value={formData.status} label="Status" disabled>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="On Leave">On Leave</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" className={classes['helperText']}>
                  Contact admin to change status
                </Typography>
              </Grid>
            </Grid>

            <Divider className={classes['divider']} />

            {/* License Information Section */}
            <Typography variant="h6" className={classes['sectionTitle']}>
              License Information
            </Typography>

            <Grid container spacing={3} className={classes['section']}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth className={classes['selectField']}>
                  <InputLabel>License Type</InputLabel>
                  <Select value={formData.licenseType} label="License Type" disabled>
                    <MenuItem value="Full G">Full G</MenuItem>
                    <MenuItem value="G1">G1</MenuItem>
                    <MenuItem value="G2">G2</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" className={classes['helperText']}>
                  Contact admin to update license
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="License Number"
                  value={formData.licenseNumber}
                  disabled
                  className={classes['disabledField']}
                  helperText="Contact admin to update license number"
                />
              </Grid>
            </Grid>

            <Divider className={classes['divider']} />

            {/* Emergency Contact Section */}
            <Typography variant="h6" className={classes['sectionTitle']}>
              Emergency Contact
            </Typography>

            <Grid container spacing={3} className={classes['section']}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Emergency Contact Name"
                  value={formData.emergencyContact}
                  onChange={handleInputChange('emergencyContact')}
                  className={classes['textField']}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Emergency Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange('emergencyPhone')}
                  className={classes['textField']}
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box className={classes['actionButtons']}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                className={classes['saveButton']}
                size="large"
                disabled
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

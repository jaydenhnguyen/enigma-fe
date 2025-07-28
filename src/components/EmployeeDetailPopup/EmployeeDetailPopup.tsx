import * as React from 'react';
import { AppPopUp } from '../@common';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField } from '@mui/material';

export type Employee = {
  id: string;
  name: string;
  email: string;
  licenseType: string;
  status: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedEmployee: Employee;
};

const licenseTypes = ['Full G', 'G1', 'G2'];
const statusOptions = ['Active', 'In active'];

export function EmployeeDetailPopup({ isOpen, onClose, onSave, selectedEmployee }: Props): React.ReactElement {
  const [formData, setFormData] = React.useState<Employee>({
    id: 'EMP-001',
    name: 'Name 1',
    email: 'Dummy Email',
    licenseType: 'Full G',
    status: 'Active',
  });

  React.useEffect(() => {
    if (selectedEmployee) setFormData(selectedEmployee);
  }, [selectedEmployee]);

  const handleInputChange = (field: keyof Employee) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = {
      ...formData,
      [field]: event.target.value,
    };
    setFormData(updatedData);
  };

  const handleSelectChange = (field: keyof Employee) => (event: SelectChangeEvent) => {
    const updatedData = {
      ...formData,
      [field]: event.target.value,
    };
    setFormData(updatedData);
  };

  return (
    <AppPopUp isOpen={isOpen} onClose={onClose} onSave={onSave} title={'Employee Detail'}>
      <Box sx={{ mt: 2 }}>
        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={handleInputChange('email')}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
                borderWidth: 2,
              },
            },
          }}
          InputLabelProps={{
            sx: { color: '#1976d2', fontSize: '0.9rem', fontWeight: 500 },
          }}
        />

        {/* License Type and Status Row */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ color: '#1976d2', fontSize: '0.9rem', fontWeight: 500 }}>License type</InputLabel>
              <Select value={formData.licenseType} onChange={handleSelectChange('licenseType')} label="License type">
                {licenseTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ color: '#1976d2', fontSize: '0.9rem', fontWeight: 500 }}>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={handleSelectChange('status')}
                label="Status"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                }}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </AppPopUp>
  );
}

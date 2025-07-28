import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import classes from '../styles/CustomerJourney.module.scss';

interface CustomerJourneyProps {
  currentStatus: string;
  onStatusChange: (newStatus: string, previousStatus: string) => Promise<void>;
  loading: boolean;
}

const STATUS_OPTIONS = [
  { value: 'New', label: 'Mark as New' },
  { value: 'Contacted - No Answer', label: 'Mark as Contacted - No Answer' },
  { value: 'Contacted - Nurturing', label: 'Mark as Contacted - Nurturing' },
  { value: 'Contacted - Refused', label: 'Mark as Contacted - Refused' },
  { value: 'Qualified', label: 'Mark as Qualified' },
  { value: 'Converted', label: 'Mark as Converted' },
  { value: 'Lost', label: 'Mark as Lost' },
  { value: 'Complete', label: 'Mark as Complete' }
];

export const CustomerJourney: React.FC<CustomerJourneyProps> = ({
  currentStatus,
  onStatusChange,
  loading
}) => {
  const handleStatusChange = async (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    if (newStatus !== currentStatus) {
      await onStatusChange(newStatus, currentStatus);
    }
  };

  return (
    <div className={classes['journey-container']}>
      <h3 className={classes['journey-title']}>Customer Journey</h3>
      <div className={classes['current-status']}>
        <span className={classes['status-label']}>Current Status:</span>
        <span className={classes['status-value']}>{currentStatus || 'New'}</span>
      </div>
      
      <FormControl className={classes['status-selector']} disabled={loading}>
        <Select
          value={currentStatus || 'New'}
          onChange={handleStatusChange}
          displayEmpty
          className={classes['select-input']}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {loading && <CircularProgress size={20} className={classes['loading-spinner']} />}
      </FormControl>
    </div>
  );
};
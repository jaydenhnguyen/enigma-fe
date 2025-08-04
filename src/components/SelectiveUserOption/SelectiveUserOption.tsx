import * as React from 'react';
import { ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import classes from './SelectiveUserOption.module.scss';

type Props = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  showDivider?: boolean;
  props: React.HTMLAttributes<HTMLLIElement>;
};

export function SelectiveUserOption({
  firstName,
  lastName,
  email,
  phoneNumber,
  showDivider,
  props,
}: Props): React.ReactElement {
  return (
    <>
      <ListItem {...props} className={classes['wrapper']}>
        <ListItemText
          primary={
            <Typography className={classes['full-name-text']}>
              {firstName} {lastName}
            </Typography>
          }
          secondary={
            <Box className={classes['contact-info-wrapper']}>
              {email && (
                <Box className={classes['contact-item']}>
                  <MailIcon fontSize="small" className={classes['contact-icon']} />
                  <Typography>{email}</Typography>
                </Box>
              )}

              {phoneNumber && (
                <Box className={classes['contact-item']}>
                  <PhoneIcon fontSize="small" className={classes['contact-icon']} />
                  <Typography>{phoneNumber}</Typography>
                </Box>
              )}
            </Box>
          }
        />
      </ListItem>
      {showDivider && <Divider component="li" />}
    </>
  );
}

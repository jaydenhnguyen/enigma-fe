import * as React from 'react';
import { Alert } from '@mui/material';
import { toast, ToastOptions } from 'react-toastify';
import classes from './NotifyToast.module.scss';

export enum ToastType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

type NotifyProps = {
  message: string;
  type?: ToastType;
} & Omit<ToastOptions, 'type'>;

export const notify = ({ message, type, ...rest }: NotifyProps) => {
  toast(
    <Alert severity={type} variant="filled" sx={{ width: '100%', color: 'white' }}>
      {message}
    </Alert>,

    {
      ...rest,
      className: classes['toast-wrapper'],
    },
  );
};

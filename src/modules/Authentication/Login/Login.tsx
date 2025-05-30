import * as React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ControlTextField } from 'src/components';
import { LOGIN_FORM_FIELDS } from './constants';
import { LoginFormSchema, useLoginForm } from './hooks';
import classes from './Login.module.scss';

type Props = {};

export function Login({}: Props): React.ReactElement {
  const { control, onSubmit } = useLoginForm();

  return (
    <div className={classes['wrapper']}>
      <Card elevation={5} className={classes['login-card']}>
        <CardContent className={classes['login-card-content']}>
          <Typography component="h2" variant="h2" align="center" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={onSubmit} noValidate>
            <Stack spacing={3}>
              <ControlTextField<LoginFormSchema>
                control={control}
                fullWidth
                id="email"
                label="Email"
                name={LOGIN_FORM_FIELDS.email}
                type="email"
                variant="outlined"
              />

              <ControlTextField<LoginFormSchema>
                control={control}
                fullWidth
                id="password"
                name={LOGIN_FORM_FIELDS.password}
                label="Password"
                type="password"
              />

              <Button type="submit" variant="contained" size="large" className={classes['submit-btn']}>
                Sign in
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

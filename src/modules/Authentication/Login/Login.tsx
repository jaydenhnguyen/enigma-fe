import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { tokenManager } from 'src/configs';
import { ControlTextField } from 'src/components';
import { LOGIN_FORM_FIELDS } from './constants';
import { useLoginForm, useLogin } from './hooks';
import { LoginRequest, LoginResponse } from './models';
import classes from './Login.module.scss';

export function Login(): React.ReactElement {
  const { control, formHandleSubmit } = useLoginForm();
  const router = useRouter();

  const handleLoginSuccess = React.useCallback(
    (loginResponse: LoginResponse) => {
      const { accessToken, expireIn } = loginResponse;

      if (!isEmpty(accessToken)) {
        tokenManager.setAccessToken({ accessToken, expireIn });

        const { redirect } = router.query;
        if (redirect) return router.replace(`/${redirect as string}`);
        return router.replace('/home');
      }

      return;
    },
    [router],
  );

  const { mutate: loginMutation, isPending: isLoading, data } = useLogin(handleLoginSuccess);

  const onSubmitLoginForm = React.useCallback((data: LoginRequest) => loginMutation(data), [data]);

  return (
    <div className={classes['wrapper']}>
      <Card elevation={5} className={classes['login-card']}>
        <CardContent className={classes['login-card-content']}>
          <Typography component="h2" variant="h2" align="center" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={formHandleSubmit(onSubmitLoginForm)} noValidate>
            <Stack spacing={3}>
              <ControlTextField<LoginRequest>
                control={control}
                fullWidth
                id="email"
                label="Email"
                name={LOGIN_FORM_FIELDS.email}
                type="email"
                variant="outlined"
              />

              <ControlTextField<LoginRequest>
                control={control}
                fullWidth
                id="password"
                name={LOGIN_FORM_FIELDS.password}
                label="Password"
                type="password"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                className={classes['submit-btn']}
                disabled={isLoading}
                loading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

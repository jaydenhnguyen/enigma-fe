import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { tokenManager } from 'src/configs';
import { APP_ROUTES } from 'src/shared/constants';
import { ControlTextField, notify, ToastType } from 'src/components';
import { useLogin, useLoginForm } from './hooks';
import { LoginRequest, LoginResponse } from './models';
import { LOGIN_FORM_FIELD_NAMES, NOTIFY_MESSAGES } from './constants';
import classes from './Login.module.scss';

export function Login(): React.ReactElement {
  // Custom hook useLoginForm. Manages the form state and validation.
  const { control, formHandleSubmit } = useLoginForm();
  const router = useRouter();

  // The useCallback hook is used for handleLoginSuccess and onSubmitLoginForm to memoize these functions, ensuring they don’t get recreated on every render unless their dependencies (router or data) change.
  const handleLoginSuccess = React.useCallback(
    (loginResponse: LoginResponse) => {
      const { accessToken, expireIn } = loginResponse;

      if (!isEmpty(accessToken)) {
        tokenManager.setAccessToken({ accessToken, expireIn });

        const { redirect } = router.query;
        if (redirect) return router.replace(`/${redirect as string}`);
        return router.replace(APP_ROUTES.CALENDAR_VIEW);
      }

      return;
    },
    [router],
  );

  // useLogin custom hook uses useMutation, used for handling async operations like POST/PUT/DELETE. API request is made in this custom hook.
  const {
    mutate: loginMutation,
    isPending: isLoading,
    data,
  } = useLogin(handleLoginSuccess, () => notify({ message: NOTIFY_MESSAGES.ERROR, type: ToastType.error }));

  // useCallback memoizes a function so it doesn’t get recreated on every render. This will be passed to useLoginForm custom hook.
  const onSubmitLoginForm = React.useCallback((data: LoginRequest) => loginMutation(data), [data]);

  return (
    <div className={classes['wrapper']}>
      <Card elevation={5} className={classes['login-card']}>
        <CardContent className={classes['login-card-content']}>
          <Typography component="h2" variant="h2" align="center" gutterBottom className={classes['title']}>
            Login
          </Typography>
          <Box component="form" onSubmit={formHandleSubmit(onSubmitLoginForm)} noValidate>
            <Stack spacing={3}>
              <ControlTextField<LoginRequest>
                control={control}
                fullWidth
                id="email"
                label="Email"
                name={LOGIN_FORM_FIELD_NAMES.email}
                type="email"
                variant="outlined"
              />

              <ControlTextField<LoginRequest>
                control={control}
                fullWidth
                id="password"
                name={LOGIN_FORM_FIELD_NAMES.password}
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
                Log in
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

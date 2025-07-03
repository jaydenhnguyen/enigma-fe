import * as React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ControlTextField, notify, ToastType } from 'src/components';
import { CreateContactMeRequest } from './models';
import { useCreateContactMe, useCreateContactMeForm } from './hooks';
import classes from './ContactUs.module.scss';
import { EmptyModule } from '../PopUp';
export function ContactUs(): React.ReactElement {
  const { control, formHandleSubmit } = useCreateContactMeForm();

  const handleCreateContactMeSuccess = React.useCallback(() => {
    notify({ message: 'Message sent successfully!', type: ToastType.success });
  }, []);

  const handleCreteContactMeError = React.useCallback(() => {
    notify({ message: 'Something went wrong.', type: ToastType.error });
  }, []);

  const { mutate: createContactMeMutation, isPending: isLoading } = useCreateContactMe(
    handleCreateContactMeSuccess,
    handleCreteContactMeError,
  );

  const onSubmitCreateContactMeForm = React.useCallback(
    (data: CreateContactMeRequest) => createContactMeMutation(data),
    [createContactMeMutation],
  );


  return (
    <div className={classes['wrapper']}>
      <Box className={classes['container']}>
        <Box className={classes['info-section']}>
          <Typography variant="h1" className={classes['title']} gutterBottom>
            Get In Touch
          </Typography>

          <Box className={classes['info-row']}>
            <Box className={classes['info-item']}>
              <strong>Send Message</strong>
              <p>info@azmoving.com</p>
            </Box>

            <Box className={classes['info-item']}>
              <strong>Let's Talk</strong>
              <p>+1 (434) 546 6464</p>
            </Box>
          </Box>

          <Box className={classes['info-row']}>
            <Box className={classes['info-item']}>
              <strong>Our location</strong>
              <p>1750 Finch Ave E, North York, ON M2J 2X5</p>
            </Box>

            <Box className={classes['info-item']}>
              <strong>Business hours</strong>
              <p>
                Mon – Thu: 08:00 – 16:00
                <br />
                Fri: 08:00 – 15:00
              </p>
            </Box>
          </Box>
        </Box>

        {/* Right Form Section */}
        <Card elevation={5} className={classes['contactMe-card']}>
          <CardContent className={classes['contactMe-card-content']}>
            <Typography
              component="h2"
              variant="h3"
              align="center"
              fontWeight="bold"
              gutterBottom
              className={classes['title']}
            >
              Contact Us
            </Typography>

            <Box component="form" onSubmit={formHandleSubmit(onSubmitCreateContactMeForm)} noValidate>
              <Stack spacing={3}>
                <ControlTextField<CreateContactMeRequest>
                  control={control}
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />

                <ControlTextField<CreateContactMeRequest>
                  control={control}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                />

                <ControlTextField<CreateContactMeRequest>
                  control={control}
                  fullWidth
                  id="message"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes['submit-btn']}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

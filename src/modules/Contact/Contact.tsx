import * as React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ControlTextField, notify, ToastType } from 'src/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './Contact.module.scss';
import { useContactForm } from 'src/modules/Contact/useContactForm';
import { contact } from 'src/apis/contact';


type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function Contact(): React.ReactElement {
  const { control, formHandleSubmit } = useContactForm();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await contact(data);
      notify({ message: 'Message sent successfully!', type: ToastType.success });
    } catch (error) {
      notify({ message: 'Something went wrong.', type: ToastType.error });
      console.error(error);
    }
  };

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
              <p>Mon – Thu: 08:00 – 16:00<br />Fri: 08:00 – 15:00</p>
            </Box>
          </Box>

        </Box>

        {/* Right Form Section */}
        <Card elevation={5} className={classes['contact-card']}>
          <CardContent className={classes['contact-card-content']}>
            <Typography component="h2" variant="h3" align="center" fontWeight="bold" gutterBottom className={classes['title']}>
              Contact Us
            </Typography>

            <Box component="form" onSubmit={formHandleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <ControlTextField<ContactFormData> control={control} fullWidth id="name" label="Name" name="name" />
                <ControlTextField<ContactFormData> control={control} fullWidth id="email" label="Email" name="email" type="email" />
                <ControlTextField<ContactFormData> control={control} fullWidth id="message" label="Message" name="message" multiline rows={4} />
                <Button type="submit" variant="contained" size="large" className={classes['submit-btn']}>
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

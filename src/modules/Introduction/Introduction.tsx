import * as React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { APP_ROUTES } from 'src/shared/constants';
import DresserIcon from 'src/assets/dresser.svg';
import LeafImage from 'src/assets/hero_leaf_1.svg';
import ArmChairIcon from 'src/assets/armchair.svg';
import BookCaseIcon from 'src/assets/bookcase.svg';
import IntroCoverImage from 'src/assets/intro-cover.webp';
import { INTRO_CONTENTS } from './constants';
import classes from './Introduction.module.scss';

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
  },
};

const bouncing = {
  initial: { y: 0 },
  animate: { y: [-5, 0, -5] },
};

export function Introduction(): React.ReactElement {
  const router = useRouter();

  return (
    <Box className={classes['wrapper']}>
      <Box className={classes['container']}>
        <Box className={classes['left-side-wrapper']}>
          <Typography variant="h1" className={classes['title']}>
            A-Z Moving
          </Typography>

          <List>
            {INTRO_CONTENTS.map((item: string) => (
              <ListItem className={classes['description-item']}>
                <ListItemAvatar className={classes['description-icon']}>
                  <CheckCircleOutlineIcon />
                </ListItemAvatar>
                
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
            <Button
              variant="contained"
              size="large"
              className={classes['login-btn']}
              onClick={() => router.push(APP_ROUTES.LOGIN)}
            >
              <p style={{ fontSize: '1rem' }}>Log In</p>
            </Button>
          </Box>
        </Box>

        <Box className={classes['right-side-wrapper']}>
          <Image src={IntroCoverImage} alt="cover-image" className={classes['cover-image']} />

          <div className={classNames(classes['leaft-cover'], classes['leaft-image-1'])}>
            <Image src={LeafImage} alt="canada-leaft" />
          </div>

          <div className={classNames(classes['leaft-cover'], classes['leaft-image-2'])}>
            <Image src={LeafImage} alt="canada-leaft" />
          </div>

          <m.div
            className={classNames(classes['floating-icon'], classes['armchair-icon'])}
            variants={bouncing}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            initial="initial"
            animate="animate"
          >
            <Image src={ArmChairIcon} alt="armchair" width={75} />
          </m.div>

          <m.div
            className={classNames(classes['floating-icon'], classes['bookcase-icon'])}
            variants={floatVariants}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            initial="initial"
            animate="animate"
          >
            <Image src={BookCaseIcon} alt="bookcase" width={75} />
          </m.div>

          <m.div
            className={classNames(classes['floating-icon'], classes['dresser-icon'])}
            variants={bouncing}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            initial="initial"
            animate="animate"
          >
            <Image src={DresserIcon} alt="dresser" width={75} />
          </m.div>
        </Box>
      </Box>
    </Box>
  );
}

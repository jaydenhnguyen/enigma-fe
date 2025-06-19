import * as React from 'react';
import { motion as m } from 'framer-motion';
import { Box, Typography, Card, CardContent } from '@mui/material';
import classes from './AboutUs.module.scss';
import classNames from 'classnames';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ABOUT_CARDS = [
  {
    title: 'Our Mission',
    description: 'To design and develop a reliable website that meets the requirements of A-Z moving corporate.',
    variant: 'white' as const,
  },
  {
    title: 'Our Progress',
    description: 'We analyze, build, debug, and repeat until it works perfectly.',
    variant: 'blue' as const,
  },
  {
    title: 'Our Vibe',
    description: 'One team that actually enjoys working together.',
    variant: 'blue' as const,
  },
  {
    title: 'Our Goal',
    description: 'To improve our skills, challenge ourselves, and deliver something we are proud of.',
    variant: 'white' as const,
  },
];

type Props = {};

export function AboutUs({}: Props): React.ReactElement {
  return (
    <Box className={classes['wrapper']}>
      <Box className={classes['container']}>
        <Box className={classes['top-section']}>
          <Typography variant="h1" className={classes['title']}>
            About Us
          </Typography>

          <Typography variant="body1" className={classes['description']}>
            We are a team of 4 software developers who believe that great projects are built with collaboration,
            coordination and caffeine.
            <br />
            We worked together through every phase, from planning and analyzing the software product to debugging
            mysterious errors.
            <br />
            Each of us brought something unique to this system, and every decision, design, and piece of code was a team
            effort.
          </Typography>
        </Box>

        <m.div className={classes['bottom-section']} variants={containerVariants} initial="initial" animate="animate">
          {ABOUT_CARDS.map((card, index) => (
            <m.div
              key={index}
              variants={cardVariants}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
            >
              <Card className={classNames(classes['card'], classes[card.variant])}>
                <CardContent>
                  <Typography variant="h6" component="h3" className={classes['card-title']}>
                    {card.title}
                  </Typography>

                  <Typography variant="body2" className={classes['card-description']}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </m.div>
      </Box>
    </Box>
  );
}

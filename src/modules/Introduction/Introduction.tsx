import * as React from 'react';
import classes from './Introduction.module.scss';

type Props = {};

export function Introduction({}: Props): React.ReactElement {
  return <div className={classes['wrapper']}>this is introduction page</div>;
}

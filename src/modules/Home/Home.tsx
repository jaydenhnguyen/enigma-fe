import * as React from 'react';
import classes from './Home.module.scss';

export function Home(): React.ReactElement {
  return (
    <div className={classes['wrapper']}>
      <p>This is the home page</p>
    </div>
  );
}

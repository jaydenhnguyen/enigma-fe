import * as React from 'react';
import { AppBar, AppBarProps, Toolbar, ToolbarProps } from '@mui/material';
import classNames from 'classnames';
import classes from './TopBar.module.scss';

type Props = {
  children: React.ReactNode;
  customClasses?: {
    wrapper?: string;
    container?: string;
  };
  appBarProps?: AppBarProps;
  toolbarProps?: ToolbarProps;
};

export function TopBar({ children, customClasses, appBarProps, toolbarProps }: Props): React.ReactElement {
  return (
    <AppBar
      color="default"
      sx={{
        minHeight: '4.125rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06)',
        zIndex: 1200,
      }}
      className={classNames(customClasses?.wrapper)}
      {...appBarProps}
    >
      <Toolbar className={classNames(classes['toolbar-wrapper'], customClasses?.container)} {...toolbarProps}>
        {children}
      </Toolbar>
    </AppBar>
  );
}

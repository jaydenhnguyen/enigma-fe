import * as React from 'react';
import classNames from 'classnames';
import { ListItem } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MenuItem } from 'src/shared/types';
import classes from './SideMenuItem.module.scss';

type Props = {
  item: MenuItem;
  isSelected: boolean;
  isCollapsed: boolean;
  onClick: (item: MenuItem) => void;
};

export function SideMenuItem({ item, isSelected, isCollapsed, onClick }: Props): React.ReactElement {
  const Icon = React.useMemo(() => item.icon, []);
  return (
    <ListItem disablePadding>
      <ListItemButton
        className={classNames(
          classes['wrapper'],
          isCollapsed && classes['collapsed'],
          isSelected && classes['selected'],
        )}
        onClick={() => onClick(item)}
        title={isCollapsed ? item.text : ''}
      >
        <ListItemIcon
          sx={{
            color: 'inherit',
            minWidth: 20,
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 20 }} />
        </ListItemIcon>

        <ListItemText
          primary={item.text}
          className={classNames(
            classes['item-text'],
            isSelected && classes['selected-text'],
            isCollapsed && classes['collapsed-text'],
          )}
        />
      </ListItemButton>
    </ListItem>
  );
}

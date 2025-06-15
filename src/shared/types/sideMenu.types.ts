import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { APP_ROUTES, SIDE_MENU_NAME } from '../constants';

type SideMenuName = (typeof SIDE_MENU_NAME)[keyof typeof SIDE_MENU_NAME];
type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export type MenuItem = {
  text: SideMenuName;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  route: AppRoute;
};

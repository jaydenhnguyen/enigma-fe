import { ColorSystemOptions } from '@mui/material/styles';
import { themeConfig } from './@config';
import { ThemeColorScheme } from '../types';

export const palette: Partial<Record<ThemeColorScheme, ColorSystemOptions['palette']>> = {
  light: {
    ...themeConfig.palette,
    text: {
      primary: themeConfig.palette.grey[800],
      secondary: themeConfig.palette.grey[600],
      disabled: themeConfig.palette.grey[500],
    },
    background: {
      paper: '#FFFFFF',
      default: themeConfig.palette.grey[100],
    },
    action: {
      active: themeConfig.palette.grey[600],
    },
  },
};

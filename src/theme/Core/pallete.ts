import { ColorSystemOptions } from '@mui/material/styles';
import { themeConfig } from './@config';
import { ThemeColorScheme } from '../types';

export const palette: Partial<Record<ThemeColorScheme, ColorSystemOptions['palette']>> = {
  light: {
    ...themeConfig.palette,
    text: {
      primary: '#1B1B1B',
      secondary: '#5C5F62',
      disabled: '#9E9E9E',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
    action: {
      active: '#1B1B1B',
    },
  },
};

import { ColorSystemOptions } from '@mui/material/styles';
import { ThemeColorScheme } from 'src/shared/types';
import { themeConfig } from './@config';

export const palette: Partial<Record<ThemeColorScheme, ColorSystemOptions['palette']>> = {
  light: {
    ...themeConfig.palette,
    text: themeConfig.darkText,
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
    action: {
      active: '#1B1B1B',
    },
  },
};

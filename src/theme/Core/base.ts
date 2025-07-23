import { ThemeOptions } from 'src/shared/types';
import { palette } from './pallete';
import { themeConfig } from './@config';
import { typography } from './typography';

export const base: ThemeOptions = {
  colorSchemes: {
    light: { palette: palette.light },
  },
  typography,
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          '&.Mui-disabled': {
            color: themeConfig.palette.grey['500'],
          },
        },
      },
    },
  },
};

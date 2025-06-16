import { ThemeOptions } from 'src/shared/types';
import { palette } from './pallete';
import { typography } from './typography';

export const base: ThemeOptions = {
  colorSchemes: {
    light: { palette: palette.light },
  },
  typography,
  shape: { borderRadius: 8 },
};

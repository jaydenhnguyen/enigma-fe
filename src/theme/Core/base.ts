import { palette } from './pallete';
import { ThemeOptions } from '../types';
import { typography } from './typography';

export const base: ThemeOptions = {
  colorSchemes: {
    light: { palette: palette.light },
  },
  typography,
  shape: { borderRadius: 8 },
};

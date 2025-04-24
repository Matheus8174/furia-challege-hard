import type { Theme } from '@react-navigation/native';

import { DefaultTheme } from '@react-navigation/native';

import colors from '@/components/ui/colors';

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.black[600],
    primary: colors.white[100],
    card: colors.black[100],
    text: colors.white[100]
  }
};

export function useThemeConfig() {
  return DarkTheme;
}

import '@/global.css';

import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';

import { useThemeConfig } from '@/lib/use-theme-config';

export const unstable_settings = {
  initialRouteName: '(tabs)'
};

export { ErrorBoundary } from 'expo-router';

function RootLayout() {
  const theme = useThemeConfig();

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen />
      </Stack>
    </ThemeProvider>
  );
}

export default RootLayout;

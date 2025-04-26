import '@/global.css';

import 'react-native-reanimated';

import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { useThemeConfig } from '@/lib/use-theme-config';
import colors from '@/components/ui/colors';

export const unstable_settings = {
  initialRouteName: '(tabs)'
};

export { ErrorBoundary } from 'expo-router';

function RootLayout() {
  const theme = useThemeConfig();

  return (
    <View className="flex-1 bg-black-600">
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'light',
              statusBarBackgroundColor: colors.black[600],
              navigationBarColor: colors.black[600]
            }}
          >
            <Stack.Screen name="index" redirect />

            <Stack.Screen name="(register)/personal-data" />

            {/* <Stack.Screen name="register/index" redirect /> */}
          </Stack>
        </ThemeProvider>
      </KeyboardProvider>
    </View>
  );
}

export default RootLayout;

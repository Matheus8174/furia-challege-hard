import '@/global.css';

import 'react-native-reanimated';

import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { useThemeConfig } from '@/lib/use-theme-config';
import colors from '@/components/ui/colors';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: '(tabs)'
};

export { ErrorBoundary } from 'expo-router';

function RootLayout() {
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-black-600">
        <KeyboardProvider>
          <ThemeProvider value={theme}>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarStyle: 'light',
                  statusBarBackgroundColor: colors.black[600],
                  navigationBarColor: colors.black[600]
                }}
              >
                <Stack.Screen name="index" />

                <Stack.Screen name="(register)" />
              </Stack>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </View>
    </GestureHandlerRootView>
  );
}

export default RootLayout;

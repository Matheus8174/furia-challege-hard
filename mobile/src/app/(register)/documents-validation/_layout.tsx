import { Stack } from 'expo-router';

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="confirm-photo-face"
        options={{
          presentation: 'transparentModal'
        }}
      />

      <Stack.Screen
        name="confirm-photo-rg"
        options={{
          presentation: 'transparentModal'
        }}
      />
    </Stack>
  );
}

export default Layout;

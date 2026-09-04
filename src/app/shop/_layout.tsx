import { Stack } from 'expo-router';

export default function ShopLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="marketplace/index" />
      <Stack.Screen name="marketplace/[id]" options={{ headerShown: true, title: '' }} />
    </Stack>
  );
}
import { Tabs } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TAB_CONFIG = [
  { name: 'index', label: 'Home', icon: 'home-outline' as const, iconActive: 'home' as const, enabled: true },
  { name: 'shop', label: 'Shop', icon: 'storefront-outline' as const, iconActive: 'storefront' as const, enabled: true },
  { name: 'emi-dues', label: 'EMI Dues', icon: 'receipt-outline' as const, iconActive: 'receipt' as const, enabled: false },
  { name: 'limit', label: 'Limit', icon: 'trending-up-outline' as const, iconActive: 'trending-up' as const, enabled: false },
  { name: 'profile', label: 'Profile', icon: 'person-outline' as const, iconActive: 'person' as const, enabled: false },
];

function CustomTabBar({ state, navigation }: any) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.wrapper}>
      <View style={styles.floatingBar}>
        {state.routes.map((route: any, index: number) => {
          const config = TAB_CONFIG.find((t) => t.name === route.name);
          if (!config) return null;
          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              disabled={!config.enabled}
              onPress={() => {
                if (config.enabled) navigation.navigate(route.name);
              }}
              style={styles.tabItem}
            >
              {isFocused && <View style={styles.activeUnderline} />}
              <Ionicons
                name={isFocused ? config.iconActive : config.icon}
                size={22}
                color={isFocused ? '#6D28D9' : '#999'}
              />
              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default function AppTabs() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shop" />
      <Tabs.Screen name="emi-dues" />
      <Tabs.Screen name="limit" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  floatingBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 26,
    paddingVertical: 10,
    shadowColor: '#b4abab',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  activeUnderline: {
    position: 'absolute',
    marginTop: 3,
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#6D28D9',
  },
  label: {
    fontSize: 11,
    color: '#999',
  },
  labelActive: {
    color: '#6D28D9',
    fontWeight: '600',
  },
});
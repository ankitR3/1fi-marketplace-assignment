import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Spacing } from '@/constants/theme';
import MarketplaceScreen from './marketplace/index';

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'] as const;
type Tab = typeof TABS[number];

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('Top Brands');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#241278', '#5e1fc5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ NO-COST EMIs</Text>
          </View>
          <View style={styles.bannerRow}>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerTitle}>
                Shop today,{'\n'}
                <Text style={styles.bannerItalic}>Pay later using</Text>{'\n'}
                Mutual funds.
              </Text>
              <Text style={styles.bannerSubtitle}>
                No credit score required. No interest.{'\n'}Backed by your investments.
              </Text>
            </View>
            <View style={styles.illustrationCol}>
              <Text style={styles.illustrationEmoji}>📱💻{'\n'}🚗🏍️{'\n'}🛍️</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.tabSwitcher}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabPill, isActive && styles.tabPillActive]}
            >
              <Text style={isActive ? styles.tabTextActive : styles.tabText}>
                {tab}
              </Text>
              {isActive && <View style={styles.tabUnderline} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#999" />
        <Text style={styles.searchPlaceholder}>
          {activeTab === 'Nearby Stores'
            ? 'Search stores...'
            : activeTab === '1Fi Marketplace'
            ? 'Search products or brands...'
            : 'Search online stores...'}
        </Text>
      </View>

      {activeTab === 'Top Brands' && (
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Top Brands</Text>
        </View>
      )}

      {activeTab === 'Nearby Stores' && (
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Nearby Stores</Text>
          <View style={styles.locationPill}>
            <Text style={styles.locationText}>Gurugram</Text>
            <Ionicons name="chevron-down" size={14} color={BrandColors.primary} />
          </View>
        </View>
      )}

      {activeTab === '1Fi Marketplace' && (
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>1Fi Marketplace</Text>
        </View>
      )}

      {/* Top Brands / Nearby Stores stay simple conditional blanks */}
      <View style={[styles.content, activeTab !== 'Top Brands' && styles.hidden]}>
        <View style={styles.blank} />
      </View>
      <View style={[styles.content, activeTab !== 'Nearby Stores' && styles.hidden]}>
        <View style={styles.blank} />
      </View>

      {/* Marketplace stays MOUNTED — just hidden via style so switching top tabs never refetches */}
      <View style={[styles.content, activeTab !== '1Fi Marketplace' && styles.hidden]}>
        <MarketplaceScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7' },
  banner: {
    paddingTop: Spacing.five + (Spacing.six - Spacing.five) / 2,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    marginBottom: Spacing.two,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  bannerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  bannerTextCol: { flex: 1 },
  illustrationCol: { width: 90, alignItems: 'flex-end' },
  illustrationEmoji: { fontSize: 22, textAlign: 'right', lineHeight: 30 },
  bannerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', lineHeight: 28 },
  bannerItalic: { fontStyle: 'italic', fontWeight: '500', fontSize: 25 },
  bannerSubtitle: { color: 'rgba(255,255,255,0.85)', marginTop: Spacing.one, fontSize: 9 },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: BrandColors.primaryLight,
    borderRadius: 999,
    marginHorizontal: Spacing.three,
    marginTop: -Spacing.four,
    padding: 6,
  },
  tabPill: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    alignItems: 'center',
  },
  tabPillActive: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
    zIndex: 1,
  },
  tabText: { color: '#666', fontSize: 13, fontWeight: '500' },
  tabTextActive: { color: BrandColors.primary, fontWeight: '500', fontSize: 13 },
  tabUnderline: {
    marginTop: 4,
    marginBottom: -3,
    width: 20,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: BrandColors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff',
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    borderRadius: 999,
    paddingVertical: Spacing.two + (Spacing.three - Spacing.two) / 2,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  searchPlaceholder: { color: '#999', fontSize: 13 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
  },
  sectionHeading: { fontSize: 20, fontWeight: '600', color: '#111' },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 0.5,
    borderColor: '#dbd3fe',
    borderRadius: 999,
    backgroundColor: '#fff',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    shadowColor: '#b3b0b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  locationText: { color: BrandColors.primary, fontWeight: '600', fontSize: 13 },
  content: { flex: 1, marginTop: Spacing.three },
  hidden: { display: 'none' },
  blank: { flex: 1 },
});
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Button, View, Text, RefreshControl } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '@/components/ProductCard';
import { ProductListSkeleton } from '@/components/ProductCardSkeleton';
import { fetchProducts, type Product } from '@/data/mockProducts';
import { BrandColors, Spacing } from '@/constants/theme';

interface MarketplaceScreenProps {
  searchQuery?: string;
}

export default function MarketplaceScreen({ searchQuery = '' }: MarketplaceScreenProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProducts();
      setProducts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      console.log('[Marketplace] Pull-to-refresh triggered: refetching products from API...');
      const result = await fetchProducts();
      console.log(`[Marketplace] Refetch complete: ${result.length} products loaded at ${new Date().toLocaleTimeString()}`);
      setProducts([...result]);
    } catch (err) {
      console.warn('[Marketplace] Refetch encountered simulated network error:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const run = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await fetchProducts();
          if (isActive) {
            setProducts(result);
          }
        } catch (err) {
          if (isActive) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      run();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;

    return products.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchCategory = item.category?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchVariants = item.variants?.some(
        (v) =>
          v.label.toLowerCase().includes(q) ||
          v.sku.toLowerCase().includes(q)
      );
      return matchName || matchCategory || matchDesc || matchVariants;
    });
  }, [products, searchQuery]);

  if (loading) {
    return <ProductListSkeleton count={3} />;
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.list,
        filteredProducts.length === 0 && styles.listEmpty,
      ]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[BrandColors.primary]}
          tintColor={BrandColors.primary}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#999" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>
            {searchQuery.trim() ? `No results for "${searchQuery.trim()}"` : 'No products found'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery.trim()
              ? 'Check the spelling or try searching for another product or brand.'
              : 'Pull down to refresh.'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => router.push(`/shop/marketplace/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.three,
    paddingTop: 1,
    paddingBottom: 100,
    backgroundColor: '#F5F5F7',
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  emptyIcon: {
    marginBottom: Spacing.two,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: Spacing.one,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    lineHeight: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#F5F5F7',
  },
  errorText: { color: '#D32F2F', textAlign: 'center' },
});
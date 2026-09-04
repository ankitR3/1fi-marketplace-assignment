import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/ProductCard';
import { fetchProducts, type Product } from '@/data/mockProducts';
import { Spacing } from '@/constants/theme';

export default function MarketplaceScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <Button title="Retry" onPress={loadProducts} />
      </ThemedView>
    );
  }

  if (products.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>No products found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
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
  list: { padding: Spacing.three, gap: Spacing.three },
  row: { gap: Spacing.three },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.two },
  errorText: { color: 'red', textAlign: 'center' },
});
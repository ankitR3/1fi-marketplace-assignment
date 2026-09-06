import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6D28D9" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadProducts} />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
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
  list: { padding: Spacing.three, backgroundColor: '#F5F5F7' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#F5F5F7',
  },
  errorText: { color: '#D32F2F', textAlign: 'center' },
  emptyText: { color: '#666' },
});
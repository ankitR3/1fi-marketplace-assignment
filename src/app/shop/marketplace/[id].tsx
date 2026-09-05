import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Pressable, View, Text, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EMIPlanSelector } from '@/components/EMIPlanSelector';
import { fetchProductById, type Product } from '@/data/mockProducts';
import { BrandColors, Spacing } from '@/constants/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProductById(id);
      setProduct(result);
      if (result) {
        setSelectedVariantId(result.variants[0]?.id ?? null);
        setSelectedPlanId(result.emiPlans[0]?.id ?? null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={BrandColors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={load} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>
        ₹{product.price.toLocaleString('en-IN')}
      </Text>

      <Text style={styles.sectionHeading}>Select Variant</Text>
      <View style={styles.variantRow}>
        {product.variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <Pressable
              key={variant.id}
              onPress={() => setSelectedVariantId(variant.id)}
              style={[styles.variantPill, isSelected && styles.variantPillSelected]}
            >
              <Text style={isSelected ? styles.variantTextSelected : styles.variantText}>
                {variant.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <EMIPlanSelector
        plans={product.emiPlans}
        selectedPlanId={selectedPlanId}
        onSelect={setSelectedPlanId}
      />

      <Pressable
        style={styles.ctaButton}
        onPress={() => {
          Alert.alert(
            'Order Placed',
            `You've selected ${product.variants.find(v => v.id === selectedVariantId)?.label} on a ${product.emiPlans.find(p => p.id === selectedPlanId)?.tenureMonths}-month plan.`
          );
        }}
      >
        <Text style={styles.ctaText}>Proceed with this plan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F7' },
  container: { padding: Spacing.three, gap: Spacing.two, paddingBottom: Spacing.six + 50 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#F5F5F7',
  },
  errorText: { color: '#D32F2F', textAlign: 'center' },
  emptyText: { color: '#666' },
  image: { width: '100%', aspectRatio: 1, borderRadius: Spacing.three },
  title: { fontSize: 24, fontWeight: '800', color: '#111' },
  price: { fontSize: 20, fontWeight: '700', color: BrandColors.primary },
  sectionHeading: { fontSize: 18, fontWeight: '700', color: '#111', marginTop: Spacing.three },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  variantPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  variantPillSelected: {
    borderColor: BrandColors.primary,
    backgroundColor: BrandColors.primaryLight,
  },
  variantText: { color: '#333' },
  variantTextSelected: { color: BrandColors.primary, fontWeight: '600' },
  ctaButton: {
    backgroundColor: BrandColors.primary,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
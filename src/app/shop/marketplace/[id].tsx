import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
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
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <Button title="Retry" onPress={load} />
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Product not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <ThemedText type="title">{product.name}</ThemedText>
      <ThemedText style={styles.price}>
        ₹{product.price.toLocaleString('en-IN')}
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionHeading}>
        Select Variant
      </ThemedText>
      <ThemedView style={styles.variantRow}>
        {product.variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <Pressable
              key={variant.id}
              onPress={() => setSelectedVariantId(variant.id)}
              style={[styles.variantPill, isSelected && styles.variantPillSelected]}
            >
              <ThemedText style={isSelected ? styles.variantTextSelected : undefined}>
                {variant.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>

      <EMIPlanSelector
        plans={product.emiPlans}
        selectedPlanId={selectedPlanId}
        onSelect={setSelectedPlanId}
      />

      <Pressable
        style={styles.ctaButton}
        onPress={() => {
          // TODO: hook this up to whatever "proceed" flow makes sense —
          // e.g. router.push to a confirmation screen, or just an alert for now
        }}
      >
        <ThemedText style={styles.ctaText}>Proceed with this plan</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.three, gap: Spacing.two, paddingBottom: Spacing.six },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.two },
  errorText: { color: 'red', textAlign: 'center' },
  image: { width: '100%', aspectRatio: 1, borderRadius: Spacing.three },
  price: { fontSize: 20, fontWeight: '700', color: BrandColors.primary },
  sectionHeading: { marginTop: Spacing.three },
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
  variantTextSelected: { color: BrandColors.primary, fontWeight: '600' },
  ctaButton: {
    backgroundColor: BrandColors.primary,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Pressable, View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EMIPlanSelector } from '@/components/EMIPlanSelector';
import { OrderConfirmationModal } from '@/components/OrderConfirmationModal';
import { fetchProductById, type Product } from '@/data/mockProducts';
import { BrandColors, Spacing } from '@/constants/theme';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProductById(id);
      setProduct(result);
      if (result) {
        setSelectedVariantId(result.variants[0]?.id ?? null);
        const initialPlans = result.variants[0]?.emiPlans && result.variants[0].emiPlans.length > 0
          ? result.variants[0].emiPlans
          : result.emiPlans;
        setSelectedPlanId(initialPlans[0]?.id ?? null);
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

  const currentVariant = product
    ? product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
    : null;
  const currentPrice = currentVariant?.price ?? product?.price ?? 0;
  const currentSku = currentVariant?.sku;
  const currentImage = currentVariant?.imageUrl ?? product?.imageUrl;
  const currentPlans = currentVariant?.emiPlans && currentVariant.emiPlans.length > 0
    ? currentVariant.emiPlans
    : product?.emiPlans ?? [];
  const selectedPlan = currentPlans.find((p) => p.id === selectedPlanId) ?? currentPlans[0];

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
    if (!product) return;
    const newVariant = product.variants.find((v) => v.id === variantId);
    const newPlans = newVariant?.emiPlans && newVariant.emiPlans.length > 0
      ? newVariant.emiPlans
      : product.emiPlans;

    const currentPlan = currentPlans.find((p) => p.id === selectedPlanId);
    const matchingPlan = newPlans.find((p) => p.tenureMonths === currentPlan?.tenureMonths) ?? newPlans[0];
    if (matchingPlan) {
      setSelectedPlanId(matchingPlan.id);
    }
  };

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
      {currentImage && <Image source={{ uri: currentImage }} style={styles.image} />}
      <Text style={styles.title}>{product.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ₹{currentPrice.toLocaleString('en-IN')}
        </Text>
        {currentSku ? (
          <View style={styles.skuBadge}>
            <Text style={styles.skuText}>SKU: {currentSku}</Text>
          </View>
        ) : null}
      </View>

      {/* 1Fi Trust & Delivery Perks */}
      <View style={styles.perksContainer}>
        <View style={styles.perkCard}>
          <Ionicons name="flash-outline" size={18} color={BrandColors.primary} />
          <Text style={styles.perkTitle}>Zero Foreclosure</Text>
          <Text style={styles.perkDesc}>No prepayment penalty</Text>
        </View>
        <View style={styles.perkCard}>
          <Ionicons name="cube-outline" size={18} color={BrandColors.primary} />
          <Text style={styles.perkTitle}>Fast Delivery</Text>
          <Text style={styles.perkDesc}>{product.deliveryTimeline}</Text>
        </View>
        <View style={styles.perkCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color={BrandColors.primary} />
          <Text style={styles.perkTitle}>Warranty</Text>
          <Text style={styles.perkDesc}>{product.warranty}</Text>
        </View>
      </View>

      {/* Variant Selector */}
      <Text style={styles.sectionHeading}>Select Variant</Text>
      <View style={styles.variantRow}>
        {product.variants.map((variant) => {
          const isSelected = variant.id === (currentVariant?.id ?? selectedVariantId);
          return (
            <Pressable
              key={variant.id}
              onPress={() => handleSelectVariant(variant.id)}
              style={[styles.variantPill, isSelected && styles.variantPillSelected]}
            >
              <Text style={isSelected ? styles.variantTextSelected : styles.variantText}>
                {variant.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* EMI Plan Selector */}
      <EMIPlanSelector
        plans={currentPlans}
        selectedPlanId={selectedPlanId}
        onSelect={setSelectedPlanId}
      />

      {/* Product Overview & Highlights */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardHeading}>About this product</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>

        <Text style={styles.subHeading}>Key Highlights</Text>
        <View style={styles.highlightsList}>
          {product.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={BrandColors.primary}
                style={styles.checkIcon}
              />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Technical Specifications */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardHeading}>Technical Specifications</Text>
        <View style={styles.specsTable}>
          {product.specifications.map((spec, index) => {
            const isEven = index % 2 === 0;
            return (
              <View key={spec.label} style={[styles.specRow, isEven && styles.specRowAlt]}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* CTA Button */}
      <Pressable
        style={styles.ctaButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.ctaText}>Proceed with this plan</Text>
      </Pressable>

      {/* Order & EMI Summary Confirmation Modal */}
      {product ? (
        <OrderConfirmationModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          product={product}
          variant={currentVariant}
          plan={selectedPlan}
          onBackToShop={() => {
            setIsModalVisible(false);
            router.back();
          }}
        />
      ) : null}
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
  image: { width: '100%', aspectRatio: 1, borderRadius: Spacing.three, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '800', color: '#111' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  price: { fontSize: 22, fontWeight: '800', color: BrandColors.primary },
  skuBadge: {
    backgroundColor: '#EAEAEA',
    borderRadius: 6,
    paddingHorizontal: Spacing.one + 2,
    paddingVertical: 3,
  },
  skuText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  perksContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  perkCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: Spacing.two,
    padding: Spacing.two,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    gap: 2,
  },
  perkTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111',
    marginTop: 2,
    textAlign: 'center',
  },
  perkDesc: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  sectionHeading: { fontSize: 18, fontWeight: '700', color: '#111', marginTop: Spacing.three },
  cardHeading: { fontSize: 16, fontWeight: '700', color: '#111' },
  subHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginTop: Spacing.two,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  descriptionText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    marginTop: Spacing.two,
  },
  highlightsList: {
    gap: Spacing.two,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  checkIcon: {
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  specsTable: {
    borderRadius: Spacing.two,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginTop: Spacing.two,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  specRowAlt: {
    backgroundColor: '#FAFAFC',
  },
  specLabel: {
    width: '35%',
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  specValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#111',
  },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  variantPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
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
    marginTop: Spacing.three,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
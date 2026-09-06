import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandColors, Spacing } from '@/constants/theme';
import type { Product } from '@/data/mockProducts';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const cheapestNoCostPlan = product.emiPlans
    .filter((p) => p.isNoCost)
    .sort((a, b) => b.tenureMonths - a.tenureMonths)[0];

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
      />
      <View style={styles.textCol}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          ₹{product.price.toLocaleString('en-IN')}
        </Text>
        {cheapestNoCostPlan ? (
          <View style={styles.emiBadge}>
            <Text style={styles.emiBadgeText}>
              No-cost EMI from ₹{cheapestNoCostPlan.monthlyAmount.toLocaleString('en-IN')}/mo
            </Text>
          </View>
        ) : (
          <Text style={styles.emiSubtitle}>
            EMI options available
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: Spacing.three,
    padding: Spacing.two,
    gap: Spacing.three,
    shadowColor: '#939393',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: Spacing.two,
    backgroundColor: '#f0f0f0',
  },
  textCol: { flex: 1, gap: 2 },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
  },
  emiBadge: {
    alignSelf: 'flex-start',
    backgroundColor: BrandColors.primaryLight,
    paddingHorizontal: Spacing.one + 2,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  emiBadgeText: {
    color: BrandColors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  emiSubtitle: {
    color: '#666',
    fontSize: 12,
  },
});
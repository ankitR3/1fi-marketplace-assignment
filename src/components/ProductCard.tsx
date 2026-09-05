import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Spacing } from '@/constants/theme';
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
        onError={(e) => console.log('Image failed:', product.imageUrl, e.nativeEvent.error)}
      />
      <View style={styles.textCol}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {cheapestNoCostPlan
            ? `No-cost EMIs upto ${cheapestNoCostPlan.tenureMonths} months`
            : `₹${product.price.toLocaleString('en-IN')}`}
        </Text>
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
  subtitle: {
    color: '#666',
    fontSize: 13,
  },
});
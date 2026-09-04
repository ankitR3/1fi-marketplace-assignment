import { Image, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Product } from '@/data/mockProducts';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <ThemedText numberOfLines={1} style={styles.name}>
          {product.name}
        </ThemedText>
        <ThemedText type="small" style={styles.price}>
          ₹{product.price.toLocaleString('en-IN')}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.two,
    flex: 1,
    gap: Spacing.one,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Spacing.two,
  },
  name: {
    fontWeight: '600',
  },
  price: {
    opacity: 0.7,
  },
});
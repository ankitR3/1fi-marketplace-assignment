import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/theme';

export function ProductCardSkeleton() {
  const animatedOpacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedOpacity]);

  return (
    <View style={styles.card}>
      {/* Product Image Skeleton */}
      <Animated.View style={[styles.imagePlaceholder, { opacity: animatedOpacity }]} />

      {/* Text Lines Column */}
      <View style={styles.textCol}>
        {/* Product Title Skeleton */}
        <Animated.View style={[styles.titlePlaceholder, { opacity: animatedOpacity }]} />

        {/* Product Price Skeleton */}
        <Animated.View style={[styles.pricePlaceholder, { opacity: animatedOpacity }]} />

        {/* EMI Badge Skeleton */}
        <Animated.View style={[styles.badgePlaceholder, { opacity: animatedOpacity }]} />
      </View>
    </View>
  );
}

export function ProductListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>
          <ProductCardSkeleton />
          {index < count - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.three,
    paddingTop: 1,
    backgroundColor: '#F5F5F7',
  },
  separator: {
    height: 13,
  },
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
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: Spacing.two,
    backgroundColor: '#E5E7EB',
  },
  textCol: {
    flex: 1,
    gap: 3,
    justifyContent: 'center',
  },
  titlePlaceholder: {
    width: '45%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  pricePlaceholder: {
    width: '28%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  badgePlaceholder: {
    width: 176,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#EDE9FE',
    marginTop: 2,
  },
});

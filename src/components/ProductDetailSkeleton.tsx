import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/theme';

export function ProductDetailSkeleton() {
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Large Hero Product Image */}
      <Animated.View style={[styles.imagePlaceholder, { opacity: animatedOpacity }]} />

      {/* 2. Product Title */}
      <Animated.View style={[styles.titlePlaceholder, { opacity: animatedOpacity }]} />

      {/* 3. Price and SKU Badge Row */}
      <View style={styles.priceRow}>
        <Animated.View style={[styles.pricePlaceholder, { opacity: animatedOpacity }]} />
        <Animated.View style={[styles.skuPlaceholder, { opacity: animatedOpacity }]} />
      </View>

      {/* 4. Three 1Fi Trust & Delivery Perks */}
      <View style={styles.perksContainer}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.perkCard}>
            <Animated.View style={[styles.perkIconPlaceholder, { opacity: animatedOpacity }]} />
            <Animated.View style={[styles.perkTitlePlaceholder, { opacity: animatedOpacity }]} />
            <Animated.View style={[styles.perkDescPlaceholder, { opacity: animatedOpacity }]} />
          </View>
        ))}
      </View>

      {/* 5. Variant Selector Section */}
      <Animated.View style={[styles.headingPlaceholder, { opacity: animatedOpacity }]} />
      <View style={styles.variantRow}>
        <View style={styles.variantPill}>
          <Animated.View style={[styles.variantPillText, { width: 110, opacity: animatedOpacity }]} />
        </View>
        <View style={styles.variantPill}>
          <Animated.View style={[styles.variantPillText, { width: 90, opacity: animatedOpacity }]} />
        </View>
      </View>

      {/* 6. EMI Plan Selector Section */}
      <Animated.View
        style={[styles.headingPlaceholder, { width: '45%', opacity: animatedOpacity }]}
      />
      <View style={styles.plansContainer}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.planCard}>
            <Animated.View style={[styles.radioPlaceholder, { opacity: animatedOpacity }]} />
            <View style={styles.planTextCol}>
              <Animated.View
                style={[
                  styles.planLinePrimary,
                  { width: i === 0 ? '75%' : '65%', opacity: animatedOpacity },
                ]}
              />
              <Animated.View style={[styles.planLineSecondary, { opacity: animatedOpacity }]} />
            </View>
          </View>
        ))}
      </View>

      {/* 7. Product Overview & Highlights Card */}
      <View style={styles.detailsCard}>
        <Animated.View style={[styles.cardHeadingPlaceholder, { opacity: animatedOpacity }]} />
        <Animated.View style={[styles.paragraphLine, { width: '100%', opacity: animatedOpacity }]} />
        <Animated.View style={[styles.paragraphLine, { width: '92%', opacity: animatedOpacity }]} />
        <Animated.View style={[styles.paragraphLine, { width: '60%', opacity: animatedOpacity }]} />

        <Animated.View
          style={[styles.cardHeadingPlaceholder, { width: '35%', marginTop: Spacing.two, opacity: animatedOpacity }]}
        />
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.highlightRow}>
            <Animated.View style={[styles.checkIconPlaceholder, { opacity: animatedOpacity }]} />
            <Animated.View
              style={[
                styles.highlightTextPlaceholder,
                { width: i === 0 ? '80%' : i === 1 ? '70%' : '85%', opacity: animatedOpacity },
              ]}
            />
          </View>
        ))}
      </View>

      {/* 8. Technical Specifications Card */}
      <View style={styles.detailsCard}>
        <Animated.View
          style={[styles.cardHeadingPlaceholder, { width: '50%', opacity: animatedOpacity }]}
        />
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.specRow, i % 2 === 0 && styles.specRowAlt]}>
            <Animated.View style={[styles.specLabelPlaceholder, { opacity: animatedOpacity }]} />
            <Animated.View style={[styles.specValuePlaceholder, { opacity: animatedOpacity }]} />
          </View>
        ))}
      </View>

      {/* 9. Bottom CTA Button Placeholder */}
      <Animated.View style={[styles.ctaPlaceholder, { opacity: animatedOpacity }]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  container: {
    padding: Spacing.three,
    gap: Spacing.two,
    paddingBottom: Spacing.six + 50,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Spacing.three,
    backgroundColor: '#E5E7EB',
  },
  titlePlaceholder: {
    width: '75%',
    height: 26,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginTop: Spacing.one,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pricePlaceholder: {
    width: 140,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  skuPlaceholder: {
    width: 90,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
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
    gap: 6,
    height: 82,
  },
  perkIconPlaceholder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5E7EB',
  },
  perkTitlePlaceholder: {
    width: '80%',
    height: 10,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  perkDescPlaceholder: {
    width: '60%',
    height: 8,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  headingPlaceholder: {
    width: '40%',
    height: 18,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginTop: Spacing.two,
  },
  variantRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  variantPill: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
  },
  variantPillText: {
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  plansContainer: {
    gap: Spacing.two,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    height: 56,
  },
  radioPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  planTextCol: {
    flex: 1,
    gap: 6,
  },
  planLinePrimary: {
    height: 13,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  planLineSecondary: {
    width: 80,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: Spacing.two,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    gap: Spacing.two,
  },
  cardHeadingPlaceholder: {
    width: '40%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
  paragraphLine: {
    height: 12,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: 2,
  },
  checkIconPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  highlightTextPlaceholder: {
    height: 12,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.one,
  },
  specRowAlt: {
    backgroundColor: '#F9FAFB',
  },
  specLabelPlaceholder: {
    width: '30%',
    height: 12,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  specValuePlaceholder: {
    width: '45%',
    height: 12,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  ctaPlaceholder: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    marginTop: Spacing.two,
  },
});

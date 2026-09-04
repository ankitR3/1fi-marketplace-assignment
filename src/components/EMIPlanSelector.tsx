import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandColors, Spacing } from '@/constants/theme';
import type { EMIPlan } from '@/data/mockProducts';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
}

export function EMIPlanSelector({ plans, selectedPlanId, onSelect }: EMIPlanSelectorProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.heading}>
        Choose EMI Plan
      </ThemedText>
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <Pressable
            key={plan.id}
            onPress={() => onSelect(plan.id)}
            style={[styles.planRow, isSelected && styles.planRowSelected]}
          >
            <ThemedView style={styles.radioOuter}>
              {isSelected && <ThemedView style={styles.radioInner} />}
            </ThemedView>
            <ThemedView style={styles.planTextGroup}>
              <ThemedText style={styles.planTenure}>
                {plan.tenureMonths} months — ₹{plan.monthlyAmount.toLocaleString('en-IN')}/mo
              </ThemedText>
              {plan.isNoCost && (
                <ThemedText type="small" style={styles.noCostTag}>
                  No-Cost EMI
                </ThemedText>
              )}
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.two, paddingVertical: Spacing.three },
  heading: { marginBottom: Spacing.one },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  planRowSelected: {
    borderColor: BrandColors.primary,
    backgroundColor: BrandColors.primaryLight,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BrandColors.primary,
  },
  planTextGroup: { gap: 2 },
  planTenure: { fontWeight: '600' },
  noCostTag: { color: BrandColors.primary },
});
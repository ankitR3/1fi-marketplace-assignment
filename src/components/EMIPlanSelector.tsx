import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandColors, Spacing } from '@/constants/theme';
import type { EMIPlan } from '@/data/mockProducts';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
}

export function EMIPlanSelector({ plans, selectedPlanId, onSelect }: EMIPlanSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose EMI Plan</Text>
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <Pressable
            key={plan.id}
            onPress={() => onSelect(plan.id)}
            style={[styles.planRow, isSelected && styles.planRowSelected]}
          >
            <View style={styles.radioOuter}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
            <View style={styles.planTextGroup}>
              <Text style={styles.planTenure}>
                {plan.tenureMonths} months — ₹{plan.monthlyAmount.toLocaleString('en-IN')}/mo
              </Text>
              {plan.isNoCost && (
                <Text style={styles.noCostTag}>No-Cost EMI</Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.two, paddingVertical: Spacing.three },
  heading: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: Spacing.one },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
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
  planTenure: { fontWeight: '600', color: '#111' },
  noCostTag: { color: BrandColors.primary, fontSize: 13 },
});
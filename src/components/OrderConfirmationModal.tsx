import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Spacing } from '@/constants/theme';
import type { EMIPlan, Product, ProductVariant } from '@/data/mockProducts';

interface OrderConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product;
  variant: ProductVariant | null;
  plan: EMIPlan | null;
  onBackToShop: () => void;
}

export function OrderConfirmationModal({
  visible,
  onClose,
  product,
  variant,
  plan,
  onBackToShop,
}: OrderConfirmationModalProps) {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleDismiss = () => {
    setIsOrderConfirmed(false);
    onClose();
  };

  const handleConfirm = () => {
    setOrderId(`1FI-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsOrderConfirmed(true);
  };

  const displayImage = variant?.imageUrl ?? product.imageUrl;
  const displayPrice = variant?.price ?? product.price;
  const totalPayable = plan ? plan.monthlyAmount * plan.tenureMonths : displayPrice;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleDismiss}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdrop} onPress={handleDismiss} />

        <View style={styles.modalSheet}>
          <View style={styles.sheetHandle} />

          {!isOrderConfirmed ? (
            <>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Order & EMI Summary</Text>
                <Pressable hitSlop={8} onPress={handleDismiss} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="#666" />
                </Pressable>
              </View>

              {/* Product & Variant preview */}
              <View style={styles.orderProductRow}>
                {displayImage ? (
                  <Image source={{ uri: displayImage }} style={styles.thumbImage} />
                ) : null}
                <View style={styles.orderProductDetails}>
                  <Text numberOfLines={1} style={styles.orderProductName}>
                    {product.name}
                  </Text>
                  <Text style={styles.orderVariantText}>
                    {variant?.label} {variant?.sku ? `• ${variant.sku}` : ''}
                  </Text>
                  <Text style={styles.orderPrice}>
                    ₹{displayPrice.toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>

              {/* EMI Financial Breakdown */}
              <View style={styles.breakdownCard}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Down Payment</Text>
                  <Text style={styles.breakdownValueGreen}>₹0 (Zero Down Payment)</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Monthly Installment</Text>
                  <Text style={styles.breakdownValueBold}>
                    ₹{plan?.monthlyAmount.toLocaleString('en-IN') ?? 0}/mo
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Tenure</Text>
                  <Text style={styles.breakdownValue}>
                    {plan?.tenureMonths} Months {plan?.isNoCost ? '(No-Cost EMI)' : ''}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Total Amount</Text>
                  <Text style={styles.breakdownValue}>
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Collateral</Text>
                  <Text style={styles.breakdownValue}>Pledged Mutual Funds</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Foreclosure Fee</Text>
                  <Text style={styles.breakdownValueGreen}>₹0 (Zero Charges)</Text>
                </View>
              </View>

              {/* Delivery Info */}
              <View style={styles.deliveryNoteRow}>
                <Ionicons name="cube-outline" size={16} color={BrandColors.primary} />
                <Text style={styles.deliveryNoteText}>
                  {product.deliveryTimeline} • Standard Delivery
                </Text>
              </View>

              {/* Confirm CTA */}
              <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm & Place Order</Text>
              </Pressable>
            </>
          ) : (
            /* Success State */
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={64} color="#10B981" />
              <Text style={styles.successTitle}>Order Placed Successfully!</Text>
              <Text style={styles.successSubtitle}>
                Your No-Cost EMI application for {product.name} ({variant?.label}) has been approved.
              </Text>

              <View style={styles.orderIdPill}>
                <Text style={styles.orderIdLabel}>Order Reference</Text>
                <Text style={styles.orderIdValue}>#{orderId}</Text>
              </View>

              <View style={styles.successDetailsCard}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Monthly Debit</Text>
                  <Text style={styles.breakdownValueBold}>
                    ₹{plan?.monthlyAmount.toLocaleString('en-IN') ?? 0}/mo
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>First EMI Due</Text>
                  <Text style={styles.breakdownValue}>In 30 Days</Text>
                </View>
              </View>

              <Pressable
                style={styles.confirmButton}
                onPress={() => {
                  handleDismiss();
                  onBackToShop();
                }}
              >
                <Text style={styles.confirmButtonText}>Back to Shop</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.four,
    paddingBottom: Spacing.six + 10,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.two,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderProductRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },
  thumbImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F5F5F7',
  },
  orderProductDetails: {
    flex: 1,
    gap: 2,
  },
  orderProductName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  orderVariantText: {
    fontSize: 12,
    color: '#666',
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.primary,
    marginTop: 2,
  },
  breakdownCard: {
    backgroundColor: '#F9F9FB',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
    marginTop: Spacing.one,
    borderWidth: 1,
    borderColor: '#ECECF0',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#666',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  breakdownValueBold: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.primary,
  },
  breakdownValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  deliveryNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.one,
    marginTop: Spacing.one,
  },
  deliveryNoteText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: BrandColors.primary,
    borderRadius: Spacing.three,
    paddingVertical: 13,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginTop: Spacing.one,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
    lineHeight: 18,
  },
  orderIdPill: {
    alignItems: 'center',
    backgroundColor: BrandColors.primaryLight,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    marginVertical: Spacing.one,
  },
  orderIdLabel: {
    fontSize: 11,
    color: BrandColors.primary,
    fontWeight: '500',
  },
  orderIdValue: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.primary,
    marginTop: 2,
  },
  successDetailsCard: {
    width: '100%',
    backgroundColor: '#F9F9FB',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: '#ECECF0',
    marginVertical: Spacing.one,
  },
});

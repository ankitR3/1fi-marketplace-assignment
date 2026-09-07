# 1Fi Marketplace — React Native (Expo)

A high-fidelity mobile marketplace experience built for the **1Fi SDE Intern Assignment**. This project extends 1Fi's core fintech experience by allowing users to browse electronics and lifestyle products, evaluate No-Cost EMI plans backed by their mutual fund investments, and complete purchases with zero down payment and zero foreclosure charges.

---

## 📱 Features & Highlights

### 1. 1Fi Marketplace Listing (`src/app/shop/marketplace/index.tsx`)
- **Seamless Navigation**: Integrated into the **Shop** screen with a 3-tab pill switcher (*Top Brands*, *Nearby Stores*, *1Fi Marketplace*).
- **Product Cards**: Shows product photography, model name, starting price, and prominent No-Cost EMI tags (e.g., `From ₹X,XXX/mo (No-Cost EMI)`).
- **Functional Real-Time Search**: Integrated controlled search input in the header that filters products dynamically across name, brand, category, description, and variant SKUs. Includes one-tap clear button.
- **Native Pull-to-Refresh**: Native `RefreshControl` with 1Fi brand purple spinner, simulating live API refetching with network latency handling.
- **Pulsing Skeleton Loader**: Custom multi-card skeleton with looping opacity animation (`useNativeDriver: true`) matching the exact layout of product cards.
- **Empty & Error States**: Graceful fallback UI with retry button for simulated network failures and clear "No products match your search" screen.

### 2. Product Details Screen (`src/app/shop/marketplace/[id].tsx`)
- **Dynamic Variant Switching**: Interactive variant selector (storage, memory, color) dynamically updating price, SKU, product images, and available EMI tenures.
- **Product Details & Skeletons**: Dedicated `ProductDetailSkeleton` matching the exact layout of the hero image, price row, trust perks, variant pills, and specifications table.
- **1Fi Trust & Perks Row**: Highlights key brand propositions:
  - ⚡ **Zero Foreclosure Charges** (No prepayment penalty)
  - 📦 **Fast Delivery** with estimated delivery dates
  - 🛡️ **Manufacturer Warranty**
- **Interactive EMI Plan Selector**: Radio-selectable EMI tenures (3, 6, 9, 12 months) with computed monthly installments and highlighted "No-Cost EMI" badges.
- **Technical Specifications & Highlights**: Structured bullet points and alternating specs table.

### 3. Order & EMI Confirmation Modal (`src/components/OrderConfirmationModal.tsx`)
- **Bottom-Sheet Modal**: Sliding animated bottom sheet summarizing product, variant, and financial terms.
- **Transparent Financial Breakdown**:
  - Down Payment: `₹0 (Zero Down Payment)`
  - Monthly Installment: `₹X,XXX / mo`
  - Collateral: `Pledged Mutual Funds`
  - Foreclosure Fee: `₹0 (Zero Prepayment Penalty)`
- **Order Success State**: Generates a unique order reference (`#1FI-XXXXXX`), confirms approval, and details first payment debit timeline.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Expo v57](https://docs.expo.dev/) with [Expo Router v4](https://docs.expo.dev/router/introduction) (file-based routing)
- **Language**: TypeScript (Strict Mode, 100% type-safe)
- **Styling**: React Native `StyleSheet` with centralized design tokens (`src/constants/theme.ts`)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Gradients**: `expo-linear-gradient`
- **Safe Area**: `react-native-safe-area-context`

---

## 📂 Project Structure

```text
├── assets/                  # App images, logos, and custom photography
├── src/
│   ├── app/                 # Expo Router file-based screens
│   │   ├── _layout.tsx      # Root layout with theme provider & splash overlay
│   │   ├── index.tsx        # Home screen
│   │   ├── shop/            # Shop section
│   │   │   ├── index.tsx    # Shop tabs (Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   │   └── marketplace/
│   │   │       ├── index.tsx # Marketplace product catalog & FlatList
│   │   │       └── [id].tsx # Dynamic product detail screen
│   │   ├── emi-dues.tsx     # EMI Dues tab placeholder
│   │   ├── limit.tsx        # Credit Limit tab placeholder
│   │   └── profile.tsx      # Profile tab placeholder
│   ├── components/          # Reusable UI components
│   │   ├── app-tabs.tsx     # Custom floating bottom tab bar
│   │   ├── ProductCard.tsx  # Product card component
│   │   ├── ProductCardSkeleton.tsx # Catalog list pulsing skeleton
│   │   ├── ProductDetailSkeleton.tsx # Product details screen pulsing skeleton
│   │   ├── EMIPlanSelector.tsx # Interactive EMI tenure selector
│   │   └── OrderConfirmationModal.tsx # Checkout & order confirmation modal
│   ├── constants/
│   │   └── theme.ts         # Brand colors, spacing, and typography tokens
│   └── data/
│       └── mockProducts.ts  # Catalog data, variants, specs, and mock async API
├── app.json                 # Expo app configuration
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

---

## 💡 Key Architectural & UX Decisions

1. **Active Tab Guard (`isFocused`)**:
   Prevented re-render and flickering glitches on the floating tab bar by checking `if (isFocused) return;` in `app-tabs.tsx`. Repeatedly tapping the active tab will not cause route re-mounts.
2. **State Preservation across Tabs**:
   The `MarketplaceScreen` remains mounted and toggle-hidden when switching between *Top Brands* and *1Fi Marketplace*, preserving the user's scroll position and data cache without redundant API refetches.
3. **Simulated Realistic Network Layer**:
   `mockProducts.ts` models real-world latency (1,000ms delay) and intermittent failure handling (10% chance), enabling proper demonstration of skeletons, pull-to-refresh spinners, and error retry states.
4. **Accessible Visual Feedback**:
   Every interactive element uses `Pressable` with tactile feedback, hitSlop margins, and clear active/hover visual indicators.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Expo Go app on your physical iOS/Android device, or an iOS Simulator / Android Emulator

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

### 3. Run on Device or Simulator
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical Device**: Scan the QR code using the **Expo Go** app (Android) or the **Camera app** (iOS)

### 4. Type Checking
To run TypeScript validation across the entire codebase:
```bash
npx tsc --noEmit
```
*(Passes cleanly with 0 errors)*

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  isNoCost: boolean;
}

export interface ProductVariant {
  id: string;
  label: string;
  sku: string;
  price: number;
  imageUrl?: string;
  emiPlans?: EMIPlan[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  deliveryTimeline: string;
  warranty: string;
  highlights: string[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  category: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15',
    imageUrl: 'https://images.unsplash.com/photo-1695639509828-d4260075e370?w=800&auto=format&fit=crop&q=80',
    price: 79900,
    category: 'Smartphones',
    description:
      'iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C — all in a durable color-infused glass and aluminum design.',
    deliveryTimeline: 'Free delivery by tomorrow, 2:00 PM',
    warranty: '1 Year Apple Manufacturer Warranty',
    highlights: [
      'Dynamic Island bubbles up alerts and Live Activities',
      '48MP Main camera with 2x Telephoto optical zoom',
      'A16 Bionic chip powers computational photography',
      'All-day battery life with up to 20 hours video playback',
      'Zero foreclosure charges with 1Fi Pay Later',
    ],
    specifications: [
      { label: 'Display', value: '6.1-inch Super Retina XDR OLED' },
      { label: 'Processor', value: 'A16 Bionic (6-core CPU, 5-core GPU)' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide' },
      { label: 'Battery', value: 'Up to 20 hours video playback' },
      { label: 'Port', value: 'USB-C (supports DisplayPort)' },
      { label: 'OS', value: 'iOS 17 (Upgradable)' },
    ],
    variants: [
      {
        id: 'v1',
        label: '128GB / Black',
        sku: 'IPH15-128-BLK',
        price: 79900,
        imageUrl: 'https://images.unsplash.com/photo-1695639509828-d4260075e370?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e1-1', tenureMonths: 3, monthlyAmount: 26633, isNoCost: true },
          { id: 'e1-2', tenureMonths: 6, monthlyAmount: 13317, isNoCost: true },
          { id: 'e1-3', tenureMonths: 12, monthlyAmount: 6658, isNoCost: false },
        ],
      },
      {
        id: 'v2',
        label: '256GB / Blue',
        sku: 'IPH15-256-BLU',
        price: 89900,
        imageUrl: 'https://images.unsplash.com/photo-1695578130391-929bdfff85d8?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e2-1', tenureMonths: 3, monthlyAmount: 29967, isNoCost: true },
          { id: 'e2-2', tenureMonths: 6, monthlyAmount: 14983, isNoCost: true },
          { id: 'e2-3', tenureMonths: 12, monthlyAmount: 7492, isNoCost: false },
        ],
      },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, monthlyAmount: 26633, isNoCost: true },
      { id: 'e2', tenureMonths: 6, monthlyAmount: 13317, isNoCost: true },
      { id: 'e3', tenureMonths: 12, monthlyAmount: 6658, isNoCost: false },
    ],
  },
  {
    id: 'p2',
    name: 'MacBook Air',
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
    price: 114900,
    category: 'Laptops',
    description:
      'Strikingly thin and fast, the MacBook Air with M2 chip lets you work, play, or create just about anything — anywhere. Featuring up to 18 hours of battery life and a stunning Liquid Retina display.',
    deliveryTimeline: 'Free delivery within 2 days',
    warranty: '1 Year AppleCare Limited Warranty',
    highlights: [
      'Incredibly thin fanless design runs completely silent',
      'Apple M2 chip with 8-core CPU and up to 10-core GPU',
      '13.6-inch Liquid Retina display with 500 nits brightness',
      'MagSafe 3 charging port + two Thunderbolt / USB 4 ports',
      'Up to 18 hours battery life for all-day productivity',
    ],
    specifications: [
      { label: 'Display', value: '13.6-inch Liquid Retina with True Tone' },
      { label: 'Processor', value: 'Apple M2 Chip' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Battery', value: '52.6Wh Lithium-Polymer (up to 18h)' },
      { label: 'Weight', value: '1.24 kg (2.7 pounds)' },
      { label: 'Charging', value: 'MagSafe 3 & Fast-charge capable' },
    ],
    variants: [
      {
        id: 'v3',
        label: '256GB / Silver',
        sku: 'MBA-M2-256-SLV',
        price: 114900,
        imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e4-1', tenureMonths: 6, monthlyAmount: 19150, isNoCost: true },
          { id: 'e4-2', tenureMonths: 12, monthlyAmount: 9575, isNoCost: false },
        ],
      },
      {
        id: 'v4',
        label: '512GB / Space Gray',
        sku: 'MBA-M2-512-GRY',
        price: 134900,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e5-1', tenureMonths: 6, monthlyAmount: 22483, isNoCost: true },
          { id: 'e5-2', tenureMonths: 12, monthlyAmount: 11242, isNoCost: false },
        ],
      },
    ],
    emiPlans: [
      { id: 'e4', tenureMonths: 6, monthlyAmount: 19150, isNoCost: true },
      { id: 'e5', tenureMonths: 12, monthlyAmount: 9575, isNoCost: false },
    ],
  },
  {
    id: 'p3',
    name: 'Apple Watch Series 9',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    price: 41900,
    category: 'Wearables',
    description:
      'Smarter, brighter, and mightier. Apple Watch Series 9 helps you stay active, healthy, safe, and connected with Double Tap gesture, brighter display, and faster on-device Siri.',
    deliveryTimeline: 'Free delivery by tomorrow',
    warranty: '1 Year Apple Manufacturer Warranty',
    highlights: [
      'Magic double-tap gesture for hands-free interactions',
      'S9 SiP chip with 4-core Neural Engine',
      'Edge-to-edge Always-On Retina display up to 2000 nits',
      'Advanced health sensors: ECG, Blood Oxygen & Temperature',
      'Water resistant up to 50 meters (swimproof)',
    ],
    specifications: [
      { label: 'Display', value: 'Always-On Retina LTPO OLED (2000 nits)' },
      { label: 'Chip', value: 'S9 SiP with 64-bit dual-core processor' },
      { label: 'Sensors', value: 'ECG, Blood Oxygen, Temp, Crash Detection' },
      { label: 'Water Resistance', value: '50m (ISO standard 22810:2010)' },
      { label: 'Battery Life', value: 'Up to 18 hours (36h in Low Power)' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth 5.3, GPS' },
    ],
    variants: [
      {
        id: 'v5',
        label: '41mm / Midnight',
        sku: 'AWS9-41-MID',
        price: 41900,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e6-1', tenureMonths: 3, monthlyAmount: 13967, isNoCost: true },
          { id: 'e6-2', tenureMonths: 6, monthlyAmount: 6983, isNoCost: true },
        ],
      },
      {
        id: 'v6',
        label: '45mm / Starlight',
        sku: 'AWS9-45-STR',
        price: 44900,
        imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e7-1', tenureMonths: 3, monthlyAmount: 14967, isNoCost: true },
          { id: 'e7-2', tenureMonths: 6, monthlyAmount: 7483, isNoCost: true },
        ],
      },
    ],
    emiPlans: [
      { id: 'e6', tenureMonths: 3, monthlyAmount: 13967, isNoCost: true },
      { id: 'e7', tenureMonths: 6, monthlyAmount: 6983, isNoCost: true },
    ],
  },
];

// simulates network latency + occasional failure, like a real API call
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts(): Promise<Product[]> {
  await delay(2500); // simulate network latency

  const shouldFail = Math.random() < 0.1; // 10% chance of failure
  if (shouldFail) {
    throw new Error('Failed to load products. Please try again.');
  }

  return MOCK_PRODUCTS;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(800);

  const shouldFail = Math.random() < 0.1;
  if (shouldFail) {
    throw new Error('Failed to load product details.');
  }

  const product = MOCK_PRODUCTS.find((product) => product.id === id);
  return product ?? null;
}
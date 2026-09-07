import { Image } from 'react-native';

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
    name: 'MacBook Air M5',
    imageUrl: Image.resolveAssetSource(require('../../assets/images/macbook-air-m5.jpg')).uri,
    price: 119900,
    category: 'Laptops',
    description:
      'The all-new MacBook Air supercharged by the Apple M5 chip. Features a strikingly thin aluminum unibody, 13.6-inch Liquid Retina display, all-day battery life up to 18 hours, and advanced Apple Intelligence powered by a 16-core Neural Engine. Completely fanless for silent operation.',
    deliveryTimeline: 'Free delivery by tomorrow, 3:00 PM',
    warranty: '1 Year AppleCare Manufacturer Warranty',
    highlights: [
      'Next-generation Apple M5 chip (10-core CPU, 10-core GPU)',
      'Built for Apple Intelligence with 16-core Neural Engine',
      '13.6-inch Liquid Retina display with 500 nits & P3 color',
      'Silent fanless architecture with up to 18 hours battery life',
      'MagSafe 3 fast charging & dual Thunderbolt 4 / USB 4 ports',
      'Zero foreclosure fees on all 1Fi mutual-fund backed plans',
    ],
    specifications: [
      { label: 'Processor', value: 'Apple M5 (10-core CPU, 10-core GPU)' },
      { label: 'Neural Engine', value: '16-core Apple Intelligence Accelerator' },
      { label: 'Unified Memory', value: '16GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD (Configurable to 1TB or 2TB)' },
      { label: 'Display', value: '13.6-inch Liquid Retina (2560x1664, 500 nits, P3)' },
      { label: 'Battery Life', value: 'Up to 18 hours video playback / 15h wireless web' },
      { label: 'Audio', value: 'Four-speaker sound system with Spatial Audio' },
      { label: 'Camera', value: '1080p FaceTime HD camera with advanced ISP' },
      { label: 'Keyboard', value: 'Backlit Magic Keyboard with Touch ID sensor' },
      { label: 'Ports', value: 'MagSafe 3, 2x Thunderbolt 4, 3.5mm Headphone Jack' },
      { label: 'Weight', value: '1.24 kg (2.7 pounds) aluminum unibody' },
    ],
    variants: [
      {
        id: 'v3',
        label: '16GB • 512GB / Midnight',
        sku: 'MBA-M5-16-512-MID',
        price: 119900,
        imageUrl: Image.resolveAssetSource(require('../../assets/images/macbook-air-m5.jpg')).uri,
        emiPlans: [
          { id: 'e4-1', tenureMonths: 3, monthlyAmount: 39967, isNoCost: true },
          { id: 'e4-2', tenureMonths: 6, monthlyAmount: 19983, isNoCost: true },
          { id: 'e4-3', tenureMonths: 12, monthlyAmount: 9992, isNoCost: false },
        ],
      },
      {
        id: 'v4',
        label: '16GB • 1TB / Silver',
        sku: 'MBA-M5-16-1TB-SLV',
        price: 139900,
        imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e5-1', tenureMonths: 3, monthlyAmount: 46633, isNoCost: true },
          { id: 'e5-2', tenureMonths: 6, monthlyAmount: 23317, isNoCost: true },
          { id: 'e5-3', tenureMonths: 12, monthlyAmount: 11658, isNoCost: false },
        ],
      },
    ],
    emiPlans: [
      { id: 'e4', tenureMonths: 3, monthlyAmount: 39967, isNoCost: true },
      { id: 'e5', tenureMonths: 6, monthlyAmount: 19983, isNoCost: true },
      { id: 'e5-b', tenureMonths: 12, monthlyAmount: 9992, isNoCost: false },
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
  {
    id: 'p4',
    name: 'Sony WH-1000XM5',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    price: 29990,
    category: 'Audio',
    description:
      'Industry-leading noise cancellation with two processors and eight microphones. Exceptional sound quality engineered to perfection with the integrated V1 processor and LDAC high-res audio.',
    deliveryTimeline: 'Free delivery by tomorrow',
    warranty: '1 Year Sony India Brand Warranty',
    highlights: [
      'Industry-leading noise cancellation with Auto NC Optimizer',
      'Up to 30 hours of battery life with quick charging (3 min = 3 hours)',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Ultra-comfortable, lightweight design with soft fit leather',
      'Multipoint connection lets you switch seamlessly between devices',
    ],
    specifications: [
      { label: 'Type', value: 'Over-ear Closed Dynamic' },
      { label: 'Driver Unit', value: '30mm Carbon Fiber Composite' },
      { label: 'Battery Life', value: 'Up to 30 hours (NC ON), 40h (NC OFF)' },
      { label: 'Bluetooth', value: 'Version 5.2 (LDAC, AAC, SBC)' },
      { label: 'Weight', value: 'Approx. 250 grams' },
      { label: 'Charging', value: 'USB-PD fast charge compatible' },
    ],
    variants: [
      {
        id: 'v7',
        label: 'Black',
        sku: 'SONY-XM5-BLK',
        price: 29990,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e8-1', tenureMonths: 3, monthlyAmount: 9997, isNoCost: true },
          { id: 'e8-2', tenureMonths: 6, monthlyAmount: 4998, isNoCost: true },
        ],
      },
      {
        id: 'v8',
        label: 'Silver',
        sku: 'SONY-XM5-SLV',
        price: 29990,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e9-1', tenureMonths: 3, monthlyAmount: 9997, isNoCost: true },
          { id: 'e9-2', tenureMonths: 6, monthlyAmount: 4998, isNoCost: true },
        ],
      },
    ],
    emiPlans: [
      { id: 'e8', tenureMonths: 3, monthlyAmount: 9997, isNoCost: true },
      { id: 'e9', tenureMonths: 6, monthlyAmount: 4998, isNoCost: true },
    ],
  },
  {
    id: 'p5',
    name: 'iPad Air (M2)',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    price: 59900,
    category: 'Tablets',
    description:
      'iPad Air with the astonishingly fast Apple M2 chip. It features a gorgeous Liquid Retina display, a landscape 12MP front camera with Center Stage, and superfast Wi-Fi 6E.',
    deliveryTimeline: 'Free delivery in 2 business days',
    warranty: '1 Year Apple Manufacturer Warranty',
    highlights: [
      'Supercharged by the blazing-fast Apple M2 chip',
      '11-inch Liquid Retina display with P3 wide color and True Tone',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Compatible with Apple Pencil Pro and Magic Keyboard',
      'Zero foreclosure fees on all 1Fi mutual-fund backed plans',
    ],
    specifications: [
      { label: 'Display', value: '11-inch Liquid Retina LED backlit (500 nits)' },
      { label: 'Chip', value: 'Apple M2 (8-core CPU, 9-core GPU)' },
      { label: 'Camera', value: '12MP Wide back + 12MP Landscape Ultra Wide' },
      { label: 'Speakers', value: 'Landscape stereo speakers' },
      { label: 'Touch ID', value: 'Top button integrated fingerprint sensor' },
      { label: 'Port', value: 'USB-C with USB 3 speeds (up to 10Gb/s)' },
    ],
    variants: [
      {
        id: 'v9',
        label: '128GB / Space Gray',
        sku: 'IPAD-M2-128-GRY',
        price: 59900,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e10-1', tenureMonths: 3, monthlyAmount: 19967, isNoCost: true },
          { id: 'e10-2', tenureMonths: 6, monthlyAmount: 9983, isNoCost: true },
          { id: 'e10-3', tenureMonths: 12, monthlyAmount: 4992, isNoCost: false },
        ],
      },
      {
        id: 'v10',
        label: '256GB / Starlight',
        sku: 'IPAD-M2-256-STR',
        price: 69900,
        imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e11-1', tenureMonths: 3, monthlyAmount: 23300, isNoCost: true },
          { id: 'e11-2', tenureMonths: 6, monthlyAmount: 11650, isNoCost: true },
          { id: 'e11-3', tenureMonths: 12, monthlyAmount: 5825, isNoCost: false },
        ],
      },
    ],
    emiPlans: [
      { id: 'e10', tenureMonths: 3, monthlyAmount: 19967, isNoCost: true },
      { id: 'e11', tenureMonths: 6, monthlyAmount: 9983, isNoCost: true },
      { id: 'e12', tenureMonths: 12, monthlyAmount: 4992, isNoCost: false },
    ],
  },
  {
    id: 'p6',
    name: 'Samsung Galaxy S24 Ultra',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    price: 129999,
    category: 'Smartphones',
    description:
      'Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display. Powered by Galaxy AI and Snapdragon 8 Gen 3 for Galaxy.',
    deliveryTimeline: 'Free delivery by tomorrow, 11:00 AM',
    warranty: '1 Year Samsung India Manufacturer Warranty',
    highlights: [
      'Galaxy AI: Circle to Search, Live Translate & Note Assist',
      'Titanium shield built right into the frame for durability',
      '200MP Main Camera with AI-powered Quad Tele System',
      'Built-in S Pen writes, taps, and navigates with precision',
      '5,000 mAh battery with intelligent power management',
    ],
    specifications: [
      { label: 'Display', value: '6.8-inch Dynamic AMOLED 2X QHD+ (2600 nits)' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Main Camera', value: '200MP Wide + 50MP Periscope + 12MP Ultra Wide' },
      { label: 'Battery', value: '5,000 mAh with 45W Super Fast Charging' },
      { label: 'Stylus', value: 'Embedded S Pen with Bluetooth LE' },
      { label: 'Protection', value: 'Corning Gorilla Armor + IP68 Water Resistance' },
    ],
    variants: [
      {
        id: 'v11',
        label: '256GB / Titanium Black',
        sku: 'S24U-256-BLK',
        price: 129999,
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e13-1', tenureMonths: 6, monthlyAmount: 21667, isNoCost: true },
          { id: 'e13-2', tenureMonths: 12, monthlyAmount: 10833, isNoCost: false },
        ],
      },
      {
        id: 'v12',
        label: '512GB / Titanium Gray',
        sku: 'S24U-512-GRY',
        price: 139999,
        imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
        emiPlans: [
          { id: 'e14-1', tenureMonths: 6, monthlyAmount: 23333, isNoCost: true },
          { id: 'e14-2', tenureMonths: 12, monthlyAmount: 11667, isNoCost: false },
        ],
      },
    ],
    emiPlans: [
      { id: 'e13', tenureMonths: 6, monthlyAmount: 21667, isNoCost: true },
      { id: 'e14', tenureMonths: 12, monthlyAmount: 10833, isNoCost: false },
    ],
  },
];

// simulates network latency + occasional failure, like a real API call
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts(): Promise<Product[]> {
  await delay(1000); // simulate network latency

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
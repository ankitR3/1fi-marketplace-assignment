export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  isNoCost: boolean;
}

export interface ProductVariant {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  category: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15',
    imageUrl: 'https://placehold.co/400x400/6D28D9/white.png?text=iPhone+15',
    price: 79900,
    category: 'Smartphones',
    variants: [
      { id: 'v1', label: '128GB / Black' },
      { id: 'v2', label: '256GB / Blue' },
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
    imageUrl: 'https://placehold.co/400x400/6D28D9/white.png?text=MacBook+Air',
    price: 114900,
    category: 'Laptops',
    variants: [{ id: 'v3', label: '256GB / Silver' }],
    emiPlans: [
      { id: 'e4', tenureMonths: 6, monthlyAmount: 19150, isNoCost: true },
      { id: 'e5', tenureMonths: 12, monthlyAmount: 9575, isNoCost: false },
    ],
  },
  {
    id: 'p3',
    name: 'Apple Watch Series 9',
    imageUrl: 'https://placehold.co/400x400/6D28D9/white.png?text=Apple+Watch',
    price: 41900,
    category: 'Wearables',
    variants: [{ id: 'v4', label: '45mm / Midnight' }],
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
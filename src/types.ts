export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  verified?: boolean;
  replies?: { author: string; content: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  description: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  vendor?: string;
  ingredientsOrMaterials?: string;
  sizeOrDimensions?: string;
  restrictedRegions?: string[]; // Array of country IDs like 'CN', 'US', etc.
  customsNote?: string; // Reason for customs restriction
  richDescription?: { title: string; content: string }[];
  weight?: string;
  reviews?: Review[];
  reviewBreakdown?: Record<number, number>;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'placed' | 'packed' | 'shipped' | 'out-for-delivery' | 'delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  shippingType: 'home' | 'store';
  total: number;
  contactEmail: string;
  billingAddress?: {
    street: string;
    city: string;
    postalCode: string;
  };
}

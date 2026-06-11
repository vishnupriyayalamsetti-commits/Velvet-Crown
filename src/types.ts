/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  category: string;
  brand: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  details: {
    material: string;
    size: string[];
    style: string;
    care: string;
  };
  reviewsList: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
}

export interface OrderDetails {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  paymentMethod: string;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, OrderItem, Review } from '../types';
import { PRODUCTS, COUPONS } from '../data';

export type ViewType = 'home' | 'catalog' | 'details' | 'cart' | 'checkout' | 'contact' | 'order-confirmation';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  brand: string;
  rating: number;
  discount: boolean;
  availability: string;
}

interface ShopContextType {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Catalog Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  
  // Checkout & Coupon
  appliedCoupon: typeof COUPONS[0] | null;
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  latestOrder: OrderDetails | null;
  checkoutForm: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  setCheckoutForm: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    email: string;
    address: string;
  }>>;
  submitCheckout: (paymentMethod: string) => void;
  
  // Product Reviews Action
  addReviewToProduct: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

const defaultFilters: FilterOptions = {
  category: 'All',
  priceRange: [0, 25000],
  brand: 'All',
  rating: 0,
  discount: false,
  availability: 'All'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [sortBy, setSortBy] = useState('popular');
  
  // Checkout & Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<typeof COUPONS[0] | null>(null);
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Dynamic Product State (supporting custom review triggers)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Sync state from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('velvet_cart');
    const savedWish = localStorage.getItem('velvet_wishlist');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
    if (savedWish) {
      try { setWishlist(JSON.parse(savedWish)); } catch (e) { console.error(e); }
    }
  }, []);

  // Write changes to LocalStorage
  const saveCartToStorage = (newCart: CartItem[]) => {
    localStorage.setItem('velvet_cart', JSON.stringify(newCart));
  };

  const saveWishToStorage = (newWish: string[]) => {
    localStorage.setItem('velvet_wishlist', JSON.stringify(newWish));
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setStructuredView = (view: ViewType) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedProduct = (product: Product | null) => {
    setSelectedProductState(product);
    if (product) {
      setStructuredView('details');
    }
  };

  const addToCart = (product: Product, quantity: number, size?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      let newCart;
      if (existingIndex > -1) {
        newCart = prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { product, quantity, selectedSize: size }];
      }
      saveCartToStorage(newCart);
      return newCart;
    });
    addToast(`"${product.name}" added to Your Royal Cart`, 'success');
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      );
      saveCartToStorage(newCart);
      return newCart;
    });
    addToast('Item removed from Your Royal Cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      );
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    const item = products.find((p) => p.id === productId);
    setWishlist((prevWish) => {
      let newWish;
      if (prevWish.includes(productId)) {
        newWish = prevWish.filter((id) => id !== productId);
        addToast(`Removed "${item?.name}" from your Wishlist`, 'info');
      } else {
        newWish = [...prevWish, productId];
        addToast(`Saved "${item?.name}" to your Wishlist`, 'success');
      }
      saveWishToStorage(newWish);
      return newWish;
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const applyCouponCode = (code: string): boolean => {
    const codeUpper = code.trim().toUpperCase();
    const coupon = COUPONS.find((c) => c.code === codeUpper);
    if (coupon) {
      setAppliedCoupon(coupon);
      addToast(`Promo applied! Save ${coupon.value * 100}% off your order total!`, 'success');
      return true;
    } else {
      addToast('Invalid voucher code. Please try again.', 'error');
      return false;
    }
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    addToast('Voucher code removed.', 'info');
  };

  const submitCheckout = (paymentMethod: string) => {
    // Calculators
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = appliedCoupon ? subtotal * appliedCoupon.value : 0;
    const shipping = subtotal - discount > 5000 ? 0 : 350;
    const total = subtotal - discount + shipping;

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize
    }));

    const details: OrderDetails = {
      id: 'VC-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      items: orderItems,
      subtotal,
      discount,
      shipping,
      total,
      shippingDetails: { ...checkoutForm },
      paymentMethod
    };

    setLatestOrder(details);
    clearCart();
    setStructuredView('order-confirmation');
  };

  const addReviewToProduct = (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId) {
          const freshReview: Review = {
            id: 'rev-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...review
          };
          const updatedReviews = [freshReview, ...p.reviewsList];
          const newAvg = parseFloat(
            ((updatedReviews.reduce((sum, r) => sum + r.rating, 0)) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            rating: newAvg,
            reviewsCount: updatedReviews.length,
            reviewsList: updatedReviews
          };
        }
        return p;
      })
    );
    addToast('Thank you! Your feedback has been verified and posted.', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setView: setStructuredView,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        toasts,
        addToast,
        removeToast,
        
        // Search & Filters
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        resetFilters,
        
        // Checkout & Coupon
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        latestOrder,
        checkoutForm,
        setCheckoutForm,
        submitCheckout,
        
        // Dynamic reviews
        addReviewToProduct
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

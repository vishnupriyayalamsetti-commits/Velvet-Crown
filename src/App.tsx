/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './contexts/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { ContactView } from './components/ContactView';
import { QuickViewModal } from './components/QuickViewModal';
import { Product } from './types';
import { motion, AnimatePresence } from 'motion/react';

function AppCore() {
  const { currentView } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] border-8 md:border-[12px] border-white font-sans selection:bg-burgundy/10 selection:text-burgundy">
      
      {/* Sticky Header and alert banner */}
      <Header />

      {/* Main Core view with entering transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentView === 'home' && (
              <HomeView onQuickView={handleQuickView} />
            )}
            {currentView === 'catalog' && (
              <ShopView onQuickView={handleQuickView} />
            )}
            {currentView === 'details' && (
              <ProductDetailsView onQuickView={handleQuickView} />
            )}
            {currentView === 'cart' && (
              <CartView />
            )}
            {currentView === 'checkout' && (
              <CheckoutView />
            )}
            {currentView === 'contact' && (
              <ContactView />
            )}
            {currentView === 'order-confirmation' && (
              <CheckoutView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Alert stack notifications overlay */}
      <ToastContainer />

      {/* Quick View Modal dialog */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppCore />
    </ShopProvider>
  );
}

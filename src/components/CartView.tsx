/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import { Minus, Plus, Trash2, ArrowLeft, Ticket, Percent, ShoppingBag, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    setView,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    addToast
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountVal = appliedCoupon ? subtotal * appliedCoupon.value : 0;
  // Free shipping above 5000 rupees matching conditions
  const shippingCharge = subtotal > 0 && (subtotal - discountVal) > 5000 ? 0 : (subtotal > 0 ? 350 : 0);
  const total = subtotal - discountVal + shippingCharge;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCouponCode(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center bg-soft-bg min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-burgundy/5 text-burgundy flex items-center justify-center border border-burgundy/10 shadow-inner">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Your Royal Bag is Vacant</h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
            There are currently no luxury pieces saved inside your bag. Take a look across our catalog to discover fine ornaments.
          </p>
        </div>
        <button
          onClick={() => setView('catalog')}
          className="bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg cursor-pointer transition-colors shadow shadow-burgundy/10"
        >
          Explore Store Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-soft-bg min-h-screen">
      
      {/* Intro Headings */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">Your Royal Bag</h1>
        <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1">Review your selections or apply coupon codes before routing checkout details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT TWO-THIRDS: PRODUCTS ROWS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {cart.map((item, idx) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl border border-gray-150 p-4 sm:p-5 shadow-sm flex gap-4 items-center relative overflow-hidden hover:border-burgundy/5 transition-all"
                id={`cart-row-${item.product.id}`}
              >
                {/* Product thumbnail art */}
                <div 
                  onClick={() => {
                    setView('details');
                    // Direct set to selected product
                  }}
                  className="w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden bg-gray-50 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Information cells */}
                <div className="flex-1 flex flex-col justify-between self-stretch min-w-0">
                  <div className="space-y-1">
                    {/* brand & category */}
                    <div className="text-[10px] uppercase font-sans font-semibold tracking-widest text-gold">
                      {item.product.brand}
                    </div>

                    {/* title */}
                    <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 leading-snug truncate">
                      {item.product.name}
                    </h3>
                    
                    {/* selected size details */}
                    {item.selectedSize && (
                      <span className="inline-block bg-gray-100 text-[10px] font-sans font-bold text-gray-650 px-2 py-0.5 rounded uppercase tracking-wider">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controller & Price calculations row */}
                  <div className="flex items-center justify-between gap-4 pt-3 mt-2 border-t border-gray-50">
                    
                    {/* Quantity Selector buttons */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-8 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="p-2 hover:bg-gray-100 text-gray-500 transition-colors"
                        title="Reduce Quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-sans font-bold text-gray-900 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="p-2 hover:bg-gray-100 text-gray-500 transition-colors"
                        title="Increase Quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Calculated values */}
                    <div className="text-right">
                      <span className="text-xs font-sans text-gray-400 block sm:hidden">
                        {item.quantity} x {rupeeFormatter.format(item.product.price)}
                      </span>
                      <span className="text-sm sm:text-base font-sans font-extrabold text-burgundy">
                        {rupeeFormatter.format(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Delete trash button top corner */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-rose-pink hover:bg-rose-50 rounded-full transition-all cursor-pointer"
                  title="Remove Selection"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Continue Shopping button */}
          <button
            onClick={() => setView('catalog')}
            className="flex items-center gap-2 text-xs sm:text-sm font-sans font-bold text-gray-600 hover:text-burgundy transition-colors group py-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>Continue scanning elegant pieces</span>
          </button>
        </div>

        {/* RIGHT ONE-THIRD: ORDER PRICING SUMMARY & COUPONS PANEL */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-6 self-start">
            
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3.5 border-gray-100">
              Calculation Summary
            </h3>

            {/* Coupons Redeem Input Form */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wider block">
                Offer Voucher Code
              </label>
              
              <AnimatePresence mode="wait">
                {appliedCoupon ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-rose-pink/5 border border-rose-pink/20 text-[#CD1C43] rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Percent className="w-4 h-4 text-rose-pink shrink-0" />
                      <div>
                        <span className="font-bold uppercase leading-none block">{appliedCoupon.code}</span>
                        <span className="text-[10px] text-gray-500 font-sans tracking-wide block mt-0.5">{appliedCoupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCouponCode}
                      className="text-xs font-sans font-bold hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleCouponSubmit} 
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <input
                      type="text"
                      placeholder="e.g. VELVET40..."
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-205 rounded-lg px-3 py-2 text-xs sm:text-sm font-sans uppercase outline-none focus:bg-white focus:border-burgundy tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-gray-900 hover:bg-black text-white text-xs font-sans font-bold uppercase tracking-wider px-4 rounded-lg cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Quick Coupon advice labels */}
              {!appliedCoupon && (
                <div className="text-[10px] sm:text-xs font-sans text-gray-400 mt-2 flex flex-col gap-1 inline-block text-left">
                  <span>💡 Coupon Tip: Use <strong className="text-burgundy select-all font-mono font-bold">VELVET40</strong> for flat 40% OFF seasonal discount!</span>
                </div>
              )}
            </div>

            {/* Calculations breakdown list */}
            <div className="space-y-3.5 pt-4 border-t border-gray-100 text-xs sm:text-sm font-sans text-gray-650">
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
                <span className="text-gray-500">Cart Subtotal</span>
                <span className="font-bold text-gray-900">{rupeeFormatter.format(subtotal)}</span>
              </div>

              {discountVal > 0 && (
                <div className="flex justify-between items-center bg-rose-50 p-2.5 rounded-lg text-rose-pink">
                  <span>Special Coupon Savings</span>
                  <span className="font-extrabold">-{rupeeFormatter.format(discountVal)}</span>
                </div>
              )}

              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
                <span className="text-gray-500">Insured Delivery</span>
                {shippingCharge === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">Free Compliments</span>
                ) : (
                  <span className="font-medium text-gray-900">{rupeeFormatter.format(shippingCharge)}</span>
                )}
              </div>

              {shippingCharge > 0 && (
                <div className="text-[10px] text-amber-600 bg-amber-50 p-2 rounded text-center">
                  🚚 Add <span className="font-bold">{rupeeFormatter.format(5000 - (subtotal - discountVal))}</span> more values to unlock complimentary free delivery!
                </div>
              )}

              {/* Grand Total output */}
              <div className="flex justify-between items-center border-t border-gray-150 pt-4 text-base sm:text-lg font-sans font-black text-gray-900 bg-burgundy/5 p-3 rounded-lg border border-burgundy/10">
                <span>Grand Total</span>
                <span className="text-burgundy">{rupeeFormatter.format(total)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => setView('checkout')}
              className="w-full bg-burgundy hover:bg-burgundy-hover text-white py-4 rounded-xl text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-center cursor-pointer transition-luxury shadow-md shadow-burgundy/15 block"
            >
              Secure Checkout Gate
            </button>

            <span className="text-[10px] text-gray-400 font-sans text-center block leading-normal pt-2">
              🔒 Fully encrypted with bank-level SSL technology to safeguard transactions. Secure returns fully guaranteed within 14 days.
            </span>

          </div>
        </aside>

      </div>

    </div>
  );
};

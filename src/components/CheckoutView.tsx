/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import { CreditCard, Landmark, Coins, Truck, CheckCircle2, ChevronLeft, MapPin, Calendar, Receipt, FileText, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    setView,
    appliedCoupon,
    checkoutForm,
    setCheckoutForm,
    submitCheckout,
    latestOrder,
    addToast
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountVal = appliedCoupon ? subtotal * appliedCoupon.value : 0;
  const shippingCharge = subtotal > 0 && (subtotal - discountVal) > 5000 ? 0 : (subtotal > 0 ? 350 : 0);
  const total = subtotal - discountVal + shippingCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name.trim()) {
      addToast('Please enter your full recipient name', 'error');
      return;
    }
    if (!checkoutForm.phone.trim() || checkoutForm.phone.length < 10) {
      addToast('Please enter a valid 10-digit Indian phone coordinates', 'error');
      return;
    }
    if (!checkoutForm.email.trim() || !checkoutForm.email.includes('@')) {
      addToast('Please enter a valid coordinates email for invoicing', 'error');
      return;
    }
    if (!checkoutForm.address.trim() || checkoutForm.address.length < 10) {
      addToast('Please enter a complete parcel delivery address', 'error');
      return;
    }

    submitCheckout(paymentMethod);
  };

  const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  // If latestOrder is filled, render the majestic ORDER CONFIRMATION invoice sheet!
  if (latestOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center bg-soft-bg min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-12 shadow-xl  text-left relative overflow-hidden"
          id="invoice-confirmation-container"
        >
          {/* Subtle gold decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-gold via-burgundy to-gold" />

          <div className="flex flex-col items-center text-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-md">
              <CheckCircle2 className="w-9 h-9 animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Your Order with Velvet Crown is Completed</h1>
              <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-md">
                We have verified your payment coordinate securely. A personal concierge agent has started crafting your parcel packaging.
              </p>
            </div>
          </div>

          {/* Invoice summary table content */}
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 p-5 sm:p-6 mb-8 space-y-4">
            
            {/* Meta tags */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 text-xs font-sans text-gray-650">
              <div className="space-y-1">
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Order ID ID</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-burgundy">{latestOrder.id}</span>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Transaction Stamp</span>
                <span className="font-medium text-gray-900 flex items-center justify-end gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{latestOrder.date}</span>
                </span>
              </div>
            </div>

            {/* Recipient Coordinates */}
            <div className="pb-4 border-b border-gray-100 text-xs sm:text-sm font-sans text-gray-650 space-y-1.5">
              <span className="text-gray-400 block uppercase tracking-wider text-[10px] mb-1">Shipping coordinates</span>
              <div className="font-bold text-gray-950">{latestOrder.shippingDetails.name}</div>
              <div className="text-gray-500 leading-normal flex items-start gap-1">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{latestOrder.shippingDetails.address}</span>
              </div>
              <div className="text-gray-500">Phone: {latestOrder.shippingDetails.phone} | Email: {latestOrder.shippingDetails.email}</div>
            </div>

            {/* Ordered Items rows */}
            <div className="space-y-3 pb-4 border-b border-gray-100 max-h-56 overflow-y-auto">
              {latestOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm font-sans text-gray-650 gap-4">
                  <div className="min-w-0">
                    <span className="font-bold text-gray-950 block truncate">{it.name}</span>
                    {it.selectedSize && <span className="text-[10px] bg-gray-100 px-1 py-0.2 rounded text-gray-500">Size: {it.selectedSize}</span>}
                  </div>
                  <div className="shrink-0 text-right font-medium">
                    {it.quantity} x {rupeeFormatter.format(it.price)} = <span className="font-bold text-burgundy">{rupeeFormatter.format(it.price * it.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-2 text-xs sm:text-sm font-sans text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{rupeeFormatter.format(latestOrder.subtotal)}</span>
              </div>
              {latestOrder.discount > 0 && (
                <div className="flex justify-between text-rose-pink">
                  <span>Promo Voucher Discount</span>
                  <span>-{rupeeFormatter.format(latestOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Delivery</span>
                <span>{latestOrder.shipping === 0 ? 'Complimentary' : rupeeFormatter.format(latestOrder.shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-150 pt-2 text-sm sm:text-base font-sans font-bold text-gray-950 bg-burgundy/5 p-2 rounded">
                <span>Total Authenticated Amount</span>
                <span className="text-burgundy">{rupeeFormatter.format(latestOrder.total)}</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => {
                window.print();
              }}
              className="w-full sm:flex-1 border border-gray-250 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-xs sm:text-sm font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Receipt className="w-4 h-4 text-gold shrink-0" />
              <span>Download Invoice Receipts</span>
            </button>

            <button
              onClick={() => {
                setView('home');
                // Clean the session details automatically
              }}
              className="w-full sm:flex-1 bg-burgundy hover:bg-burgundy-hover text-white py-3 rounded-lg text-xs sm:text-sm font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>Return to entry lobby</span>
            </button>
          </div>

        </motion.div>
      </div>
    );
  }

  // If checkout has no items, go back
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-sm text-gray-500">Your Checkout cart is currently empty.</p>
        <button onClick={() => setView('catalog')} className="bg-burgundy text-white px-6 py-2 rounded-lg mt-4 text-xs font-sans font-bold">
          See Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-soft-bg min-h-screen">
      
      {/* Intro header */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <button
          onClick={() => setView('cart')}
          className="flex items-center gap-2 text-xs font-sans font-bold text-gray-500 hover:text-burgundy transition-colors uppercase tracking-wider mb-2"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Go back to royal cart details</span>
        </button>
        <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">The Crown Checkout Gateway</h1>
        <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1">Fill out your shipping coordinates securely to dispatch your fine parcels.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Shipping details forms & payment selection (7 out of 12 width) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Form Box */}
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3 mb-1 border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <span>Shipping Destination Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-gray-700 block">Recipient Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Aarav Malhotra..."
                  required
                  value={checkoutForm.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-gray-700 block">Indian Phone Coordinate</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9876543210..."
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={checkoutForm.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block">Email for Invoicing Receipts</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. aarav@gmail.com..."
                required
                value={checkoutForm.email}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block">Shipping Detailed Address</label>
              <textarea
                name="address"
                placeholder="Flat / Apartment / Street Name, Landmark, City, State, Pin Code..."
                required
                rows={3}
                value={checkoutForm.address}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-205 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner h-24"
              />
            </div>
          </div>

          {/* Payment Selection Box */}
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3 border-gray-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold shrink-0" />
              <span>Secure Payment Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-350 text-gray-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block">UPI (PhonePe, GPay, Paytm)</span>
                  <span className="text-[10px] text-gray-400 font-sans block">Instantly pay using secure UPI app overlay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-350 text-gray-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block">Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-400 font-sans block">Visa, Mastercard, RuPay cards supported</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NetBanking')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'NetBanking'
                    ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-350 text-gray-700'
                }`}
              >
                <Landmark className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block">Net Banking</span>
                  <span className="text-[10px] text-gray-400 font-sans block">Available for all major Indian banks</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-350 text-gray-700'
                }`}
              >
                <Coins className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block">Cash On Delivery</span>
                  <span className="text-[10px] text-gray-400 font-sans block">Pay cash when courier handovers package</span>
                </div>
              </button>

            </div>

            {/* Simulated secure warnings */}
            <div className="text-[11px] font-sans text-gray-450 bg-gray-50 border border-gray-150 p-3 rounded-lg leading-normal flex items-start gap-2">
              <Truck className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
              <span>
                Note: Cash on Delivery incurs standard post confirmation calls before parcel dispatches. UPI payments remain highly suggested for immediate white-glove fast processing.
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY AND FINAL PLACE ACTION (5 out of 12 width) */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3 border-gray-100 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-gold shrink-0" />
              <span>Ordered Summary</span>
            </h3>

            {/* List items row review list */}
            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto space-y-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 py-3 first:pt-0 overflow-hidden text-xs sm:text-sm font-sans text-gray-650">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-13 rounded bg-gray-50 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-gray-900 block truncate leading-snug">{item.product.name}</span>
                      {item.selectedSize && <span className="text-[10px] text-gray-400 font-sans font-bold">Size: {item.selectedSize}</span>}
                    </div>
                    <div className="text-[11px] text-gray-500 font-sans mt-1">
                      {item.quantity} x {rupeeFormatter.format(item.product.price)}
                    </div>
                  </div>
                  <span className="font-bold text-burgundy shrink-0 self-end">
                    {rupeeFormatter.format(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="space-y-3 pt-4 border-t border-gray-100 text-xs sm:text-sm font-sans text-gray-650">
              <div className="flex justify-between">
                <span className="text-gray-500">Items Subtotal</span>
                <span className="font-medium text-gray-900">{rupeeFormatter.format(subtotal)}</span>
              </div>

              {discountVal > 0 && (
                <div className="flex justify-between text-rose-pink">
                  <span>Voucher Reduction Savings</span>
                  <span className="font-bold">-{rupeeFormatter.format(discountVal)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">Insured Handled Shipping</span>
                <span>{shippingCharge === 0 ? 'Free' : rupeeFormatter.format(shippingCharge)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-150 pt-4 text-base sm:text-lg font-sans font-black text-gray-900 bg-burgundy/5 p-3 rounded-lg border border-burgundy/10">
                <span>Grand Total Total</span>
                <span className="text-burgundy">{rupeeFormatter.format(total)}</span>
              </div>
            </div>

            {/* PLACE ORDER FINAL TRIGGER */}
            <button
              type="submit"
              className="w-full bg-burgundy hover:bg-burgundy-hover text-white py-4 rounded-xl text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-center cursor-pointer transition-luxury shadow-md shadow-burgundy/15 block"
            >
              Confirm & Place Royal Order ({rupeeFormatter.format(total)})
            </button>

            <div className="text-[10px] text-gray-400 font-sans text-center leading-normal pt-2 flex items-center justify-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Secure verified checkout portal under PCI-DSS standards.</span>
            </div>

          </div>
        </aside>

      </form>

    </div>
  );
};

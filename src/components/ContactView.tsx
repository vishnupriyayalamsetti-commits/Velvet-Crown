/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, Globe, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactView: React.FC = () => {
  const { addToast } = useShop();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Styling Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      addToast('Please satisfy all required fields', 'error');
      return;
    }

    addToast('Your styling coordinates dispatched. Concierge agent will reach out in 2 hours!', 'success');
    setSubmitted(true);
    setFormState({
      name: '',
      email: '',
      subject: 'Styling Inquiry',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-soft-bg min-h-screen">
      
      {/* Intro Headings */}
      <div className="mb-10 sm:mb-12 border-b border-gray-100 pb-5 text-center sm:text-left">
        <span className="text-xs font-sans text-gold font-bold uppercase tracking-[0.2em] block">PERSONAL CUSTOM ASSURANCE</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">Reach Velvet Crown Concierge</h1>
        <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1 max-w-xl text-center sm:text-left mx-auto sm:mx-0">
          Our global client specialists, master dressmakers, and delivery handlers remain at your immediate service. Message us below for bespoke support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Contact Form (7 out of 12 width) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-150 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1.5 border-b border-gray-100 pb-4">
            <h3 className="font-serif text-xl font-bold text-gray-905">Inquire Online</h3>
            <p className="font-sans text-xs sm:text-sm text-gray-400">Your message is securely transmitted directly to our New Delhi executive offices.</p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs sm:text-sm rounded-lg font-sans flex items-start gap-2.5">
              <CheckCircleLine className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Coordinates Transmitted Successfully</span>
                <span className="block mt-0.5">Thank you! Your inquiry has been routed to our Lead Stylist. A personal concierge agent will connect with you via email or phone within 2 hours.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-gray-700 block">Your Signature Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Vikram Mehta..."
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-gray-700 block">Your Coordinates Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. vikram@gmail.com..."
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block">Topic of Inquiry</label>
              <select
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all"
              >
                <option value="Styling Inquiry">Curated Wardrobe Styling Consultation</option>
                <option value="Sizing Support">Atelier Sizing Fit Guidance</option>
                <option value="Order Tracking">Handled Dispatch Tracking</option>
                <option value="Corporate / PR">Brand Collaboration & Media Events</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-semibold text-gray-700 block">Written Consultation Message</label>
              <textarea
                name="message"
                placeholder="Share specific details regarding selected gowns, blazers fitting size chart, custom chest tailoring demands or delivery destinations safety..."
                required
                rows={5}
                value={formState.message}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-205 text-xs sm:text-sm rounded-lg px-3 py-2.5 outline-none font-sans focus:border-burgundy focus:bg-white transition-all shadow-inner h-32 sm:h-36"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Transmit Coordinates</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </form>
        </div>

        {/* RIGHT COLUMN: Business coordinates & Schedule (5 out of 12 width) */}
        <aside className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-905 border-b pb-3 border-gray-100">Our Executive Offices</h3>
            
            <ul className="flex flex-col gap-5 text-xs sm:text-sm font-sans text-gray-650">
              
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5.5 h-5.5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block text-gray-900">Atelier Location</span>
                  <span className="text-gray-500">
                    Unit 12, Ground Floor, DLF Emporio, Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070, India
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block text-gray-900">Royal Concierge Line</span>
                  <span className="text-gray-500">1800 572 4000 (India Toll Free Helpline)</span>
                  <span className="text-gray-500 block">International Support: +91 11 4000 5720</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block text-gray-900">Email Correspondence</span>
                  <span className="text-gray-500 block">General Styling: concierge@velvetcrown.com</span>
                  <span className="text-gray-500 block">Support: support@velvetcrown.com</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <span className="font-serif text-sm font-bold block text-gray-900">Operational Timeline</span>
                  <span className="text-gray-500 block">Monday to Saturday: 9:00 AM – 8:00 PM (IST)</span>
                  <span className="text-gray-500 block">Sunday: 11:00 AM - 6:00 PM (IST)</span>
                </div>
              </li>

            </ul>
          </div>

          <div className="bg-[#FFF] border border-gray-150 p-6 rounded-xl shadow-xs space-y-4">
            <h4 className="font-serif text-base font-bold text-gray-905 flex items-center gap-1.5 leading-normal">
              <HelpCircle className="w-5 h-5 text-gold shrink-0" />
              <span>Looking for quick answers?</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-normal">
              Read our full FAQ handbook to address delivery parameters, sizing conversions, card payment checks, and custom suit fitting arrangements instantly.
            </p>
            <a href="#" className="font-sans text-xs font-bold text-burgundy hover:text-burgundy-hover flex items-center gap-1 group transition-colors select-all">
              <span>See Help Center</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </aside>

      </div>

    </div>
  );
};

// Simple success tick mark icon in pure SVG
const CheckCircleLine: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

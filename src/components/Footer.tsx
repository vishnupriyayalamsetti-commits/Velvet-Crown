/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { useShop } from '../contexts/ShopContext';
import { Crown, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, setFilters } = useShop();

  const handleCategoryClick = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    setView('catalog');
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-2 border-gold/45">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Info column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setView('home')}>
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <Crown className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Velvet Crown
                </span>
                <span className="text-[9px] font-sans text-gold/80 font-semibold uppercase tracking-[0.25em] block -mt-1.5">
                  Royal Fashion
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              Velvet Crown is a premium online boutique focusing on absolute elegance, modern tailoring, and affordable luxury accessories. Enjoy hand-picked wardrobe materials curated to crown your status.
            </p>

            <div className="flex gap-4 items-center pt-2">
              <a href="#" className="p-2 bg-white/5 hover:bg-gold hover:text-gray-900 rounded-full text-gray-400 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-gold hover:text-gray-900 rounded-full text-gray-400 transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-gold hover:text-gray-900 rounded-full text-gray-400 transition-colors" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Hot Categories */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-burgundy">
              Store Collections
            </h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-400 font-sans">
              {['Dresses', 'Bangles', 'Women’s Fashion', 'Men’s Fashion', 'Bags', 'Jewelry', 'Watches', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-gold transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Concierge */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-burgundy">
              Royal Concierge
            </h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-400 font-sans">
              <li><button onClick={() => setView('contact')} className="hover:text-gold transition-colors text-left">Help & Support Form</button></li>
              <li><a href="#" className="hover:text-gold transition-colors text-left block">Royal Privilege Club</a></li>
              <li><a href="#" className="hover:text-gold transition-colors text-left block">Track Handled Dispatches</a></li>
              <li><a href="#" className="hover:text-gold transition-colors text-left block">14-Day Return Rules</a></li>
              <li><a href="#" className="hover:text-gold transition-colors text-left block">Garment & Accessory Care</a></li>
            </ul>
          </div>

          {/* Column 4: Location Contact Info */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-burgundy">
              Atelier Info
            </h3>
            <ul className="flex flex-col gap-4 text-xs sm:text-sm text-gray-400 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>
                  Unit 12, Ground Floor, DLF Emporio,<br />
                  Nelson Mandela Marg, Vasant Kunj,<br />
                  New Delhi, India - 110070
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>1800 572 4000 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>concierge@velvetcrown.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
          
          <div className="flex flex-col gap-2 order-2 md:order-1">
            <div className="flex items-center space-x-6 mb-1">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">Fast Delivery</span>
              </div>
            </div>
            <span>© {new Date().getFullYear()} Velvet Crown Atelier. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <div className="flex items-center gap-1.5 text-gold">
              <ShieldCheck className="w-4 h-4" />
              <span>PCI-DSS Secured Payment Checkout Gateway</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Sale</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

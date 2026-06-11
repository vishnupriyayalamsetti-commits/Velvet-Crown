/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useShop } from '../contexts/ShopContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-xl border backdrop-blur-md bg-white/95 text-gray-900 border-gray-150`}
          >
            {toast.type === 'success' && (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-pink shrink-0 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <p className="text-sm font-sans font-medium text-gray-900">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

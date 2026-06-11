/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  // Let's set target to 18 hours from the moment the user opens it, then keep it ticking downwards.
  const [timeLeft, setTimeLeft] = useState({
    hours: 17,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const totalSeconds = 17 * 3600 + 59 * 60 + 59;
    let initialCount = totalSeconds;

    const interval = setInterval(() => {
      if (initialCount <= 0) {
        clearInterval(interval);
        return;
      }
      initialCount -= 1;
      const h = Math.floor(initialCount / 3600);
      const m = Math.floor((initialCount % 3600) / 60);
      const s = initialCount % 60;

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-3 justify-center sm:justify-start">
      <div className="flex flex-col items-center">
        <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center font-sans font-bold text-lg sm:text-2xl shadow-inner shadow-black/10">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-[10px] uppercase font-sans tracking-widest text-[#FFF]/70 mt-1 font-medium">Hrs</span>
      </div>
      <span className="text-white font-bold text-xl sm:text-2xl -mt-5">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center font-sans font-bold text-lg sm:text-2xl shadow-inner shadow-black/10">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-[10px] uppercase font-sans tracking-widest text-[#FFF]/70 mt-1 font-medium">Min</span>
      </div>
      <span className="text-white font-bold text-xl sm:text-2xl -mt-5">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-white/10 backdrop-blur-md text-gold border border-gold/30 rounded-lg w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center font-sans font-bold text-lg sm:text-2xl shadow-inner shadow-black/10">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-[10px] uppercase font-sans tracking-widest text-gold mt-1 font-medium">Sec</span>
      </div>
    </div>
  );
};

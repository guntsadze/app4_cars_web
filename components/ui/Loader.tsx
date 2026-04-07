"use client";

import { Car } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* ცენტრალური ანიმაციური ნაწილი */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* გარეთა მბრუნავი რგოლი (Progress) */}
          <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-red-500 animate-spin shadow-[0_0_15px_rgba(239,68,68,0.4)]" />

          {/* შიდა სტატიკური რგოლი (Background) */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />

          {/* მანქანის აიკონი ცენტრში */}
          <div className="relative z-10 animate-pulse">
            <Car
              size={40}
              className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
            />
          </div>
        </div>

        {/* ტექსტური ნაწილი */}
        <div className="flex flex-col items-center">
          <span className="text-white font-bold tracking-widest text-lg italic uppercase">
            APP4
          </span>
          <div className="mt-2 flex gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

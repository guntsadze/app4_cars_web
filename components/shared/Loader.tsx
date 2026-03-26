"use client";

import { Car } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
        {/* კონტეინერი სპინერისთვის და აიკონისთვის */}
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* გარეთა მბრუნავი რგოლი (Spinner) */}
          <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>

          {/* შიდა სტატიკური რგოლი (BG circle) */}
          <div className="absolute inset-0 border-4 border-slate-700 rounded-full opacity-30"></div>

          {/* მანქანის აიკონი ცენტრში */}
          <Car className="w-10 h-10 text-indigo-500 animate-pulse" />
        </div>

        {/* სურვილისამებრ შეგიძლია ტექსტიც დაამატო */}
        <span className="mt-4 text-xs font-medium text-slate-400 uppercase tracking-widest animate-pulse">
          იტვირთება...
        </span>
      </div>
    </div>
  );
};

export default Loader;

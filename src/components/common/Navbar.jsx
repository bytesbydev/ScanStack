
import React from "react";
import { FileCheck } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <FileCheck
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              aria-hidden="true"
            />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              ScanStack
            </h1>

            <p className="text-[10px] sm:text-xs text-gray-500">
              Resume Analysis
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

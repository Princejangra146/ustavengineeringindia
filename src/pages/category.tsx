// src/components/CategoryBar.tsx
import React from 'react';

interface CategoryBarProps {
  isScrolled: boolean;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ isScrolled }) => {
  return (
    <div className={`sticky top-[104px] z-30 border-t border-gray-100 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-sm' 
        : 'bg-white'
    }`} style={{
      WebkitBackdropFilter: isScrolled ? 'blur(4px)' : 'none',
      backdropFilter: isScrolled ? 'blur(4px)' : 'none'
    }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex-shrink-0 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
            All Categories
          </button>
          {[
            'AVR', 'Safety Unit', 'Solenoid', 'Battery Charger', 'Diode',
            'LLOP', 'RRA', 'Level Switch', 'Hardness Wire', 'Stop Unit'
          ].map((category) => (
            <button 
              key={category}
              className="flex-shrink-0 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 whitespace-nowrap transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
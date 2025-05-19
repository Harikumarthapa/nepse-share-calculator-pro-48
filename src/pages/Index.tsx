
import React from 'react';
import NEPSECalculator from '@/components/NEPSECalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-[80%] mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-nepse-blue">NEPSE Transaction Calculator</h1>
        </header>
        
        <NEPSECalculator />
        
        <div className="mt-8 space-y-4 text-center text-sm text-gray-600">
          <p>This calculator follows official SEBON/NEPSE guidelines for all fee calculations.</p>
          <p>
            <a 
              href="https://github.com/yourusername/nepse-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nepse-blue hover:underline"
            >
              View Source Code
            </a> | <a 
              href="mailto:contact@sharecalculator.app"
              className="text-nepse-blue hover:underline"
            >
              Report Issues
            </a> | <a 
              href="https://sharecalculator.app/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nepse-blue hover:underline"
            >
              Share Calculator App
            </a>
          </p>
          <p>© 2024 Share Calculator. All rates based on current SEBON/NEPSE official guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React from 'react';
import NEPSECalculator from '@/components/NEPSECalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <NEPSECalculator />
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 NEPSE Transaction Calculator. All rates based on current SEBON/NEPSE official guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

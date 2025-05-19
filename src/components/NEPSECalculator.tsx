
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationInputs, CalculationResults } from './nepse-calculator/types';
import { calculateResults } from './nepse-calculator/utils';
import TransactionForm from './nepse-calculator/TransactionForm';
import ResultsDisplay from './nepse-calculator/ResultsDisplay';
import EmbedInfo from './nepse-calculator/EmbedInfo';
import EducationalContent from './nepse-calculator/EducationalContent';

const NEPSECalculator: React.FC = () => {
  // Initial state for inputs with blank values
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: null,
    buyPrice: null,
    sellPrice: null,
    investorType: 'individual',
    holdingDuration: 366,
    includeDpCharge: true,
  });

  // State for calculation results
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Handle input changes
  const handleInputChange = (name: keyof CalculationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Reset form
  const handleReset = () => {
    setInputs({
      transactionType: 'buy',
      quantity: null,
      buyPrice: null,
      sellPrice: null,
      investorType: 'individual',
      holdingDuration: 366,
      includeDpCharge: true,
    });
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    setResults(calculateResults(inputs));
  }, [inputs]);

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="bg-nepse-blue text-white">
        <CardTitle className="text-xl font-bold">Share Calculator - Buy & Sell</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Main Calculator Section - Always 2 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
            <TransactionForm 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              handleReset={handleReset}
            />
          </div>
          
          {/* Results Column - Always render but show placeholders when no data */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">Calculation Results</h2>
            <ResultsDisplay results={results} inputs={inputs} />
          </div>
        </div>
        
        {/* Sections below the calculator - Always visible */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Why is my profit different from other calculators?</h3>
              <p className="text-sm text-gray-600 mt-1">Results may differ between calculators due to different rounding methods for tax calculations, whether DP charges are included, how broker commission slabs are applied, and whether all regulatory fees are included. This calculator follows the latest NEPSE guidelines and includes all applicable fees and taxes.</p>
            </div>
            <div>
              <h3 className="font-medium">What is WACC price?</h3>
              <p className="text-sm text-gray-600 mt-1">WACC (Weighted Average Cost of Capital) price in the context of NEPSE refers to the average price at which you acquired shares of a company, including all transaction costs.</p>
            </div>
            <div>
              <h3 className="font-medium">How is ROI calculated?</h3>
              <p className="text-sm text-gray-600 mt-1">ROI (Return on Investment) is calculated as: ROI = (Net Profit / Total Cost of Investment) × 100%. This calculator accounts for all fees and taxes to give you the most accurate ROI figure.</p>
            </div>
            <div>
              <h3 className="font-medium">What are the latest NEPSE trading hours?</h3>
              <p className="text-sm text-gray-600 mt-1">NEPSE trading sessions currently run from Sunday to Thursday, 11:00 AM to 3:00 PM Nepal time. The market remains closed on Fridays, Saturdays, and public holidays.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">Embed This Calculator</h2>
          <EmbedInfo />
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">About NEPSE Share Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">What is the Share Calculator App?</h3>
              <p className="text-sm text-gray-600 mt-1">This calculator follows official SEBON/NEPSE guidelines for all fee calculations. It provides accurate estimates of transaction costs, capital gains tax, and potential profit/loss for NEPSE listed securities.</p>
            </div>
            <EducationalContent />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

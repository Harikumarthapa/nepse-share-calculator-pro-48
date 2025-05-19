
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationInputs, CalculationResults } from './nepse-calculator/types';
import { calculateResults } from './nepse-calculator/utils';
import TransactionForm from './nepse-calculator/TransactionForm';
import ResultsDisplay from './nepse-calculator/ResultsDisplay';
import EmbedInfo from './nepse-calculator/EmbedInfo';
import EducationalContent from './nepse-calculator/EducationalContent';
import { useIsMobile } from '@/hooks/use-mobile';

const NEPSECalculator: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Initial state for inputs with blank values
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: 0,
    buyPrice: 0,
    sellPrice: 0,
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
      quantity: 0,
      buyPrice: 0,
      sellPrice: 0,
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
        <CardTitle className="text-xl font-bold">Calculate costs, taxes, and profit/loss</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-6'}`}>
          {/* Input Column */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
            <TransactionForm 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              handleReset={handleReset}
            />
            
            {/* Educational Content - Only shown on desktop view in input column */}
            {!isMobile && (
              <div className="mt-6">
                <EducationalContent />
              </div>
            )}
          </div>
          
          {/* Results Column */}
          <div className="space-y-6">
            {results && (
              <ResultsDisplay results={results} inputs={inputs} />
            )}
            
            {/* EmbedInfo - Only shown on desktop view in results column */}
            {!isMobile && <EmbedInfo />}
          </div>
        </div>
        
        {/* Mobile-only sections at the bottom */}
        {isMobile && (
          <>
            <div className="mt-8">
              <EmbedInfo />
            </div>
            <div className="mt-6">
              <EducationalContent />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

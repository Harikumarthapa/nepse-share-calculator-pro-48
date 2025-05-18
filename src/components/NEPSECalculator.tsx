
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationInputs, CalculationResults } from './nepse-calculator/types';
import { calculateResults } from './nepse-calculator/utils';
import TransactionForm from './nepse-calculator/TransactionForm';
import ResultsDisplay from './nepse-calculator/ResultsDisplay';
import EmbedInfo from './nepse-calculator/EmbedInfo';

const NEPSECalculator: React.FC = () => {
  // Initial state for inputs
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: 10,
    buyPrice: 100,
    sellPrice: 110,
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
      quantity: 10,
      buyPrice: 100,
      sellPrice: 110,
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
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-nepse-blue text-white">
        <CardTitle className="text-2xl font-bold">NEPSE Transaction Calculator</CardTitle>
        <CardDescription className="text-white/80">
          Calculate costs, taxes, and profit/loss for NEPSE share transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <TransactionForm 
          inputs={inputs} 
          handleInputChange={handleInputChange}
          handleReset={handleReset}
        />
        
        {/* Results Section */}
        {results && (
          <ResultsDisplay results={results} inputs={inputs} />
        )}
        
        {/* Embed Information */}
        <EmbedInfo />
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

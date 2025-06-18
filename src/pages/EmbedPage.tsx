import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TransactionForm from '../components/nepse-calculator/TransactionForm';
import ResultsDisplay from '../components/nepse-calculator/ResultsDisplay';
import { CalculationInputs, CalculationResults } from '../components/nepse-calculator/types';
import { calculateResults } from '../components/nepse-calculator/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const EmbedPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Initial state for inputs with default values
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: 100,
    buyPrice: 100,
    sellPrice: 120,
    investorType: 'individual',
    selectedCgtRate: 0.05, // Default to 5% (Individual, ≥365 days)
    includeDpCharge: true,
    transactionFees: null,
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
      quantity: 100,
      buyPrice: 100,
      sellPrice: 120,
      investorType: 'individual',
      selectedCgtRate: 0.05, // Default to 5% (Individual, ≥365 days)
      includeDpCharge: true,
      transactionFees: null,
    });
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    setResults(calculateResults(inputs));
  }, [inputs]);

  return (
    <div className="p-3 sm:p-4 bg-gray-100 min-h-screen">
      <Card className="shadow-md max-w-4xl mx-auto">
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-4">{t('calculator.transaction.details')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Column */}
            <div className="space-y-4">
              <TransactionForm 
                inputs={inputs} 
                handleInputChange={handleInputChange}
                handleReset={handleReset}
              />
            </div>
            
            {/* Results Column */}
            <div className="space-y-4">
              <ResultsDisplay results={results} inputs={inputs} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-right mt-2 text-xs text-gray-500">
        <a href="https://sharecalculator.app" target="_blank" rel="noopener noreferrer" className="hover:underline text-nepse-blue">
          Powered by Share Calculator App
        </a>
      </div>
    </div>
  );
};

export default EmbedPage;

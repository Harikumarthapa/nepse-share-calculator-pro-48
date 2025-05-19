
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationInputs, CalculationResults } from './nepse-calculator/types';
import { calculateResults } from './nepse-calculator/utils';
import TransactionForm from './nepse-calculator/TransactionForm';
import ResultsDisplay from './nepse-calculator/ResultsDisplay';
import EmbedInfo from './nepse-calculator/EmbedInfo';
import EducationalContent from './nepse-calculator/EducationalContent';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const NEPSECalculator: React.FC = () => {
  const { t } = useLanguage();
  
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
      <CardHeader className="bg-nepse-blue text-white flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-bold">{t('calculator.title')}</CardTitle>
        <LanguageToggle />
      </CardHeader>
      <CardContent className="p-6">
        {/* Main Calculator Section - Always 2 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">{t('calculator.transaction.details')}</h2>
            <TransactionForm 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              handleReset={handleReset}
            />
          </div>
          
          {/* Results Column - Always render but show placeholders when no data */}
          <div className="space-y-6">
            <ResultsDisplay results={results} inputs={inputs} />
          </div>
        </div>
        
        {/* Sections below the calculator - Always visible */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <EmbedInfo />
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <EducationalContent />
        </div>
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

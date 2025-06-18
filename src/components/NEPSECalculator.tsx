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
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const NEPSECalculator: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Initial state for inputs with blank values
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: null,
    buyPrice: null,
    sellPrice: null,
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
      quantity: null,
      buyPrice: null,
      sellPrice: null,
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
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="bg-nepse-blue text-white flex flex-row justify-between items-center p-4 sm:p-6">
  <h2 className="text-lg sm:text-xl font-bold">
    {t('calculator.title')}
  </h2>
  <LanguageToggle />
</CardHeader>
      <CardContent className="p-4 sm:p-6">
        
        {/* Main Calculator Section - Always 2 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">{t('calculator.transaction.details')}</h3>
            <TransactionForm 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              handleReset={handleReset}
            />
          </div>
          
          {/* Results Column - Always render but show placeholders when no data */}
          <div className="space-y-4 sm:space-y-6">
            <ResultsDisplay results={results} inputs={inputs} />
            {/* Move Reset button here on mobile */}
            {isMobile && (
              <div className="mt-4">
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="w-full text-sm h-9"
                >
                  {t('reset')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Sections below the calculator - Always visible */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <EmbedInfo />
        </div>
        
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <EducationalContent />
        </div>
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

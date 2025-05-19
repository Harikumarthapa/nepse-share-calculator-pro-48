
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationInputs, CalculationResults } from './nepse-calculator/types';
import { calculateResults } from './nepse-calculator/utils';
import TransactionForm from './nepse-calculator/TransactionForm';
import ResultsDisplay from './nepse-calculator/ResultsDisplay';
import EmbedInfo from './nepse-calculator/EmbedInfo';
import EducationalContent from './nepse-calculator/EducationalContent';
import { useLanguage } from '@/contexts/LanguageContext';

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
      <CardHeader className="bg-nepse-blue text-white">
        <CardTitle className="text-xl font-bold">{t('shareCalculator')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Main Calculator Section - Always 2 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">{t('transactionDetails')}</h2>
            <TransactionForm 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              handleReset={handleReset}
            />
          </div>
          
          {/* Results Column - Always render but show placeholders when no data */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">{t('calculationResults')}</h2>
            <ResultsDisplay results={results} inputs={inputs} />
          </div>
        </div>
        
        {/* Sections below the calculator - Always visible */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">{t('faq')}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('whyDifferent')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('whyDifferentAnswer')}</p>
            </div>
            <div>
              <h3 className="font-medium">{t('waccPrice')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('waccPriceAnswer')}</p>
            </div>
            <div>
              <h3 className="font-medium">{t('roiCalculation')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('roiCalculationAnswer')}</p>
            </div>
            <div>
              <h3 className="font-medium">{t('tradingHours')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('tradingHoursAnswer')}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">{t('embedCalculator')}</h2>
          <EmbedInfo />
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">{t('aboutNepseCalculator')}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('whatIsCalculator')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('whatIsCalculatorAnswer')}</p>
            </div>
            <EducationalContent />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

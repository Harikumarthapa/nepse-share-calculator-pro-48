
import React from 'react';
import { CalculationInputs } from '../types';
import { formatCurrency } from '../utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface InputSummaryProps {
  inputs: CalculationInputs;
}

const InputSummary: React.FC<InputSummaryProps> = ({ inputs }) => {
  const { t } = useLanguage();
  
  // Helper function to get CGT rate display text
  const getCgtRateDisplayText = (rate: number) => {
    switch (rate) {
      case 0.05:
        return '5%';
      case 0.075:
        return '7.5%';
      case 0.10:
        return '10%';
      default:
        return `${(rate * 100).toFixed(1)}%`;
    }
  };
  
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">{t('input.summary')}</h4>
      <div className="bg-nepse-gray p-4 rounded-md grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="block text-nepse-darkgray">{t('transaction.type')}</span>
          <span className="font-medium">{inputs.transactionType === 'buy' ? t('buy') : t('sell')}</span>
        </div>
        <div>
          <span className="block text-nepse-darkgray">{t('quantity')}</span>
          <span className="font-medium">{inputs.quantity || '-'}</span>
        </div>
        <div>
          <span className="block text-nepse-darkgray">{t('price')}</span>
          <span className="font-medium">
            {inputs.transactionType === 'buy' ? 
              (inputs.buyPrice ? formatCurrency(inputs.buyPrice) : '-') : 
              (inputs.sellPrice ? formatCurrency(inputs.sellPrice) : '-')}
          </span>
        </div>
        {inputs.transactionType === 'sell' && (
          <>
            <div>
              <span className="block text-nepse-darkgray">{t('buy.price')}</span>
              <span className="font-medium">{inputs.buyPrice ? formatCurrency(inputs.buyPrice) : '-'}</span>
            </div>
            <div>
              <span className="block text-nepse-darkgray">{t('capital.gains.tax')}</span>
              <span className="font-medium">{getCgtRateDisplayText(inputs.selectedCgtRate)}</span>
            </div>
          </>
        )}
        <div>
          <span className="block text-nepse-darkgray">{t('investor.type')}</span>
          <span className="font-medium">{inputs.investorType === 'individual' ? t('individual') : t('institutional')}</span>
        </div>
        {inputs.transactionFees && inputs.transactionFees > 0 && (
          <div>
            <span className="block text-nepse-darkgray">Transaction Fees</span>
            <span className="font-medium">{formatCurrency(inputs.transactionFees)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSummary;

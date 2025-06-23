
import React from 'react';
import { ArrowUp, ArrowDown } from "lucide-react";
import { CalculationInputs, CalculationResults } from '../types';
import { formatCurrency, formatPercentage } from '../utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinalResultProps {
  results: CalculationResults | null;
  inputs: CalculationInputs;
}

const FinalResult: React.FC<FinalResultProps> = ({ results, inputs }) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">{t('final.result')}</h4>
      <div className="bg-nepse-blue text-white p-4 rounded-md space-y-3">
        {inputs.transactionType === 'buy' ? (
          <>
            <div className="flex justify-between">
              <span>{t('total.cost.final')}</span>
              <span className="font-medium">
                {(results?.totalAmount !== undefined && 
                  results?.brokerCommission !== undefined && 
                  results?.nepseLevy !== undefined &&
                  results?.sebonRegulatoryFee !== undefined &&
                  results?.sebonFee !== undefined && 
                  results?.dpCharge !== undefined) ? 
                  formatCurrency(
                    results.totalAmount + results.brokerCommission + (results.nepseLevy || 0) + (results.sebonRegulatoryFee || 0) + results.sebonFee + results.dpCharge + (results.transactionFees || 0)
                  ) : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('cost.per.share.final')}</span>
              <span className="font-medium">{results?.costPerShare ? formatCurrency(results.costPerShare) : '-'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span>{t('net.receivable')}</span>
              <span className="font-medium">{results?.netReceivable ? formatCurrency(results.netReceivable) : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Capital Gain (Before Tax)</span>
              <span className={`font-medium flex items-center ${
                results?.profitLoss && results.profitLoss > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {results?.profitLoss ? formatCurrency(results.profitLoss) : '-'}
                {results?.profitLoss ? (
                  results.profitLoss > 0 ? (
                    <ArrowUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 h-4 w-4" />
                  )
                ) : null}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Net Profit (After Tax)</span>
              <span className={`font-medium ${
                results?.netProfitAfterTax && results.netProfitAfterTax > 0 ? 'text-green-300' : 'text-red-300'
              }`}>{results?.netProfitAfterTax ? formatCurrency(results.netProfitAfterTax) : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('roi')}</span>
              <span className={`font-medium ${
                results?.roi && results.roi > 0 ? 'text-green-300' : 'text-red-300'
              }`}>{results?.roi ? formatPercentage(results.roi) : '-'}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalResult;

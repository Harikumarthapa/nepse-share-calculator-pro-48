
import React from 'react';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculationResults } from '../types';
import { formatCurrency } from '../utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeeBreakdownProps {
  results: CalculationResults | null;
}

const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ results }) => {
  const { t } = useLanguage();
  
  const totalFees = (results?.brokerCommission || 0) + 
                   (results?.sebonFee || 0) + 
                   (results?.dpCharge || 0) + 
                   (results?.transactionFees || 0);
  
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">{t('fee.breakdown')}</h4>
      <div className="bg-nepse-gray p-4 rounded-md space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">{t('transaction.value')}</span>
          <span className="font-medium">{results?.totalAmount ? formatCurrency(results.totalAmount) : '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray flex items-center">
            {t('broker.commission')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Commission rates:<br />
                  0.36% up to रू 50,000<br />
                  0.33% for रू 50,000–500,000<br />
                  0.31% for रू 500,000–2,000,000<br />
                  0.27% for रू 2,000,000–10,000,000<br />
                  0.24% above रू 10,000,000</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span className="font-medium">{results?.brokerCommission ? formatCurrency(results.brokerCommission) : '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray flex items-center">
            {t('sebon.fee')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>SEBON Fee: 0.015% of transaction amount</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span className="font-medium">{results?.sebonFee ? formatCurrency(results.sebonFee) : '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">{t('dp.charge')}</span>
          <span className="font-medium">{results?.dpCharge ? formatCurrency(results.dpCharge) : '-'}</span>
        </div>
        {results?.transactionFees && results.transactionFees > 0 && (
          <div className="flex justify-between">
            <span className="text-nepse-darkgray">Transaction Fees</span>
            <span className="font-medium">{formatCurrency(results.transactionFees)}</span>
          </div>
        )}
        <div className="border-t border-gray-300 pt-3 flex justify-between font-medium">
          <span>{t('total.cost')}</span>
          <span>{totalFees > 0 ? formatCurrency(totalFees) : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default FeeBreakdown;

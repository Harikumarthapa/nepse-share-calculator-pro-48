
import React from 'react';
import { ArrowUp, ArrowDown } from "lucide-react";
import { CalculationInputs, CalculationResults } from '../types';
import { formatCurrency, formatPercentage } from '../utils';

interface FinalResultProps {
  results: CalculationResults | null;
  inputs: CalculationInputs;
}

const FinalResult: React.FC<FinalResultProps> = ({ results, inputs }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Final Result</h4>
      <div className="bg-nepse-blue text-white p-4 rounded-md space-y-3">
        {inputs.transactionType === 'buy' ? (
          <>
            <div className="flex justify-between">
              <span>Total Cost</span>
              <span className="font-medium">
                {(results?.totalAmount !== undefined && 
                  results?.brokerCommission !== undefined && 
                  results?.sebonFee !== undefined && 
                  results?.dpCharge !== undefined) ? 
                  formatCurrency(
                    results.totalAmount + results.brokerCommission + results.sebonFee + results.dpCharge,
                    'रू'
                  ) : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cost Per Share</span>
              <span className="font-medium">{results?.costPerShare ? formatCurrency(results.costPerShare, 'रू') : '-'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span>Net Receivable</span>
              <span className="font-medium">{results?.netReceivable ? formatCurrency(results.netReceivable, 'रू') : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Profit/Loss</span>
              <span className={`font-medium flex items-center ${
                results?.profitLoss && results.profitLoss > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {results?.profitLoss ? formatCurrency(results.profitLoss, 'रू') : '-'}
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
              <span>ROI</span>
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

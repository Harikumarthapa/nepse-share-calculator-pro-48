
import React from 'react';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculationInputs, CalculationResults } from '../types';
import { formatCurrency } from '../utils';

interface TaxCalculationProps {
  results: CalculationResults | null;
  inputs: CalculationInputs;
}

const TaxCalculation: React.FC<TaxCalculationProps> = ({ results, inputs }) => {
  if (inputs.transactionType !== 'sell') {
    return null;
  }

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Tax Calculation</h4>
      <div className="bg-nepse-gray p-4 rounded-md space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">Total Cost of Acquisition</span>
          <span className="font-medium">
            {results?.totalCostOfAcquisition ? formatCurrency(results.totalCostOfAcquisition, 'रू') : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">Net Selling Price</span>
          <span className="font-medium">
            {results?.netSellingPrice ? formatCurrency(results.netSellingPrice, 'रू') : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">Capital Gain/Loss</span>
          <span className={`font-medium ${results?.profitLoss && results.profitLoss > 0 ? 'text-nepse-green' : 'text-nepse-red'}`}>
            {results?.profitLoss ? formatCurrency(results.profitLoss, 'रू') : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray flex items-center">
            Capital Gains Tax
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>CGT Rates:<br />
                  Individual, ≥365 days: 5%<br />
                  Individual, &lt;365 days: 7.5%<br />
                  Institutional: 10%<br />
                  No tax on capital loss</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span className="font-medium">{results?.capitalGainsTax ? formatCurrency(results.capitalGainsTax, 'रू') : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculation;

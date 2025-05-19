
import React from 'react';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculationResults } from '../types';
import { formatCurrency } from '../utils';

interface FeeBreakdownProps {
  results: CalculationResults | null;
}

const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ results }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-nepse-darkgray mb-2">Fee Breakdown</h3>
      <div className="bg-nepse-gray p-4 rounded-md space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-nepse-darkgray">Total Amount</span>
          <span className="font-medium">{results?.totalAmount ? formatCurrency(results.totalAmount) : '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-nepse-darkgray flex items-center">
            Broker Commission
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
            SEBON Fee
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
          <span className="text-nepse-darkgray">DP Charge</span>
          <span className="font-medium">{results?.dpCharge ? formatCurrency(results.dpCharge) : '-'}</span>
        </div>
        <div className="border-t border-gray-300 pt-3 flex justify-between font-medium">
          <span>Total Fees</span>
          <span>
            {(results?.brokerCommission !== undefined && results?.sebonFee !== undefined && results?.dpCharge !== undefined) ? 
              formatCurrency(results.brokerCommission + results.sebonFee + results.dpCharge) : 
              '-'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeeBreakdown;

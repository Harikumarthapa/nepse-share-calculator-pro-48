
import React from 'react';
import { CalculationInputs } from '../types';
import { formatCurrency } from '../utils';

interface InputSummaryProps {
  inputs: CalculationInputs;
}

const InputSummary: React.FC<InputSummaryProps> = ({ inputs }) => {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Input Summary</h4>
      <div className="bg-nepse-gray p-4 rounded-md grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="block text-nepse-darkgray">Transaction</span>
          <span className="font-medium">{inputs.transactionType === 'buy' ? 'Buy' : 'Sell'}</span>
        </div>
        <div>
          <span className="block text-nepse-darkgray">Quantity</span>
          <span className="font-medium">{inputs.quantity || '-'}</span>
        </div>
        <div>
          <span className="block text-nepse-darkgray">Price</span>
          <span className="font-medium">
            {inputs.transactionType === 'buy' ? 
              (inputs.buyPrice ? formatCurrency(inputs.buyPrice) : '-') : 
              (inputs.sellPrice ? formatCurrency(inputs.sellPrice) : '-')}
          </span>
        </div>
        {inputs.transactionType === 'sell' && (
          <>
            <div>
              <span className="block text-nepse-darkgray">Buy Price</span>
              <span className="font-medium">{inputs.buyPrice ? formatCurrency(inputs.buyPrice) : '-'}</span>
            </div>
            <div>
              <span className="block text-nepse-darkgray">Holding Period</span>
              <span className="font-medium">{inputs.holdingDuration} days</span>
            </div>
          </>
        )}
        <div>
          <span className="block text-nepse-darkgray">Investor Type</span>
          <span className="font-medium">{inputs.investorType === 'individual' ? 'Individual' : 'Institutional'}</span>
        </div>
      </div>
    </div>
  );
};

export default InputSummary;

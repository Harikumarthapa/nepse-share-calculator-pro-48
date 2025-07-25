
// Types for our NEPSE calculator
export interface CalculationInputs {
  transactionType: 'buy' | 'sell';
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  investorType: 'individual' | 'institutional';
  selectedCgtRate: number;
  includeDpCharge: boolean;
  transactionFees?: number;
}

export interface CalculationResults {
  totalAmount: number;
  brokerCommission: number;
  sebonFee: number;
  dpCharge: number;
  costPerShare: number;
  capitalGainsTax?: number;
  profitLoss?: number;
  roi?: number;
  netReceivable?: number;
  totalCostOfAcquisition?: number;
  netSellingPrice?: number;
  transactionFees?: number;
}

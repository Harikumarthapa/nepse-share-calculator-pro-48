
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
  profitLoss?: number; // Capital gain BEFORE tax
  roi?: number;
  netReceivable?: number;
  totalCostOfAcquisition?: number;
  netSellingPrice?: number;
  transactionFees?: number;
  nepseLevy?: number;
  sebonRegulatoryFee?: number;
  netProfitAfterTax?: number; // Net profit AFTER tax
}

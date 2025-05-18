
import { BROKER_COMMISSION_THRESHOLDS, BROKER_COMMISSION_RATES, SEBON_FEE_RATE, DP_CHARGE } from './constants';
import { CalculationInputs, CalculationResults } from './types';

// Calculate broker commission based on amount
export const calculateBrokerCommission = (amount: number): number => {
  if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER1) {
    return amount * BROKER_COMMISSION_RATES.TIER1;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER2) {
    return amount * BROKER_COMMISSION_RATES.TIER2;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER3) {
    return amount * BROKER_COMMISSION_RATES.TIER3;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER4) {
    return amount * BROKER_COMMISSION_RATES.TIER4;
  } else {
    return amount * BROKER_COMMISSION_RATES.TIER5;
  }
};

// Calculate SEBON fee
export const calculateSEBONFee = (amount: number): number => {
  return amount * SEBON_FEE_RATE; // 0.015%
};

// Calculate capital gains tax using the rate from inputs
export const calculateCGT = (profit: number, taxRate: number): number => {
  if (profit <= 0) return 0; // No CGT on loss
  return profit * taxRate;
};

// Calculate results based on inputs
export const calculateResults = (inputs: CalculationInputs): CalculationResults | null => {
  const { transactionType, quantity, buyPrice, sellPrice, includeDpCharge, capitalGainsTaxRate } = inputs;
  
  // Validate inputs
  if (!quantity || quantity <= 0 || (transactionType === 'buy' && !buyPrice) || (transactionType === 'sell' && (!buyPrice || !sellPrice))) {
    return null;
  }

  let totalAmount, brokerCommission, sebonFee, dpCharge, costPerShare, capitalGainsTax, profitLoss, roi, netReceivable, totalCostOfAcquisition, netSellingPrice;
  
  // Calculate based on transaction type
  if (transactionType === 'buy') {
    totalAmount = quantity * buyPrice;
    brokerCommission = calculateBrokerCommission(totalAmount);
    sebonFee = calculateSEBONFee(totalAmount);
    dpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    const totalCost = totalAmount + brokerCommission + sebonFee + dpCharge;
    costPerShare = totalCost / quantity;
    
    return {
      totalAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare,
    };
  } else { // Sell calculation
    // Buy-side calculations
    const buyAmount = quantity * buyPrice;
    const buyBrokerCommission = calculateBrokerCommission(buyAmount);
    const buySebonFee = calculateSEBONFee(buyAmount);
    const buyDpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    // Total cost of acquisition
    totalCostOfAcquisition = buyAmount + buyBrokerCommission + buySebonFee + buyDpCharge;
    
    // Sell-side calculations
    const sellAmount = quantity * sellPrice;
    brokerCommission = calculateBrokerCommission(sellAmount);
    sebonFee = calculateSEBONFee(sellAmount);
    dpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    // Net selling price
    netSellingPrice = sellAmount - brokerCommission - sebonFee - dpCharge;
    
    // Calculate profit/loss based on the correct capital gain formula
    profitLoss = netSellingPrice - totalCostOfAcquisition;
    
    // Calculate capital gains tax if profit, using the tax rate from inputs
    capitalGainsTax = calculateCGT(profitLoss, capitalGainsTaxRate);
    
    // Final net receivable amount
    netReceivable = netSellingPrice - capitalGainsTax;
    
    // Calculate ROI
    roi = ((netReceivable - totalCostOfAcquisition) / totalCostOfAcquisition) * 100;
    
    return {
      totalAmount: sellAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare: buyPrice,
      capitalGainsTax,
      profitLoss,
      roi,
      netReceivable,
      totalCostOfAcquisition,
      netSellingPrice
    };
  }
};

// Format number as currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number as percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

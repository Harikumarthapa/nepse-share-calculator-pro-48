
import { BROKER_COMMISSION_THRESHOLDS, BROKER_COMMISSION_RATES, SEBON_FEE_RATE, DP_CHARGE, NEPSE_LEVY_RATE, SEBON_REGULATORY_FEE_RATE } from './constants';
import { CalculationInputs, CalculationResults } from './types';

// Round to 2 decimal places using round-half-up rule
export const roundToTwoDecimals = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

// Calculate broker commission based on amount
export const calculateBrokerCommission = (amount: number): number => {
  let commission;
  if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER1) {
    commission = amount * BROKER_COMMISSION_RATES.TIER1;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER2) {
    commission = amount * BROKER_COMMISSION_RATES.TIER2;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER3) {
    commission = amount * BROKER_COMMISSION_RATES.TIER3;
  } else if (amount <= BROKER_COMMISSION_THRESHOLDS.TIER4) {
    commission = amount * BROKER_COMMISSION_RATES.TIER4;
  } else {
    commission = amount * BROKER_COMMISSION_RATES.TIER5;
  }
  return roundToTwoDecimals(commission);
};

// Calculate NEPSE levy (15% of brokerage)
export const calculateNEPSELevy = (brokerage: number): number => {
  return roundToTwoDecimals(brokerage * NEPSE_LEVY_RATE);
};

// Calculate SEBON regulatory fee (2.5% of brokerage)
export const calculateSEBONRegulatoryFee = (brokerage: number): number => {
  return roundToTwoDecimals(brokerage * SEBON_REGULATORY_FEE_RATE);
};

// Calculate SEBON fee
export const calculateSEBONFee = (amount: number): number => {
  return roundToTwoDecimals(amount * SEBON_FEE_RATE); // 0.015%
};

// Calculate capital gains tax
export const calculateCGT = (profit: number, rate: number): number => {
  if (profit <= 0) return 0; // No CGT on loss
  return roundToTwoDecimals(profit * rate);
};

// Calculate results based on inputs
export const calculateResults = (inputs: CalculationInputs): CalculationResults | null => {
  const { transactionType, quantity, buyPrice, sellPrice, selectedCgtRate, includeDpCharge, transactionFees } = inputs;
  
  // Validate inputs
  if (!quantity || quantity <= 0 || (transactionType === 'buy' && !buyPrice) || (transactionType === 'sell' && (!buyPrice || !sellPrice))) {
    return null;
  }

  let totalAmount, brokerCommission, sebonFee, dpCharge, costPerShare, capitalGainsTax, profitLoss, roi, netReceivable, totalCostOfAcquisition, netSellingPrice, nepseLevy, sebonRegulatoryFee;
  
  // Calculate based on transaction type
  if (transactionType === 'buy') {
    totalAmount = roundToTwoDecimals(quantity * buyPrice);
    brokerCommission = calculateBrokerCommission(totalAmount);
    nepseLevy = calculateNEPSELevy(brokerCommission);
    sebonRegulatoryFee = calculateSEBONRegulatoryFee(brokerCommission);
    sebonFee = calculateSEBONFee(totalAmount);
    dpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    const totalCost = roundToTwoDecimals(totalAmount + brokerCommission + nepseLevy + sebonRegulatoryFee + sebonFee + dpCharge + (transactionFees || 0));
    costPerShare = roundToTwoDecimals(totalCost / quantity);
    
    return {
      totalAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare,
      transactionFees: transactionFees || 0,
      nepseLevy,
      sebonRegulatoryFee,
    };
  } else { // Sell calculation
    // Buy-side calculations
    const buyAmount = roundToTwoDecimals(quantity * buyPrice);
    const buyBrokerCommission = calculateBrokerCommission(buyAmount);
    const buyNepseLevy = calculateNEPSELevy(buyBrokerCommission);
    const buySebonRegulatoryFee = calculateSEBONRegulatoryFee(buyBrokerCommission);
    const buySebonFee = calculateSEBONFee(buyAmount);
    const buyDpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    // Cost of acquisition (for capital-gain purposes) - only buy-side costs
    totalCostOfAcquisition = roundToTwoDecimals(buyAmount + buyBrokerCommission + buyNepseLevy + buySebonRegulatoryFee + buySebonFee + buyDpCharge + (transactionFees || 0));
    
    // Sell-side calculations
    const sellAmount = roundToTwoDecimals(quantity * sellPrice);
    brokerCommission = calculateBrokerCommission(sellAmount);
    nepseLevy = calculateNEPSELevy(brokerCommission);
    sebonRegulatoryFee = calculateSEBONRegulatoryFee(brokerCommission);
    sebonFee = calculateSEBONFee(sellAmount);
    dpCharge = includeDpCharge ? DP_CHARGE : 0;
    totalAmount = sellAmount;
    
    // Net selling price (after all sell-side costs including transaction fees)
    netSellingPrice = roundToTwoDecimals(sellAmount - brokerCommission - nepseLevy - sebonRegulatoryFee - sebonFee - dpCharge - (transactionFees || 0));
    
    // Capital gain/loss BEFORE tax (this is the true capital gain)
    profitLoss = roundToTwoDecimals(netSellingPrice - totalCostOfAcquisition);
    
    // Calculate CGT on the capital gain (before tax)
    capitalGainsTax = calculateCGT(profitLoss, selectedCgtRate);
    
    // Final net receivable after CGT
    netReceivable = roundToTwoDecimals(netSellingPrice - capitalGainsTax);
    
    // Net profit after tax (this is different from capital gain)
    const netProfitAfterTax = roundToTwoDecimals(profitLoss - capitalGainsTax);
    
    // Calculate ROI based on net profit after tax
    roi = roundToTwoDecimals(((netProfitAfterTax) / totalCostOfAcquisition) * 100);
    
    return {
      totalAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare: buyPrice,
      capitalGainsTax,
      profitLoss, // This is capital gain BEFORE tax
      roi,
      netReceivable,
      totalCostOfAcquisition,
      netSellingPrice,
      transactionFees: transactionFees || 0,
      nepseLevy,
      sebonRegulatoryFee,
      netProfitAfterTax, // New field for net profit after tax
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
  }).format(amount).replace('NPR', 'रू');
};

// Format number as percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

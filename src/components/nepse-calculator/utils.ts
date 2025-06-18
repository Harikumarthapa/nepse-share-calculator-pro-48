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

// Calculate capital gains tax
export const calculateCGT = (profit: number, rate: number): number => {
  if (profit <= 0) return 0; // No CGT on loss
  return profit * rate;
};

// Calculate results based on inputs
export const calculateResults = (inputs: CalculationInputs): CalculationResults | null => {
  const { transactionType, quantity, buyPrice, sellPrice, selectedCgtRate, includeDpCharge, transactionFees } = inputs;
  
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
    
    const totalCost = totalAmount + brokerCommission + sebonFee + dpCharge + (transactionFees || 0);
    costPerShare = totalCost / quantity;
    
    return {
      totalAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare,
      transactionFees: transactionFees || 0,
    };
  } else { // Sell calculation
    // Buy-side calculations
    const buyAmount = quantity * buyPrice;
    const buyBrokerCommission = calculateBrokerCommission(buyAmount);
    const buySebonFee = calculateSEBONFee(buyAmount);
    const buyDpCharge = includeDpCharge ? DP_CHARGE : 0;
    
    // Total cost of acquisition (including transaction fees for buy side)
    totalCostOfAcquisition = buyAmount + buyBrokerCommission + buySebonFee + buyDpCharge + (transactionFees || 0);
    
    // Sell-side calculations
    const sellAmount = quantity * sellPrice;
    brokerCommission = calculateBrokerCommission(sellAmount);
    sebonFee = calculateSEBONFee(sellAmount);
    dpCharge = includeDpCharge ? DP_CHARGE : 0;
    totalAmount = sellAmount;
    
    // Net selling price before CGT (transaction fees reduce net proceeds)
    netSellingPrice = sellAmount - brokerCommission - sebonFee - dpCharge - (transactionFees || 0);
    
    // Calculate profit/loss before CGT (based on actual cash flows)
    profitLoss = netSellingPrice - totalCostOfAcquisition;
    
    // Calculate CGT using the selected rate (only on profit, not including transaction fees)
    capitalGainsTax = calculateCGT(profitLoss, selectedCgtRate);
    
    // Final net receivable after CGT
    netReceivable = netSellingPrice - capitalGainsTax;
    
    // Recalculate final profit/loss after CGT
    profitLoss = netReceivable - totalCostOfAcquisition;
    
    // Calculate ROI
    roi = ((netReceivable - totalCostOfAcquisition) / totalCostOfAcquisition) * 100;
    
    return {
      totalAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      costPerShare: buyPrice,
      capitalGainsTax,
      profitLoss,
      roi,
      netReceivable,
      totalCostOfAcquisition,
      netSellingPrice,
      transactionFees: transactionFees || 0
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

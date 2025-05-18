
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, ArrowDown, Info } from "lucide-react";

// Types for our calculator
interface CalculationInputs {
  transactionType: 'buy' | 'sell';
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  investorType: 'individual' | 'institutional';
  holdingDuration: number;
  includeDpCharge: boolean;
}

interface CalculationResults {
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
}

const NEPSECalculator: React.FC = () => {
  // Initial state for inputs
  const [inputs, setInputs] = useState<CalculationInputs>({
    transactionType: 'buy',
    quantity: 10,
    buyPrice: 100,
    sellPrice: 110,
    investorType: 'individual',
    holdingDuration: 366,
    includeDpCharge: true,
  });

  // State for calculation results
  const [results, setResults] = useState<CalculationResults | null>(null);
  
  // Calculate broker commission based on amount
  const calculateBrokerCommission = (amount: number): number => {
    if (amount <= 50000) {
      return amount * 0.0036;
    } else if (amount <= 500000) {
      return amount * 0.0033;
    } else if (amount <= 2000000) {
      return amount * 0.0031;
    } else if (amount <= 10000000) {
      return amount * 0.0027;
    } else {
      return amount * 0.0024;
    }
  };

  // Calculate SEBON fee
  const calculateSEBONFee = (amount: number): number => {
    return amount * 0.00015; // 0.015%
  };

  // Calculate capital gains tax
  const calculateCGT = (profit: number, investorType: string, holdingDuration: number): number => {
    if (profit <= 0) return 0; // No CGT on loss
    
    if (investorType === 'individual') {
      return holdingDuration >= 365 ? profit * 0.05 : profit * 0.075; // 5% for long term, 7.5% for short term
    } else {
      return profit * 0.10; // 10% for institutional
    }
  };

  // Handle input changes
  const handleInputChange = (name: keyof CalculationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Reset form
  const handleReset = () => {
    setInputs({
      transactionType: 'buy',
      quantity: 10,
      buyPrice: 100,
      sellPrice: 110,
      investorType: 'individual',
      holdingDuration: 366,
      includeDpCharge: true,
    });
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    const calculateResults = () => {
      const { transactionType, quantity, buyPrice, sellPrice, investorType, holdingDuration, includeDpCharge } = inputs;
      
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
        dpCharge = includeDpCharge ? 25 : 0;
        
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
        const buyDpCharge = includeDpCharge ? 25 : 0;
        
        // Total cost of acquisition
        totalCostOfAcquisition = buyAmount + buyBrokerCommission + buySebonFee + buyDpCharge;
        
        // Sell-side calculations
        const sellAmount = quantity * sellPrice;
        brokerCommission = calculateBrokerCommission(sellAmount);
        sebonFee = calculateSEBONFee(sellAmount);
        dpCharge = includeDpCharge ? 25 : 0;
        
        // Net selling price
        netSellingPrice = sellAmount - brokerCommission - sebonFee - dpCharge;
        
        // Calculate profit/loss based on the correct capital gain formula
        profitLoss = netSellingPrice - totalCostOfAcquisition;
        
        // Calculate capital gains tax if profit
        capitalGainsTax = calculateCGT(profitLoss, investorType, holdingDuration);
        
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
    
    setResults(calculateResults());
  }, [inputs]);

  // Format number as currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format number as percentage
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-nepse-blue text-white">
        <CardTitle className="text-2xl font-bold">NEPSE Transaction Calculator</CardTitle>
        <CardDescription className="text-white/80">
          Calculate costs, taxes, and profit/loss for NEPSE share transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="buy" value={inputs.transactionType} onValueChange={(value) => handleInputChange('transactionType', value)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buy">Buy Calculation</TabsTrigger>
            <TabsTrigger value="sell">Sell Calculation</TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            {/* Common inputs for both buy and sell */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Share Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1"
                  value={inputs.quantity} 
                  onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buyPrice">Buy Price per Share</Label>
                <Input 
                  id="buyPrice" 
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={inputs.buyPrice} 
                  onChange={(e) => handleInputChange('buyPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              {inputs.transactionType === 'sell' && (
                <div className="space-y-2">
                  <Label htmlFor="sellPrice">Sell Price per Share</Label>
                  <Input 
                    id="sellPrice" 
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={inputs.sellPrice} 
                    onChange={(e) => handleInputChange('sellPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="investorType">Investor Type</Label>
                <Select 
                  value={inputs.investorType} 
                  onValueChange={(value) => handleInputChange('investorType', value)}
                >
                  <SelectTrigger id="investorType">
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {inputs.transactionType === 'sell' && (
                <div className="space-y-2">
                  <Label htmlFor="holdingDuration">
                    Holding Duration (days)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duration affects capital gains tax rate:<br />
                          ≥ 365 days: 5% for individuals<br />
                          &lt; 365 days: 7.5% for individuals<br />
                          Institutional: Always 10%</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input 
                    id="holdingDuration" 
                    type="number"
                    min="1"
                    value={inputs.holdingDuration} 
                    onChange={(e) => handleInputChange('holdingDuration', parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDpCharge" 
                checked={inputs.includeDpCharge}
                onCheckedChange={(checked) => handleInputChange('includeDpCharge', !!checked)}
              />
              <Label htmlFor="includeDpCharge" className="cursor-pointer">
                Include DP charge (Rs. 25)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>DP charge is Rs. 25 per company per trade</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
            
            <Button onClick={handleReset} variant="outline" className="w-full mt-4">
              Reset Calculator
            </Button>
          </div>
          
          {/* Results Section */}
          {results && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Calculation Results</h3>
              
              {/* Input Summary */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Input Summary</h4>
                <div className="bg-nepse-gray p-4 rounded-md grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="block text-nepse-darkgray">Transaction</span>
                    <span className="font-medium">{inputs.transactionType === 'buy' ? 'Buy' : 'Sell'}</span>
                  </div>
                  <div>
                    <span className="block text-nepse-darkgray">Quantity</span>
                    <span className="font-medium">{inputs.quantity}</span>
                  </div>
                  <div>
                    <span className="block text-nepse-darkgray">Price</span>
                    <span className="font-medium">
                      {inputs.transactionType === 'buy' ? 
                        formatCurrency(inputs.buyPrice) : 
                        formatCurrency(inputs.sellPrice)}
                    </span>
                  </div>
                  {inputs.transactionType === 'sell' && (
                    <>
                      <div>
                        <span className="block text-nepse-darkgray">Buy Price</span>
                        <span className="font-medium">{formatCurrency(inputs.buyPrice)}</span>
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
              
              {/* Fee Breakdown */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Fee Breakdown</h4>
                <div className="bg-nepse-gray p-4 rounded-md space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-nepse-darkgray">Total Amount</span>
                    <span className="font-medium">{formatCurrency(results.totalAmount)}</span>
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
                            0.36% up to Rs. 50,000<br />
                            0.33% for Rs. 50,000–500,000<br />
                            0.31% for Rs. 500,000–2,000,000<br />
                            0.27% for Rs. 2,000,000–10,000,000<br />
                            0.24% above Rs. 10,000,000</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <span className="font-medium">{formatCurrency(results.brokerCommission)}</span>
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
                    <span className="font-medium">{formatCurrency(results.sebonFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nepse-darkgray">DP Charge</span>
                    <span className="font-medium">{formatCurrency(results.dpCharge)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between font-medium">
                    <span>Total Fees</span>
                    <span>{formatCurrency(results.brokerCommission + results.sebonFee + results.dpCharge)}</span>
                  </div>
                </div>
              </div>
              
              {/* Tax Calculation (Only for Sell) */}
              {inputs.transactionType === 'sell' && results.capitalGainsTax !== undefined && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Tax Calculation</h4>
                  <div className="bg-nepse-gray p-4 rounded-md space-y-3 text-sm">
                    {results.totalCostOfAcquisition && (
                      <div className="flex justify-between">
                        <span className="text-nepse-darkgray">Total Cost of Acquisition</span>
                        <span className="font-medium">
                          {formatCurrency(results.totalCostOfAcquisition)}
                        </span>
                      </div>
                    )}
                    {results.netSellingPrice && (
                      <div className="flex justify-between">
                        <span className="text-nepse-darkgray">Net Selling Price</span>
                        <span className="font-medium">
                          {formatCurrency(results.netSellingPrice)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-nepse-darkgray">Capital Gain/Loss</span>
                      <span className={`font-medium ${results.profitLoss && results.profitLoss > 0 ? 'text-nepse-green' : 'text-nepse-red'}`}>
                        {formatCurrency(results.profitLoss || 0)}
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
                      <span className="font-medium">{formatCurrency(results.capitalGainsTax)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Final Result */}
              <div>
                <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Final Result</h4>
                <div className="bg-nepse-blue text-white p-4 rounded-md space-y-3">
                  {inputs.transactionType === 'buy' ? (
                    <>
                      <div className="flex justify-between">
                        <span>Total Cost</span>
                        <span className="font-medium">{formatCurrency(
                          results.totalAmount + results.brokerCommission + results.sebonFee + results.dpCharge
                        )}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Per Share</span>
                        <span className="font-medium">{formatCurrency(results.costPerShare)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Net Receivable</span>
                        <span className="font-medium">{formatCurrency(results.netReceivable || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit/Loss</span>
                        <span className={`font-medium flex items-center ${
                          results.profitLoss && results.profitLoss > 0 ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {formatCurrency(results.profitLoss || 0)}
                          {results.profitLoss && results.profitLoss > 0 ? (
                            <ArrowUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-1 h-4 w-4" />
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI</span>
                        <span className={`font-medium ${
                          results.roi && results.roi > 0 ? 'text-green-300' : 'text-red-300'
                        }`}>{formatPercentage(results.roi || 0)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Embed Information */}
          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            <p>This calculator can be embedded in your website or blog.</p>
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              <code>{`<iframe src="${window.location.origin}" width="100%" height="800" frameborder="0"></iframe>`}</code>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NEPSECalculator;

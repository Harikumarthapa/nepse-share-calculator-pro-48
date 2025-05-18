
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { CalculationInputs } from './types';
import { CAPITAL_GAINS_TAX, HOLDING_PERIOD_THRESHOLD } from './constants';

interface TransactionFormProps {
  inputs: CalculationInputs;
  handleInputChange: (name: keyof CalculationInputs, value: any) => void;
  handleReset: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  inputs, 
  handleInputChange,
  handleReset 
}) => {
  // Auto update capital gains tax rate based on investor type and holding duration
  useEffect(() => {
    let taxRate: number;
    
    if (inputs.investorType === 'individual') {
      taxRate = inputs.holdingDuration >= HOLDING_PERIOD_THRESHOLD 
        ? CAPITAL_GAINS_TAX.INDIVIDUAL.LONG_TERM 
        : CAPITAL_GAINS_TAX.INDIVIDUAL.SHORT_TERM;
    } else {
      taxRate = CAPITAL_GAINS_TAX.INSTITUTIONAL;
    }
    
    // Only update if the rate actually changed
    if (inputs.capitalGainsTaxRate !== taxRate) {
      handleInputChange('capitalGainsTaxRate', taxRate);
    }
  }, [inputs.investorType, inputs.holdingDuration]);

  // Get the display percentage for the capital gains tax
  const getCapitalGainsTaxDisplay = () => {
    if (inputs.investorType === 'institutional') {
      return '10%';
    } else {
      return inputs.holdingDuration >= HOLDING_PERIOD_THRESHOLD ? '5%' : '7.5%';
    }
  };

  return (
    <Tabs 
      defaultValue="buy" 
      value={inputs.transactionType} 
      onValueChange={(value) => handleInputChange('transactionType', value)}
    >
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
            <>
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
              
              <div className="space-y-2">
                <Label htmlFor="capitalGainsTaxRate">
                  Capital Gains Tax Rate
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 inline-block ml-1 text-nepse-darkgray" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Capital gains tax rate is automatically calculated based on:<br />
                        Individual, ≥365 days: 5%<br />
                        Individual, &lt;365 days: 7.5%<br />
                        Institutional: 10%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input 
                  id="capitalGainsTaxRate"
                  value={getCapitalGainsTaxDisplay()}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </>
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
    </Tabs>
  );
};

export default TransactionForm;

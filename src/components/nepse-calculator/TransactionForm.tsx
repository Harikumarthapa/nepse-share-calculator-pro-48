import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculationInputs } from './types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Auto-select CGT rate when investor type changes
  useEffect(() => {
    if (inputs.investorType === 'institutional') {
      handleInputChange('selectedCgtRate', 0.10);
    } else if (inputs.investorType === 'individual' && inputs.selectedCgtRate === 0.10) {
      // Reset to default individual rate if switching from institutional
      handleInputChange('selectedCgtRate', 0.05);
    }
  }, [inputs.investorType, inputs.selectedCgtRate, handleInputChange]);

  return (
    <Tabs 
      defaultValue="buy" 
      value={inputs.transactionType} 
      onValueChange={(value) => handleInputChange('transactionType', value)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
        <TabsTrigger value="buy">{t('buy')}</TabsTrigger>
        <TabsTrigger value="sell">{t('sell')}</TabsTrigger>
      </TabsList>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Common inputs for both buy and sell */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="quantity" className="text-sm sm:text-base">{t('quantity')}</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="1"
              placeholder={t('quantity')}
              value={inputs.quantity || ''}
              onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || null)}
              className="h-9 sm:h-10"
            />
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="buyPrice" className="text-sm sm:text-base">{t('buy.price')}</Label>
            <Input 
              id="buyPrice" 
              type="number"
              min="0.01"
              step="0.01"
              placeholder={t('buy.price')}
              value={inputs.buyPrice || ''}
              onChange={(e) => handleInputChange('buyPrice', parseFloat(e.target.value) || null)}
              className="h-9 sm:h-10"
            />
          </div>
          
          {inputs.transactionType === 'sell' && (
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="sellPrice" className="text-sm sm:text-base">{t('sell.price')}</Label>
              <Input 
                id="sellPrice" 
                type="number"
                min="0.01"
                step="0.01"
                placeholder={t('sell.price')}
                value={inputs.sellPrice || ''}
                onChange={(e) => handleInputChange('sellPrice', parseFloat(e.target.value) || null)}
                className="h-9 sm:h-10"
              />
            </div>
          )}
          
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="transactionFees" className="text-sm sm:text-base flex items-center">
              Transaction Fees (Optional)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 inline-block ml-1 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Withdraw Fund Charge by Banks or Other payment Gateway - Add for accurate calculation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input 
              id="transactionFees" 
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter transaction fees"
              value={inputs.transactionFees || ''}
              onChange={(e) => handleInputChange('transactionFees', parseFloat(e.target.value) || null)}
              className="h-9 sm:h-10"
            />
          </div>
          
          {/* Only show investor type in sell tab */}
          {inputs.transactionType === 'sell' && (
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="investorType" className="text-sm sm:text-base">{t('investor.type')}</Label>
              <Select 
                value={inputs.investorType} 
                onValueChange={(value) => handleInputChange('investorType', value)}
              >
                <SelectTrigger id="investorType" className="h-9 sm:h-10">
                  <SelectValue placeholder={t('investor.type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">{t('individual')}</SelectItem>
                  <SelectItem value="institutional">{t('institutional')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {inputs.transactionType === 'sell' && (
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="capitalGainsTax" className="text-sm sm:text-base">
                {t('capital.gains.tax')}
              </Label>
              <Select 
                value={inputs.selectedCgtRate.toString()} 
                onValueChange={(value) => handleInputChange('selectedCgtRate', parseFloat(value))}
                disabled={inputs.investorType === 'institutional'}
              >
                <SelectTrigger id="capitalGainsTax" className="h-9 sm:h-10">
                  <SelectValue placeholder={t('capital.gains.tax')} />
                </SelectTrigger>
                <SelectContent>
                  {inputs.investorType === 'individual' ? (
                    <>
                      <SelectItem value="0.05">5%</SelectItem>
                      <SelectItem value="0.075">7.5%</SelectItem>
                    </>
                  ) : (
                    <SelectItem value="0.10">10%</SelectItem>
                  )}
                </SelectContent>
              </Select>
              
              {/* Improved Capital Gains Tax Info Design */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <div className="text-xs text-blue-800 space-y-2">
                  <div className="font-medium text-blue-900">Capital Gains Tax Rates:</div>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Individual (≥365 days):</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Individual (<365 days):</span>
                      <span className="font-medium">7.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Institutional:</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium text-center pt-1 border-t border-blue-200">
                    ⓘ No tax applies on capital loss
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeDpCharge" 
            checked={inputs.includeDpCharge}
            onCheckedChange={(checked) => handleInputChange('includeDpCharge', !!checked)}
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          />
          <Label htmlFor="includeDpCharge" className="cursor-pointer text-sm sm:text-base flex items-center">
            {t('include.dp')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-1 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>DP charge is रू 25 per company per trade</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        
        {/* Desktop-only reset button - hidden on mobile */}
        {!isMobile && (
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="w-full mt-3 sm:mt-4 h-9 sm:h-10"
          >
            {t('reset')}
          </Button>
        )}
      </div>
    </Tabs>
  );
};

export default TransactionForm;
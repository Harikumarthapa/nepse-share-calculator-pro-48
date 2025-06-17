import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
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
  
  // Helper function to get CGT rate display text
  const getCgtRateDisplayText = (rate: number) => {
    switch (rate) {
      case 0.05:
        return t('cgt.rate.individual.longterm') || '5% (Individual, ≥365 days)';
      case 0.075:
        return t('cgt.rate.individual.shortterm') || '7.5% (Individual, <365 days)';
      case 0.10:
        return t('cgt.rate.institutional') || '10% (Institutional)';
      default:
        return `${(rate * 100).toFixed(1)}%`;
    }
  };

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
              className="text-sm sm:text-base h-9 sm:h-10"
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
              className="text-sm sm:text-base h-9 sm:h-10"
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
                className="text-sm sm:text-base h-9 sm:h-10"
              />
            </div>
          )}
          
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="investorType" className="text-sm sm:text-base">{t('investor.type')}</Label>
            <Select 
              value={inputs.investorType} 
              onValueChange={(value) => handleInputChange('investorType', value)}
            >
              <SelectTrigger id="investorType" className="text-sm sm:text-base h-9 sm:h-10">
                <SelectValue placeholder={t('investor.type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">{t('individual')}</SelectItem>
                <SelectItem value="institutional">{t('institutional')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {inputs.transactionType === 'sell' && (
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="capitalGainsTax" className="text-sm sm:text-base">
                {t('capital.gains.tax')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 sm:h-4 sm:w-4 inline-block ml-1 text-nepse-darkgray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs sm:text-sm">{t('cgt.tooltip')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select 
                value={inputs.selectedCgtRate.toString()} 
                onValueChange={(value) => handleInputChange('selectedCgtRate', parseFloat(value))}
              >
                <SelectTrigger id="capitalGainsTax" className="text-sm sm:text-base h-9 sm:h-10">
                  <SelectValue placeholder={t('capital.gains.tax')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.05">
                    {t('cgt.rate.individual.longterm') || '5% (Individual, ≥365 days)'}
                  </SelectItem>
                  <SelectItem value="0.075">
                    {t('cgt.rate.individual.shortterm') || '7.5% (Individual, <365 days)'}
                  </SelectItem>
                  <SelectItem value="0.10">
                    {t('cgt.rate.institutional') || '10% (Institutional)'}
                  </SelectItem>
                </SelectContent>
              </Select>
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
          <Label htmlFor="includeDpCharge" className="cursor-pointer text-sm sm:text-base">
            {t('include.dp')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 inline-block ml-1 text-nepse-darkgray" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs sm:text-sm">DP charge is रू 25 per company per trade</p>
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
            className="w-full mt-3 sm:mt-4 text-sm sm:text-base h-9 sm:h-10"
          >
            {t('reset')}
          </Button>
        )}
      </div>
    </Tabs>
  );
};

export default TransactionForm;
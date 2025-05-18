
import React, { useRef } from 'react';
import { ArrowUp, ArrowDown, Info, FileImage, FilePdf } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CalculationInputs, CalculationResults } from './types';
import { formatCurrency, formatPercentage } from './utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResultsDisplayProps {
  results: CalculationResults;
  inputs: CalculationInputs;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputs }) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  if (!results) return null;
  
  const exportToImage = async () => {
    if (!resultsRef.current) return;
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `nepse-calculation-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting to image:', error);
      alert('Failed to export as image. Please try again.');
    }
  };
  
  const exportToPDF = async () => {
    if (!resultsRef.current) return;
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`nepse-calculation-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export as PDF. Please try again.');
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Calculation Results</h3>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={exportToImage}>
                  <FileImage className="h-4 w-4 mr-1" />
                  PNG
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as PNG image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={exportToPDF}>
                  <FilePdf className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as PDF document</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Results content - wrapped in a ref for export */}
      <div ref={resultsRef} className="space-y-6 bg-white p-4">
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
                <div>
                  <span className="block text-nepse-darkgray">CGT Rate</span>
                  <span className="font-medium">
                    {inputs.capitalGainsTaxRate ? (inputs.capitalGainsTaxRate * 100).toFixed(1) + '%' : 
                      (inputs.investorType === 'individual' ? 
                      (inputs.holdingDuration >= 365 ? '5.0%' : '7.5%') : '10.0%')}
                  </span>
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
        
        {/* Powered by footer for exports */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>Generated by <a href="https://sharecalculator.app/" target="_blank" rel="noopener noreferrer" className="text-nepse-blue">Share Calculator App</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, TrendingUp, Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from '@/components/nepse-calculator/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSEO } from '@/hooks/useSEO';

interface IPOInputs {
  sharesAllotted: number | null;
  pricePerShare: number | null;
  initialListedPrice: number | null;
  returnType: 'circuits' | 'percentage';
  circuits: number | null;
  totalReturnPercentage: number | null;
}

interface IPOResults {
  totalInvestment: number;
  totalReturnAmount: number;
  totalProfit: number;
  finalSharePrice: number;
  returnPercentage: number;
  dailyBreakdown: Array<{
    day: number;
    startValue: number;
    priceIncrease: number;
    finalValue: number;
    totalPriceIncrease: number;
  }>;
}

const IPOCalculator: React.FC = () => {
  const isMobile = useIsMobile();
  
  // SEO optimization
  useSEO({
    title: 'IPO Returns Calculator Nepal - Calculate Your IPO Profit & Returns',
    description: 'Calculate your IPO returns in Nepal with our free calculator. Find out your profit, return percentage, and daily circuit breakdown for newly listed shares on NEPSE.',
    canonical: 'https://sharecalculator.app/ipo-calculator',
    ogImage: 'https://sharecalculator.app/sharecalculatornepal.webp'
  });

  const [inputs, setInputs] = useState<IPOInputs>({
    sharesAllotted: null,
    pricePerShare: 100, // Default IPO price
    initialListedPrice: null,
    returnType: 'circuits',
    circuits: null,
    totalReturnPercentage: null,
  });

  const [results, setResults] = useState<IPOResults | null>(null);

  const handleInputChange = (name: keyof IPOInputs, value: any) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setInputs({
      sharesAllotted: null,
      pricePerShare: 100,
      initialListedPrice: null,
      returnType: 'circuits',
      circuits: null,
      totalReturnPercentage: null,
    });
    setResults(null);
  };

  const calculateResults = (): IPOResults | null => {
    const { sharesAllotted, pricePerShare, initialListedPrice, returnType, circuits, totalReturnPercentage } = inputs;
    
    if (!sharesAllotted || !pricePerShare || !initialListedPrice) {
      return null;
    }

    const totalInvestment = sharesAllotted * pricePerShare;
    let finalSharePrice = initialListedPrice;
    let returnPercentage = 0;
    const dailyBreakdown: IPOResults['dailyBreakdown'] = [];

    if (returnType === 'circuits' && circuits && circuits > 0) {
      // Calculate based on number of circuits (10% per day)
      let currentPrice = initialListedPrice;
      
      for (let day = 1; day <= circuits; day++) {
        const startValue = currentPrice;
        const priceIncrease = currentPrice * 0.10; // 10% increase
        const finalValue = currentPrice + priceIncrease;
        const totalPriceIncrease = finalValue - initialListedPrice;
        
        dailyBreakdown.push({
          day,
          startValue,
          priceIncrease,
          finalValue,
          totalPriceIncrease
        });
        
        currentPrice = finalValue;
      }
      
      finalSharePrice = currentPrice;
      returnPercentage = ((finalSharePrice - initialListedPrice) / initialListedPrice) * 100;
    } else if (returnType === 'percentage' && totalReturnPercentage && totalReturnPercentage > 0) {
      // Calculate based on total return percentage
      returnPercentage = totalReturnPercentage;
      finalSharePrice = initialListedPrice * (1 + totalReturnPercentage / 100);
      
      // Calculate equivalent days (assuming 10% per day)
      const equivalentDays = Math.ceil(totalReturnPercentage / 10);
      let currentPrice = initialListedPrice;
      
      for (let day = 1; day <= equivalentDays; day++) {
        const startValue = currentPrice;
        let priceIncrease: number;
        
        if (day === equivalentDays) {
          // Last day - calculate remaining percentage
          const remainingPercentage = totalReturnPercentage - ((day - 1) * 10);
          priceIncrease = currentPrice * (remainingPercentage / 100);
        } else {
          priceIncrease = currentPrice * 0.10; // 10% increase
        }
        
        const finalValue = currentPrice + priceIncrease;
        const totalPriceIncrease = finalValue - initialListedPrice;
        
        dailyBreakdown.push({
          day,
          startValue,
          priceIncrease,
          finalValue,
          totalPriceIncrease
        });
        
        currentPrice = finalValue;
      }
    } else {
      return null;
    }

    const totalReturnAmount = sharesAllotted * finalSharePrice;
    const totalProfit = totalReturnAmount - totalInvestment;

    return {
      totalInvestment,
      totalReturnAmount,
      totalProfit,
      finalSharePrice,
      returnPercentage,
      dailyBreakdown
    };
  };

  useEffect(() => {
    setResults(calculateResults());
  }, [inputs]);

  const hasValidResults = results && inputs.sharesAllotted && inputs.pricePerShare && inputs.initialListedPrice;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:py-8 sm:px-4">
      <div className={`mx-auto ${isMobile ? 'w-full' : 'w-[90%] max-w-6xl'}`}>
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Share Calculator
          </Button>
        </Link>

        <header className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4">
            <TrendingUp className="h-12 sm:h-16 w-12 sm:w-16 text-nepse-blue" />
          </div>
          
          <h1 className="text-xl sm:text-3xl font-bold text-nepse-blue mb-2 text-center">
            IPO Returns Calculator
          </h1>
          
          <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base px-2">
            Calculate your IPO returns with circuit analysis for newly listed shares in Nepal
          </p>
        </header>

        <Card className="w-full mx-auto shadow-lg">
          <CardHeader className="bg-nepse-blue text-white p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculate your IPO Returns with this simple Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Column */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">IPO Details</h3>
                
                <div className="space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="sharesAllotted" className="text-sm sm:text-base flex items-center">
                      No. of Share Allotted
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 inline-block ml-1 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of shares you were allotted in the IPO</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input 
                      id="sharesAllotted" 
                      type="number" 
                      min="1"
                      placeholder="Enter number of shares allotted"
                      value={inputs.sharesAllotted || ''}
                      onChange={(e) => handleInputChange('sharesAllotted', parseFloat(e.target.value) || null)}
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="pricePerShare" className="text-sm sm:text-base">Price per Share (IPO Price)</Label>
                    <Input 
                      id="pricePerShare" 
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="Usually Rs. 100"
                      value={inputs.pricePerShare || ''}
                      onChange={(e) => handleInputChange('pricePerShare', parseFloat(e.target.value) || null)}
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="initialListedPrice" className="text-sm sm:text-base flex items-center">
                      Initial Listed Price
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 inline-block ml-1 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The price at which the share was first traded on NEPSE</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input 
                      id="initialListedPrice" 
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="First trading price on NEPSE"
                      value={inputs.initialListedPrice || ''}
                      onChange={(e) => handleInputChange('initialListedPrice', parseFloat(e.target.value) || null)}
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Return Calculation Method</Label>
                    <Tabs 
                      value={inputs.returnType} 
                      onValueChange={(value) => handleInputChange('returnType', value)}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="circuits">No. of +Circuits</TabsTrigger>
                        <TabsTrigger value="percentage">Total Return %</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="circuits" className="mt-3">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="circuits" className="text-sm">Number of Positive Circuits</Label>
                          <Input 
                            id="circuits" 
                            type="number"
                            min="1"
                            placeholder="Enter number of +10% days"
                            value={inputs.circuits || ''}
                            onChange={(e) => handleInputChange('circuits', parseFloat(e.target.value) || null)}
                            className="h-9 sm:h-10"
                          />
                          <p className="text-xs text-gray-500">Each circuit = +10% price increase per day</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="percentage" className="mt-3">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="totalReturn" className="text-sm">Total Return Percentage</Label>
                          <Input 
                            id="totalReturn" 
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Enter total return %"
                            value={inputs.totalReturnPercentage || ''}
                            onChange={(e) => handleInputChange('totalReturnPercentage', parseFloat(e.target.value) || null)}
                            className="h-9 sm:h-10"
                          />
                          <p className="text-xs text-gray-500">Total percentage return from initial listed price</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {!isMobile && (
                    <Button 
                      onClick={handleReset} 
                      variant="outline" 
                      className="w-full mt-3 sm:mt-4 h-9 sm:h-10"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {/* Results Column */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">Calculation Results</h3>
                
                <div className="bg-white p-3 sm:p-4 rounded-lg" style={{ minHeight: isMobile ? '300px' : '400px' }}>
                  {hasValidResults ? (
                    <div className="space-y-4">
                      {/* Summary Results */}
                      <div className="bg-nepse-blue text-white p-4 rounded-md space-y-3">
                        <div className="flex justify-between">
                          <span>Total Investment</span>
                          <span className="font-medium">{formatCurrency(results.totalInvestment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Return Amount</span>
                          <span className="font-medium">{formatCurrency(results.totalReturnAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Profit</span>
                          <span className={`font-medium ${results.totalProfit > 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {formatCurrency(results.totalProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return Percentage</span>
                          <span className={`font-medium ${results.returnPercentage > 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {results.returnPercentage.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Final Share Price</span>
                          <span className="font-medium">{formatCurrency(results.finalSharePrice)}</span>
                        </div>
                      </div>

                      {/* Daily Breakdown Table */}
                      {results.dailyBreakdown.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-nepse-darkgray mb-2">Daily Circuit Breakdown</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-xs">Day</TableHead>
                                  <TableHead className="text-xs">Start Value</TableHead>
                                  <TableHead className="text-xs">Price Increase</TableHead>
                                  <TableHead className="text-xs">Final Value</TableHead>
                                  <TableHead className="text-xs">Total Increase</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {results.dailyBreakdown.map((day) => (
                                  <TableRow key={day.day}>
                                    <TableCell className="text-xs">{day.day}</TableCell>
                                    <TableCell className="text-xs">{formatCurrency(day.startValue)}</TableCell>
                                    <TableCell className="text-xs text-green-600">+{formatCurrency(day.priceIncrease)}</TableCell>
                                    <TableCell className="text-xs font-medium">{formatCurrency(day.finalValue)}</TableCell>
                                    <TableCell className="text-xs text-green-600">+{formatCurrency(day.totalPriceIncrease)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter IPO details to see your returns</p>
                      </div>
                    </div>
                  )}
                </div>

                {isMobile && (
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="w-full mt-3 sm:mt-4 h-9 sm:h-10"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
          <p>
            © 2025 <a href="https://sharecalculator.app/" className="text-nepse-blue hover:underline">Share Calculator</a>. 
            IPO returns calculated based on circuit movements and NEPSE trading patterns.
          </p>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2">
            <Link to="/" className="text-nepse-blue hover:underline">Share Calculator</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy" className="text-nepse-blue hover:underline">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms" className="text-nepse-blue hover:underline">Terms</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/disclaimer" className="text-nepse-blue hover:underline">Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPOCalculator;
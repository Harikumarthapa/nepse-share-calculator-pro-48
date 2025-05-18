
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Info, Book, Calculator, HelpCircle, FileText, Link2 } from "lucide-react";

const EducationalContent: React.FC = () => {
  return (
    <div className="mt-8 pt-4 border-t">
      <h2 className="text-2xl font-semibold mb-6">Learn About NEPSE Share Trading</h2>
      
      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="fees">Fees & Taxes</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-nepse-blue" />
                What is NEPSE?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>NEPSE (Nepal Stock Exchange) is Nepal's only stock exchange, established in 1993 to facilitate the trading of securities. It operates as a platform where investors can buy and sell shares of listed companies through licensed brokers.</p>
              <p className="mt-2">NEPSE uses an automated trading system that matches buy and sell orders electronically, ensuring fair and transparent price discovery.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-nepse-blue" />
                How Share Transactions Work in Nepal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">1. Account Setup</h4>
                <p>Before trading, you need:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>DEMAT account (for electronic share ownership)</li>
                  <li>Trading account with a broker</li>
                  <li>Bank account linked to your trading account</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">2. Trading Process</h4>
                <p>The typical trading process includes:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Placing order through broker or TMS</li>
                  <li>Order matching in the NEPSE system</li>
                  <li>Settlement of trades (T+2 days)</li>
                  <li>Payment and share transfer</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">3. Trading Hours</h4>
                <p>NEPSE operates Sunday through Thursday:</p>
                <p className="mt-1">Pre-open: 10:30 AM - 11:00 AM</p>
                <p>Regular trading: 11:00 AM - 3:00 PM</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-nepse-blue" />
                Tips for First-Time Stock Investors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                <li className="border-b pb-2">
                  <span className="font-medium">Research before investing:</span> Understand company fundamentals, industry trends, and financial statements.
                </li>
                <li className="border-b pb-2">
                  <span className="font-medium">Start small:</span> Begin with a modest amount until you gain experience and confidence.
                </li>
                <li className="border-b pb-2">
                  <span className="font-medium">Diversify your portfolio:</span> Don't put all your money in one stock or sector.
                </li>
                <li className="border-b pb-2">
                  <span className="font-medium">Have a long-term perspective:</span> Stock markets reward patience and long-term investors.
                </li>
                <li className="border-b pb-2">
                  <span className="font-medium">Understand all costs:</span> Be aware of broker commissions, DP charges, and taxes that affect returns.
                </li>
                <li>
                  <span className="font-medium">Stay updated:</span> Keep track of market news, company announcements, and regulatory changes.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                Broker Commission Explained
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Broker commission in Nepal follows a slab rate system based on transaction value:</p>
              <table className="w-full mt-2 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Transaction Amount (Rs)</th>
                    <th className="border p-2 text-left">Commission Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Up to 50,000</td>
                    <td className="border p-2">0.36%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">50,000 - 500,000</td>
                    <td className="border p-2">0.33%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">500,000 - 2,000,000</td>
                    <td className="border p-2">0.31%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">2,000,000 - 10,000,000</td>
                    <td className="border p-2">0.27%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Above 10,000,000</td>
                    <td className="border p-2">0.24%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">These commissions are charged on both buy and sell transactions, affecting your overall investment returns.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                DP Charge & SEBON Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-medium">DP Charge</h4>
                <p className="mt-1">The Depository Participant (DP) charge is a fixed fee of Rs. 25 per company per transaction. This fee is collected for maintaining electronic records of your share ownership.</p>
                <p className="mt-2">For example, if you buy shares of 3 different companies in separate transactions, you'll pay Rs. 25 × 3 = Rs. 75 as DP charges.</p>
              </div>
              
              <div>
                <h4 className="font-medium">SEBON Fee</h4>
                <p className="mt-1">The Securities Board of Nepal (SEBON) regulates the securities market and charges a fee of 0.015% on the transaction amount for both buy and sell transactions.</p>
                <p className="mt-2">For example, on a transaction of Rs. 100,000, the SEBON fee would be Rs. 15 (100,000 × 0.00015).</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                Capital Gains Tax in Nepal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Capital Gains Tax (CGT) in Nepal is applied on the profit made from selling shares. The rate varies based on investor type and holding period:</p>
              
              <table className="w-full mt-3 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Investor Type</th>
                    <th className="border p-2 text-left">Holding Period</th>
                    <th className="border p-2 text-left">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2" rowSpan={2}>Individual</td>
                    <td className="border p-2">365 days or more</td>
                    <td className="border p-2">5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Less than 365 days</td>
                    <td className="border p-2">7.5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Institutional</td>
                    <td className="border p-2">Any period</td>
                    <td className="border p-2">10%</td>
                  </tr>
                </tbody>
              </table>
              
              <p className="mt-3">Important points about CGT in Nepal:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>CGT is only applicable on profit (capital gain), not on the entire selling amount</li>
                <li>No tax is levied if you incur a loss</li>
                <li>Your broker automatically deducts CGT at the time of selling shares</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">
                Why is my profit different from other calculators?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>Results may differ between calculators due to:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Different rounding methods for tax calculations</li>
                  <li>Whether DP charges are included</li>
                  <li>How broker commission slabs are applied</li>
                  <li>Whether all regulatory fees are included</li>
                </ul>
                <p className="mt-2">This calculator follows the latest NEPSE guidelines and includes all applicable fees and taxes.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base">
                Can I use this calculator for bonus shares?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>Yes, you can use this calculator for bonus shares with some adjustments:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>For bonus shares, the "buy price" is technically zero</li>
                  <li>However, bonus shares are not truly "free" as they're issued from the company's retained earnings</li>
                  <li>For tax purposes, you should use an adjusted cost basis that accounts for your original shares and the bonus shares received</li>
                </ul>
                <p className="mt-2">We recommend consulting with a financial advisor for precise tax implications of bonus share sales.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base">
                What is WACC price?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>WACC (Weighted Average Cost of Capital) price in the context of NEPSE refers to the average price at which you acquired shares of a company, including all transaction costs.</p>
                <p className="mt-2">For example, if you bought shares at different times and prices:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>100 shares @ Rs 500 (Cost: Rs 50,000)</li>
                  <li>150 shares @ Rs 450 (Cost: Rs 67,500)</li>
                </ul>
                <p className="mt-2">Your WACC price would be total cost (Rs 117,500) divided by total shares (250), which equals Rs 470 per share.</p>
                <p className="mt-2">This calculator shows your cost per share as the WACC price when you use the Buy Calculator.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base">
                How is ROI calculated?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>ROI (Return on Investment) is calculated as:</p>
                <p className="mt-2 p-2 bg-gray-100 rounded">ROI = (Net Profit / Total Cost of Investment) × 100%</p>
                <p className="mt-2">Where:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Net Profit = Net Selling Price - Total Cost of Acquisition</li>
                  <li>Net Selling Price = Selling Amount - Selling Costs (broker commission, SEBON fee, DP charge, CGT)</li>
                  <li>Total Cost of Acquisition = Buying Amount + Buying Costs (broker commission, SEBON fee, DP charge)</li>
                </ul>
                <p className="mt-2">This calculator accounts for all these factors to give you the most accurate ROI figure.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base">
                What are the latest NEPSE trading hours?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>NEPSE trading hours (as of 2024):</p>
                <ul className="list-disc pl-5 mt-2">
                  <li><strong>Trading Days:</strong> Sunday to Thursday (Nepal follows a Sunday-Friday week)</li>
                  <li><strong>Pre-open Session:</strong> 10:30 AM - 11:00 AM</li>
                  <li><strong>Regular Trading Hours:</strong> 11:00 AM - 3:00 PM</li>
                  <li><strong>Closed:</strong> Friday, Saturday, and public holidays</li>
                </ul>
                <p className="mt-2">Note: Trading hours may change, so always check the <a href="https://nepalstock.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">official NEPSE website</a> for the most current information.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;

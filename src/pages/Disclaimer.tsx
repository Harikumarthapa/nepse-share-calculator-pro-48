
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-[80%] mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Calculator
          </Button>
        </Link>
        
        <Card className="w-full mx-auto shadow-lg">
          <CardHeader className="bg-nepse-blue text-white">
            <CardTitle className="text-xl font-bold">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Educational & Informational Purposes Only</h2>
              <p>
                The Share Calculator is provided for educational and informational purposes only. The information contained 
                in this website does not constitute financial advice, investment advice, trading advice, or any other sort 
                of professional advice.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Not a Financial Advisor</h2>
              <p>
                We are not licensed financial advisors, brokers, or tax consultants. The calculations and information 
                provided by this tool are intended to serve as general reference points only and should not be relied upon 
                for making investment decisions or tax filings.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Estimation Tool Only</h2>
              <p>
                The NEPSE Transaction Calculator provides estimates based on the information you enter and the current fee 
                and tax structures set by SEBON and NEPSE that we're aware of. While we strive to keep our calculator 
                updated with the most current rates and guidelines, there may be delays in reflecting regulatory changes.
              </p>
              <p className="mt-2">
                All calculations should be verified with your broker or a financial professional before making any investment 
                decisions or tax filings. The actual fees, taxes, and returns may vary based on factors not captured by our calculator.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Verify with Official Sources</h2>
              <p>
                Users are strongly encouraged to verify all calculations with official NEPSE documents, their broker's 
                statements, or a tax professional before relying on them for any purpose. We are not responsible for any 
                discrepancies or errors that may occur.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">No Liability for Investment Decisions</h2>
              <p>
                We expressly disclaim any liability for any investment, financial, or tax decisions made based on the 
                information provided by this calculator. Your investment decisions should be based on your own research, 
                judgment, and analysis.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Regulatory Changes</h2>
              <p>
                The Nepali securities market regulations, fee structures, and tax rates are subject to change. While we 
                make efforts to keep our calculator up to date, it is the user's responsibility to be aware of current 
                regulations that may affect their investments.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">No Guarantees</h2>
              <p>
                We make no guarantees about the accuracy, completeness, or reliability of the information provided by this 
                calculator, nor do we guarantee any specific investment results or outcomes.
              </p>
            </div>
            
            <div>
              <p className="mt-2">
                <strong>Last updated:</strong> May 19, 2025
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            © 2025 <a href="https://sharecalculator.app/" className="text-nepse-blue hover:underline">Share Calculator</a>.
            All rates based on current SEBON/NEPSE official guidelines.
          </p>
          <p className="mt-2">
            <Link to="/" className="text-nepse-blue hover:underline">Home</Link> | 
            <Link to="/privacy" className="text-nepse-blue hover:underline"> Privacy Policy</Link> | 
            <Link to="/terms" className="text-nepse-blue hover:underline"> Terms</Link> | 
            <Link to="/disclaimer" className="text-nepse-blue hover:underline"> Disclaimer</Link> | 
            <Link to="/about" className="text-nepse-blue hover:underline"> About Us</Link> | 
            <Link to="/contact" className="text-nepse-blue hover:underline"> Contact</Link> | 
            <Link to="/sitemap" className="text-nepse-blue hover:underline"> Sitemap</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

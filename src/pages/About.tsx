
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const About: React.FC = () => {
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
            <CardTitle className="text-xl font-bold">About Share Calculator</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Our Mission</h2>
              <p>
                Share Calculator was created to empower Nepali investors with accurate, transparent information about the 
                true costs and returns of their stock market investments. Our mission is to help investors make more informed 
                decisions by clearly showing all fees, taxes, and net returns on NEPSE transactions.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Why We Built This Tool</h2>
              <p>
                As investors ourselves, we experienced firsthand the challenge of understanding all the costs associated 
                with buying and selling shares on NEPSE. Many investors focus only on the share price movement, overlooking 
                the significant impact of broker commissions, regulatory fees, capital gains taxes, and other costs.
              </p>
              <p className="mt-2">
                We wanted to create a simple, reliable tool that would show the complete picture of investment costs and returns, 
                helping investors avoid surprises when they receive their final settlement amounts.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Who We Help</h2>
              <p>Our calculator is designed to assist:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>New investors learning about NEPSE transaction costs</li>
                <li>Active traders calculating potential profits after all fees</li>
                <li>Long-term investors optimizing their tax strategies</li>
                <li>Financial educators teaching about realistic investment returns</li>
                <li>Investment clubs making group investment decisions</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Our Commitment to Accuracy</h2>
              <p>
                This calculator follows official SEBON/NEPSE guidelines for all fee calculations. We regularly update our 
                formulas whenever regulatory changes occur to ensure our calculations remain accurate and reliable.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Looking Forward</h2>
              <p>
                We are continuously working to improve Share Calculator with new features and educational resources. Our 
                goal is to create the most comprehensive suite of tools for Nepali investors, helping to foster a more 
                informed and transparent investment environment.
              </p>
              <p className="mt-2">
                Your feedback is invaluable in this process. Please don't hesitate to contact us with suggestions, 
                questions, or ideas for improvement.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Connect With Us</h2>
              <p>
                We'd love to hear from you! Whether you have feedback, questions, or suggestions, please reach out to us at:
                <br />
                <a href="mailto:hello@sharecalculator.app" className="text-nepse-blue hover:underline">
                  hello@sharecalculator.app
                </a>
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

export default About;

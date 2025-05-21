
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Globe } from 'lucide-react';

const Sitemap: React.FC = () => {
  // Add meta tags when component mounts
  useEffect(() => {
    // Update page title
    document.title = "Sitemap - Share Calculator Nepal";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Complete sitemap of Share Calculator - find all pages and resources available on our NEPSE transaction calculator website.");
    }
    
    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.origin + "/sitemap");
    
    return () => {
      // Clean up effect if component unmounts
      document.title = "Share Calculator Nepal – NEPSE Buy/Sell Tax & Fees";
      // Remove canonical link on unmount
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) document.head.removeChild(canonical);
    };
  }, []);

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
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span className="text-xl font-bold">Sitemap</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-4">All Pages</h2>
                <ul className="space-y-3 pl-5">
                  <li>
                    <Link to="/" className="text-nepse-blue hover:underline font-medium">Home</Link>
                    <p className="text-sm text-gray-600 mt-1">NEPSE Transaction Calculator tool with buy/sell calculations</p>
                  </li>
                  
                  <li>
                    <Link to="/about" className="text-nepse-blue hover:underline font-medium">About Us</Link>
                    <p className="text-sm text-gray-600 mt-1">Learn about Share Calculator and our mission</p>
                  </li>
                  
                  <li>
                    <Link to="/contact" className="text-nepse-blue hover:underline font-medium">Contact</Link>
                    <p className="text-sm text-gray-600 mt-1">Get in touch with our team</p>
                  </li>
                  
                  <li>
                    <Link to="/privacy" className="text-nepse-blue hover:underline font-medium">Privacy Policy</Link>
                    <p className="text-sm text-gray-600 mt-1">Information on how we handle your data</p>
                  </li>
                  
                  <li>
                    <Link to="/terms" className="text-nepse-blue hover:underline font-medium">Terms and Conditions</Link>
                    <p className="text-sm text-gray-600 mt-1">Legal terms governing use of our service</p>
                  </li>
                  
                  <li>
                    <Link to="/disclaimer" className="text-nepse-blue hover:underline font-medium">Disclaimer</Link>
                    <p className="text-sm text-gray-600 mt-1">Important disclaimers regarding our calculator</p>
                  </li>
                  
                  <li>
                    <Link to="/sitemap" className="text-nepse-blue hover:underline font-medium">Sitemap</Link>
                    <p className="text-sm text-gray-600 mt-1">This page - a directory of all site pages</p>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4">
                <h2 className="text-lg font-bold mb-2">XML Sitemap</h2>
                <p>
                  For search engines, an XML sitemap is available at:
                  <a href="https://sharecalculator.app/sitemap.xml" className="text-nepse-blue hover:underline block mt-1">
                    https://sharecalculator.app/sitemap.xml
                  </a>
                </p>
              </div>
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

export default Sitemap;

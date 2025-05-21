
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Terms: React.FC = () => {
  // Add meta tags when component mounts
  useEffect(() => {
    // Update page title
    document.title = "Terms and Conditions - Share Calculator Nepal";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Terms of use for the Share Calculator tool, outlining acceptable use policies, intellectual property rights, and liability limitations.");
    }
    
    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.origin + "/terms");
    
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
            <CardTitle className="text-xl font-bold">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Acceptance of Terms</h2>
              <p>
                By accessing or using the Share Calculator NEPSE Transaction Calculator at sharecalculator.app ("the Service"), 
                you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of 
                these terms, please do not use our Service.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Use of the Service</h2>
              <p>
                The Service is provided for informational and educational purposes only. You agree to use the Service only 
                for its intended purpose and in accordance with these Terms and Conditions and any applicable laws and regulations.
              </p>
              
              <p className="mt-2">You agree not to:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Use the Service in any way that could damage or impair its functionality</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use automated systems or software to extract data from the Service</li>
                <li>Use the Service for any unlawful purpose</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">No Financial Advice</h2>
              <p>
                The information provided through our Service is for general informational purposes only. It does not 
                constitute financial advice, investment advice, trading advice, or any other type of professional advice. 
                You should consult with a qualified professional before making any investment decisions.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Accuracy of Information</h2>
              <p>
                While we strive to provide accurate calculations based on current NEPSE and SEBON guidelines, we do not 
                guarantee the accuracy, completeness, or timeliness of the information. The Service should be used as a 
                general reference only, and all calculations should be verified with official sources.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Intellectual Property</h2>
              <p>
                All content on the Service, including but not limited to text, graphics, logos, icons, images, and software, 
                is the property of Share Calculator and is protected by copyright, trademark, and other intellectual property laws. 
                You may not reproduce, modify, distribute, or republish any content from our Service without our prior written consent.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Share Calculator and its operators shall not be liable for any direct, 
                indirect, incidental, special, consequential, or exemplary damages resulting from your use or inability to use 
                the Service, including but not limited to financial losses, investment decisions, or errors in calculation.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately 
                upon posting on the Service. Your continued use of the Service after any changes indicates your acceptance 
                of the modified Terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its 
                conflict of law provisions.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
                <br />
                <a href="mailto:terms@sharecalculator.app" className="text-nepse-blue hover:underline">
                  terms@sharecalculator.app
                </a>
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

export default Terms;

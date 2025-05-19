
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Privacy: React.FC = () => {
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
            <CardTitle className="text-xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Overview</h2>
              <p>
                This Privacy Policy outlines how Share Calculator ("we", "our", or "us") collects, uses, and protects 
                information when you use our NEPSE Transaction Calculator service at sharecalculator.app.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Information We Collect</h2>
              <p>
                <strong>Calculation Data:</strong> When you use our calculator, all calculations are performed locally in 
                your browser. We do not store, transmit, or have access to the financial data you enter.
              </p>
              <p className="mt-2">
                <strong>Analytics:</strong> We use standard web analytics tools to collect anonymous information such as:
              </p>
              <ul className="list-disc pl-5 mt-1">
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Approximate geographic location (country/city level only)</li>
                <li>Referral source</li>
              </ul>
              <p className="mt-2">
                This information helps us understand how users interact with our calculator and improve its functionality.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Cookies</h2>
              <p>
                We use cookies to enhance your experience on our website. These cookies are small text files stored on your 
                device that help the site function and provide information on how the site is being used. You can control 
                cookies through your browser settings.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Third-Party Services</h2>
              <p>
                We may use third-party services such as Google Analytics to collect and analyze website usage data. These 
                services have their own privacy policies regarding how they process data.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information. However, no internet transmission is 
                completely secure, and we cannot guarantee absolute security.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Data Retention</h2>
              <p>
                Since we do not collect or store personal financial data, there is no retention period for such information. 
                Anonymous analytics data may be retained for up to 2 years.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-5 mt-1">
                <li>Request information about any data we may have about your usage</li>
                <li>Request deletion of any identifiable information</li>
                <li>Opt-out of analytics tracking</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Contact Information</h2>
              <p>
                For privacy-related inquiries or concerns, please contact us at:
                <br />
                <a href="mailto:privacy@sharecalculator.app" className="text-nepse-blue hover:underline">
                  privacy@sharecalculator.app
                </a>
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-2">Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time. The latest version will be posted on this page with the 
                effective date.
              </p>
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

export default Privacy;

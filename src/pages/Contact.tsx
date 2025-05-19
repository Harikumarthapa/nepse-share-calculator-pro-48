
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Mail } from 'lucide-react';

const Contact: React.FC = () => {
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
            <CardTitle className="text-xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-4">Get in Touch</h2>
              <p className="mb-6">
                We'd love to hear from you! Whether you have questions, feedback, or suggestions for improving 
                our calculator, please don't hesitate to reach out.
              </p>
              
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-nepse-blue" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p>
                      <a href="mailto:hello@sharecalculator.app" className="text-nepse-blue hover:underline">
                        hello@sharecalculator.app
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-1">Website</h3>
                  <p>
                    <a href="https://sharecalculator.app" target="_blank" rel="noopener noreferrer" className="text-nepse-blue hover:underline">
                      sharecalculator.app
                    </a>
                  </p>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-1">Response Time</h3>
                  <p>We typically respond to all inquiries within 1-2 business days.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-4">Common Inquiries</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Calculator Feedback</h3>
                  <p className="text-sm">
                    Found a bug or have a feature suggestion? Email us at 
                    <a href="mailto:feedback@sharecalculator.app" className="text-nepse-blue hover:underline mx-1">
                      feedback@sharecalculator.app
                    </a>
                    with details.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Technical Support</h3>
                  <p className="text-sm">
                    Having issues with the calculator? Email 
                    <a href="mailto:support@sharecalculator.app" className="text-nepse-blue hover:underline mx-1">
                      support@sharecalculator.app
                    </a>
                    and we'll help you out.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Partnership Inquiries</h3>
                  <p className="text-sm">
                    Interested in working together? Please contact us at 
                    <a href="mailto:partners@sharecalculator.app" className="text-nepse-blue hover:underline mx-1">
                      partners@sharecalculator.app
                    </a>
                    with your proposal.
                  </p>
                </div>
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

export default Contact;

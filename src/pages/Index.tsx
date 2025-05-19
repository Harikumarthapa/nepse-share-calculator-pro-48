
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NEPSECalculator from '@/components/NEPSECalculator';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 50% scroll height
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;
      
      setShowScrollToTop(scrollPercentage >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-[80%] mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-nepse-blue">NEPSE Share Calculator - Instant cost, tax, and profit breakdown—no more guesswork.</h1>
        </header>
        
        <NEPSECalculator />
        
        <div className="mt-8 space-y-4 text-center text-sm text-gray-600">
          <p>
            © 2025 <a href="https://sharecalculator.app/" className="text-nepse-blue hover:underline">Share Calculator</a>. 
            All rates based on current SEBON/NEPSE official guidelines.
          </p>
          <p>
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

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 bg-nepse-blue text-white hover:bg-nepse-blue/90 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp />
        </Button>
      )}
    </div>
  );
};

export default Index;

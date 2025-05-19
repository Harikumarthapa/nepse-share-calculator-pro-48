
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import NEPSECalculator from '@/components/NEPSECalculator';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled 30% of the page height
      const scrollThreshold = document.documentElement.scrollHeight * 0.3;
      const scrolled = window.scrollY;
      setShowScrollButton(scrolled > scrollThreshold);
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

  // Update document title based on language
  useEffect(() => {
    document.title = t('app.title');
    
    // Set html lang attribute
    document.documentElement.lang = language;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('app.description'));
    }
  }, [language, t]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-[80%] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-nepse-blue mb-4 md:mb-0">{t('app.title')}</h1>
        </header>
        
        <NEPSECalculator />
        
        <div className="mt-8 space-y-4 text-center text-sm text-gray-600">
          <p>
            © 2025 <a href="https://sharecalculator.app/" className="text-nepse-blue hover:underline">Share Calculator</a>. 
            {language === 'en' 
              ? ' All rates based on current SEBON/NEPSE official guidelines.'
              : ' सबै दरहरू हालको SEBON/NEPSE आधिकारिक निर्देशिकाहरूमा आधारित छन्।'}
          </p>
          <p>
            <Link to="/" className="text-nepse-blue hover:underline">Home</Link> | 
            <Link to="/privacy" className="text-nepse-blue hover:underline">Privacy Policy</Link> | 
            <Link to="/terms" className="text-nepse-blue hover:underline">Terms</Link> | 
            <Link to="/disclaimer" className="text-nepse-blue hover:underline"> Disclaimer</Link> | 
            <Link to="/about" className="text-nepse-blue hover:underline"> About</Link> | 
            <Link to="/contact" className="text-nepse-blue hover:underline"> Contact</Link> | 
            <Link to="/sitemap" className="text-nepse-blue hover:underline"> Sitemap</Link>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full p-3 bg-nepse-blue hover:bg-nepse-blue/90 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  );
};

export default Index;

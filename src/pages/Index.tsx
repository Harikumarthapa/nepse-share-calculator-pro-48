
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import NEPSECalculator from '@/components/NEPSECalculator';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

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
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:py-8 sm:px-4">
      <div className={`mx-auto ${isMobile ? 'w-[95%]' : 'w-[85%] max-w-4xl'}`}>
        <header className="flex flex-col items-center mb-6 sm:mb-8">
          {/* Logo */}
          <div className="mb-3 sm:mb-4">
            <img 
              src="/sharecalculator.png" 
              alt="Share Calculator Logo" 
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          
          {/* H1 Title */}
          <h1 className="text-xl sm:text-3xl font-bold text-nepse-blue mb-2 text-center">{t('app.title')}</h1>
          
          {/* Tagline */}
          <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base px-2">{t('app.tagline')}</p>
        </header>
        
        <NEPSECalculator />
        
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-center text-xs sm:text-sm text-gray-600">
          <p>
            © 2025 <a href="https://sharecalculator.app/" className="text-nepse-blue hover:underline">Share Calculator</a>. 
            {language === 'en' 
              ? ' All rates based on current SEBON/NEPSE official guidelines.'
              : ' सबै दरहरू हालको SEBON/NEPSE आधिकारिक निर्देशिकाहरूमा आधारित छन्।'}
          </p>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <Link to="/" className="text-nepse-blue hover:underline">Home</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy" className="text-nepse-blue hover:underline">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms" className="text-nepse-blue hover:underline">Terms</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/disclaimer" className="text-nepse-blue hover:underline">Disclaimer</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/about" className="text-nepse-blue hover:underline">About</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/contact" className="text-nepse-blue hover:underline">Contact</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/sitemap" className="text-nepse-blue hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full p-2 sm:p-3 bg-nepse-blue hover:bg-nepse-blue/90 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </Button>
      )}
    </div>
  );
};

export default Index;

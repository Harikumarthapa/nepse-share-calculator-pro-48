
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NEPSECalculator from '@/components/NEPSECalculator';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { language, t } = useLanguage();

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

  // Helper to get correct links based on language
  const getLink = (path: string) => {
    return language === 'ne' ? `/ne${path}` : path;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-[80%] mx-auto">
        {/* Language Toggle - Top Right */}
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-nepse-blue">{t('calculator')}</h1>
        </header>
        
        <NEPSECalculator />
        
        <div className="mt-8 space-y-4 text-center text-sm text-gray-600">
          <p>
            <a href={language === 'ne' ? 'https://sharecalculator.app/ne/' : 'https://sharecalculator.app/'} className="text-nepse-blue hover:underline">
              {language === 'ne' ? 'शेयर क्याल्कुलेटर' : 'Share Calculator'}
            </a>. 
            {t('copyright')}
          </p>
          <p>
            <Link to={getLink('/')} className="text-nepse-blue hover:underline">{t('home')}</Link> | 
            <Link to={getLink('/privacy')} className="text-nepse-blue hover:underline"> {t('privacy')}</Link> | 
            <Link to={getLink('/terms')} className="text-nepse-blue hover:underline"> {t('terms')}</Link> | 
            <Link to={getLink('/disclaimer')} className="text-nepse-blue hover:underline"> {t('disclaimer')}</Link> | 
            <Link to={getLink('/about')} className="text-nepse-blue hover:underline"> {t('about')}</Link> | 
            <Link to={getLink('/contact')} className="text-nepse-blue hover:underline"> {t('contact')}</Link> | 
            <Link to={getLink('/sitemap')} className="text-nepse-blue hover:underline"> {t('sitemap')}</Link>
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

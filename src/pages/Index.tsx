
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import NEPSECalculator from '@/components/NEPSECalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  // SEO optimization
  useSEO({
    title: t('app.document.title'),
    description: t('app.description'),
    canonical: 'https://sharecalculator.app/',
    ogImage: 'https://sharecalculator.app/sharecalculatornepal.webp'
  });

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

  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Add breadcrumb structured data
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sharecalculator.app/"
        }
      ]
    };
    
    // Remove existing breadcrumb schema if any
    const existingBreadcrumb = document.querySelector('script[data-breadcrumb]');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }
    
    // Add new breadcrumb schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:py-8 sm:px-4">
      <div className={`mx-auto ${isMobile ? 'w-full' : 'w-[90%] max-w-6xl'}`}>
        <header className="flex flex-col items-center mb-6 sm:mb-8">
          {/* Logo with optimized loading */}
          <div className="mb-3 sm:mb-4">
            <img 
              src="/sharecalculator.png" 
              alt="Share Calculator Logo" 
              className="h-12 sm:h-16 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* H1 Title */}
          <h1 className="text-xl sm:text-3xl font-bold text-nepse-blue mb-2 text-center">{t('app.title')}</h1>
          
          {/* Tagline */}
          <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base px-2">{t('app.tagline')}</p>
        </header>
        
        <NEPSECalculator />
        
        {/* Additional Tools Section */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-nepse-blue mb-4 text-center">
            Other Financial Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-nepse-blue/10 rounded-lg">
                    <svg className="h-5 w-5 text-nepse-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-nepse-blue">IPO Returns Calculator</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Calculate your IPO returns with circuit analysis for newly listed shares in Nepal
                </p>
                <Link 
                  to="/ipo-calculator" 
                  className="inline-flex items-center text-sm text-nepse-blue hover:underline"
                >
                  Try IPO Calculator →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow opacity-60">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-500">SIP Calculator</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Calculate systematic investment plan returns (Coming Soon)
                </p>
                <span className="inline-flex items-center text-sm text-gray-400">
                  Coming Soon
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
        
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

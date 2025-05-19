
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize language based on URL path
  const initialLanguage: Language = location.pathname.startsWith('/ne') ? 'ne' : 'en';
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  // Update URL when language changes
  useEffect(() => {
    const currentPath = location.pathname;
    const isNepaliPath = currentPath.startsWith('/ne');
    
    if (language === 'ne' && !isNepaliPath) {
      // Add /ne prefix if switching to Nepali
      navigate(`/ne${currentPath === '/' ? '' : currentPath}`, { replace: true });
    } else if (language === 'en' && isNepaliPath) {
      // Remove /ne prefix if switching to English
      navigate(currentPath.replace(/^\/ne/, '') || '/', { replace: true });
    }
  }, [language, location.pathname, navigate]);

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ne' : 'en'));
  };

  // Translation function (to be expanded with full translations)
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation objects
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Page titles and descriptions
    'app.title': 'NEPSE Share Calculator - Detailed cost and tax breakdown for every buy and sell.',
    'app.description': 'Calculate your share profit/loss, capital gains tax (CGT) and Return on Investment for free with NEPSE Share Calculator. Accurate, fast, and easy-to-use.',
    
    // Calculator headers
    'calculator.title': 'Share Calculator - Buy & Sell',
    'calculator.transaction.details': 'Transaction Details',
    'calculator.results': 'Calculation Results',
    
    // Input fields
    'transaction.type': 'Transaction Type',
    'buy': 'Buy',
    'sell': 'Sell',
    'quantity': 'Quantity',
    'price': 'Price Per Share',
    'buy.price': 'Buy Price Per Share',
    'sell.price': 'Sell Price Per Share',
    'investor.type': 'Investor Type',
    'individual': 'Individual',
    'institutional': 'Institutional',
    'holding.period': 'Holding Period',
    'days': 'days',
    'include.dp': 'Include DP Charge',
    'calculate': 'Calculate',
    'reset': 'Reset',
    
    // Result sections
    'input.summary': 'Input Summary',
    'fee.breakdown': 'Fee Breakdown',
    'tax.calculation': 'Tax Calculation',
    'final.result': 'Final Result',
    
    // Footer links
    'footer.home': 'Home',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.disclaimer': 'Disclaimer',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.sitemap': 'Sitemap',
    
    // About section
    'about.title': 'About Share Calculator',
    'about.tab': 'About',
    'fees.tab': 'Fees & Taxes',
    'faq.tab': 'FAQ',
    'embed.title': 'Embed This Calculator',
  },
  ne: {
    // Page titles and descriptions
    'app.title': 'नेप्से सेयर क्याल्कुलेटर - हरेक किनबेचको लागि विस्तृत लागत र कर विश्लेषण।',
    'app.description': 'नेप्से सेयर क्याल्कुलेटरसँग आफ्नो नाफा/घाटा, पुँजीगत लाभ कर र लगानीको प्रतिफल निःशुल्क गणना गर्नुहोस्। सटीक, छिटो, र प्रयोग गर्न सजिलो।',
    
    // Calculator headers
    'calculator.title': 'सेयर क्याल्कुलेटर - खरिद र बिक्री',
    'calculator.transaction.details': 'कारोबार विवरण',
    'calculator.results': 'गणना परिणामहरू',
    
    // Input fields
    'transaction.type': 'कारोबार प्रकार',
    'buy': 'खरिद',
    'sell': 'बिक्री',
    'quantity': 'संख्या',
    'price': 'प्रति सेयर मूल्य',
    'buy.price': 'खरिद मूल्य प्रति सेयर',
    'sell.price': 'बिक्री मूल्य प्रति सेयर',
    'investor.type': 'लगानीकर्ता प्रकार',
    'individual': 'व्यक्तिगत',
    'institutional': 'संस्थागत',
    'holding.period': 'होल्डिङ अवधि',
    'days': 'दिन',
    'include.dp': 'डिपी शुल्क समावेश गर्नुहोस्',
    'calculate': 'गणना गर्नुहोस्',
    'reset': 'रिसेट',
    
    // Result sections
    'input.summary': 'इनपुट सारांश',
    'fee.breakdown': 'शुल्क विवरण',
    'tax.calculation': 'कर गणना',
    'final.result': 'अन्तिम परिणाम',
    
    // Footer links
    'footer.home': 'होम',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'नियम तथा शर्तहरू',
    'footer.disclaimer': 'अस्वीकरण',
    'footer.about': 'हाम्रो बारेमा',
    'footer.contact': 'सम्पर्क',
    'footer.sitemap': 'साइटम्याप',
    
    // About section
    'about.title': 'सेयर क्याल्कुलेटरको बारेमा',
    'about.tab': 'बारेमा',
    'fees.tab': 'शुल्क र करहरू',
    'faq.tab': 'प्राय सोधिने प्रश्नहरू',
    'embed.title': 'यो क्याल्कुलेटर एम्बेड गर्नुहोस्',
  }
};


import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

const defaultTranslations = {
  calculator: {
    en: 'NEPSE Share Calculator - Instant cost, tax, and profit breakdown—no more guesswork.',
    ne: 'नेप्से शेयर क्याल्कुलेटर - तुरुन्तै लागत, कर, र नाफा विवरण—अब अनुमान होइन।'
  },
  transactionDetails: {
    en: 'Transaction Details',
    ne: 'लेनदेन विवरण'
  },
  calculationResults: {
    en: 'Calculation Results',
    ne: 'गणना परिणामहरू'
  },
  shareCalculator: {
    en: 'Share Calculator - Buy & Sell',
    ne: 'शेयर क्याल्कुलेटर - किन्ने र बेच्ने'
  },
  faq: {
    en: 'Frequently Asked Questions (FAQs)',
    ne: 'बारम्बार सोधिने प्रश्नहरू'
  },
  whyDifferent: {
    en: 'Why is my profit different from other calculators?',
    ne: 'मेरो नाफा अन्य क्याल्कुलेटरहरूभन्दा किन फरक छ?'
  },
  whyDifferentAnswer: {
    en: 'Results may differ between calculators due to different rounding methods for tax calculations, whether DP charges are included, how broker commission slabs are applied, and whether all regulatory fees are included. This calculator follows the latest NEPSE guidelines and includes all applicable fees and taxes.',
    ne: 'कर गणनाको लागि विभिन्न राउन्डिंग तरिकाहरू, डीपी शुल्क समावेश छ कि छैन, ब्रोकर कमिशन स्ल्याबहरू कसरी लागू गरिन्छ, र सबै नियामक शुल्कहरू समावेश छ कि छैन जस्ता कारणले गर्दा क्याल्कुलेटरहरू बीच नतिजा फरक हुन सक्छ। यो क्याल्कुलेटरले नेप्सेका नवीनतम मार्गदर्शनहरू अनुसरण गर्दछ र सबै लागू शुल्क र करहरू समावेश गर्दछ।'
  },
  waccPrice: {
    en: 'What is WACC price?',
    ne: 'WACC मूल्य के हो?'
  },
  waccPriceAnswer: {
    en: 'WACC (Weighted Average Cost of Capital) price in the context of NEPSE refers to the average price at which you acquired shares of a company, including all transaction costs.',
    ne: 'WACC (वेटेड एभरेज कस्ट अफ क्यापिटल) मूल्य नेप्सेको सन्दर्भमा तपाईंले एक कम्पनीको शेयरहरू प्राप्त गर्ने औसत मूल्य हो, जसमा सबै लेनदेन लागतहरू समावेश छन्।'
  },
  roiCalculation: {
    en: 'How is ROI calculated?',
    ne: 'ROI कसरी गणना गरिन्छ?'
  },
  roiCalculationAnswer: {
    en: 'ROI (Return on Investment) is calculated as: ROI = (Net Profit / Total Cost of Investment) × 100%. This calculator accounts for all fees and taxes to give you the most accurate ROI figure.',
    ne: 'ROI (रिटर्न अन इन्भेस्टमेन्ट) निम्न अनुसार गणना गरिन्छ: ROI = (नेट नाफा / लगानीको कुल लागत) × १००%। यो क्याल्कुलेटरले तपाईंलाई सबैभन्दा सही ROI आंकडा दिन सबै शुल्क र करहरू समावेश गर्दछ।'
  },
  tradingHours: {
    en: 'What are the latest NEPSE trading hours?',
    ne: 'नेप्सेको पछिल्लो ट्रेडिंग समय के हो?'
  },
  tradingHoursAnswer: {
    en: 'NEPSE trading sessions currently run from Sunday to Thursday, 11:00 AM to 3:00 PM Nepal time. The market remains closed on Fridays, Saturdays, and public holidays.',
    ne: 'नेप्सेको ट्रेडिंग सेसन हाल आइतबारदेखि बिहीबारसम्म, नेपाल समयअनुसार बिहान ११:०० बजेदेखि दिउँसो ३:०० बजेसम्म चल्छ। बजार शुक्रबार, शनिबार र सार्वजनिक बिदाहरूमा बन्द रहन्छ।'
  },
  embedCalculator: {
    en: 'Embed This Calculator',
    ne: 'यो क्याल्कुलेटर एम्बेड गर्नुहोस्'
  },
  aboutNepseCalculator: {
    en: 'About NEPSE Share Calculator',
    ne: 'नेप्से शेयर क्याल्कुलेटरको बारेमा'
  },
  whatIsCalculator: {
    en: 'What is the Share Calculator App?',
    ne: 'शेयर क्याल्कुलेटर एप के हो?'
  },
  whatIsCalculatorAnswer: {
    en: 'This calculator follows official SEBON/NEPSE guidelines for all fee calculations. It provides accurate estimates of transaction costs, capital gains tax, and potential profit/loss for NEPSE listed securities.',
    ne: 'यो क्याल्कुलेटरले सबै शुल्क गणनाहरूको लागि आधिकारिक SEBON/NEPSE मार्गनिर्देशहरू अनुसरण गर्दछ। यसले नेप्सेमा सूचीबद्ध प्रतिभूतिहरूको लागि लेनदेन लागत, पूँजीगत लाभ कर, र सम्भावित नाफा/घाटाको सही अनुमान प्रदान गर्दछ।'
  },
  copyright: {
    en: '© 2025 Share Calculator. All rates based on current SEBON/NEPSE official guidelines.',
    ne: '© २०२५ शेयर क्याल्कुलेटर। सबै दरहरू SEBON/NEPSE का हालको आधिकारिक मार्गनिर्देशहरूमा आधारित छन्।'
  },
  home: {
    en: 'Home',
    ne: 'होम'
  },
  privacy: {
    en: 'Privacy Policy',
    ne: 'गोपनीयता नीति'
  },
  terms: {
    en: 'Terms',
    ne: 'सर्तहरू'
  },
  disclaimer: {
    en: 'Disclaimer',
    ne: 'अस्वीकरण'
  },
  about: {
    en: 'About Us',
    ne: 'हाम्रो बारेमा'
  },
  contact: {
    en: 'Contact',
    ne: 'सम्पर्क'
  },
  sitemap: {
    en: 'Sitemap',
    ne: 'साइटम्याप'
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: defaultTranslations,
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get language from URL or localStorage
  const getInitialLanguage = (): Language => {
    // Check if URL has language code
    const path = window.location.pathname;
    if (path.startsWith('/ne')) return 'ne';
    
    // Check localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'ne' ? 'ne' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const [translations] = useState(defaultTranslations);

  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Update URL based on language
    const path = window.location.pathname;
    if (language === 'ne' && !path.startsWith('/ne')) {
      const newPath = path === '/' ? '/ne' : `/ne${path}`;
      window.history.pushState({}, '', newPath);
    } else if (language === 'en' && path.startsWith('/ne')) {
      const newPath = path === '/ne' ? '/' : path.replace('/ne', '');
      window.history.pushState({}, '', newPath);
    }

    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.'); // Allow for nested keys like "common.button"
    let result = translations;
    
    for (const k of keys) {
      if (!result[k]) return key; // Key not found
      result = result[k] as any;
    }
    
    return result[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

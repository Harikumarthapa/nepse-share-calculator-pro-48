
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
    
    // Fee breakdown section
    'transaction.value': 'Transaction Value',
    'broker.commission': 'Broker Commission',
    'sebon.fee': 'SEBON Fee',
    'dp.charge': 'DP Charge',
    'total.cost': 'Total Cost',
    'cost.per.share': 'Cost Per Share',
    
    // Tax calculation section
    'cost.of.acquisition': 'Total Cost of Acquisition',
    'net.selling.price': 'Net Selling Price',
    'capital.gain.loss': 'Capital Gain/Loss',
    'capital.gains.tax': 'Capital Gains Tax',
    'cgt.tooltip': 'CGT Rates:\nIndividual, ≥365 days: 5%\nIndividual, <365 days: 7.5%\nInstitutional: 10%\nNo tax on capital loss',
    
    // Final result section
    'total.cost.final': 'Total Cost',
    'cost.per.share.final': 'Cost Per Share',
    'net.receivable': 'Net Receivable',
    'profit.loss': 'Profit/Loss',
    'roi': 'ROI',
    
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
    
    // About tab content
    'about.calculator.title': 'Share Calculator App',
    'about.calculator.description': 'Instantly calculate your share profit/loss, average price, and capital gains tax (CGT) for stocks listed on the Nepal Stock Exchange. Accurate, fast, and updated for FY 2080/81.',
    'about.calculator.guidelines': 'This calculator follows official SEBON/NEPSE guidelines for all fee calculations.',
    
    'about.features.title': 'Features',
    'feature.1': 'Calculate buying costs including broker commission, SEBON fees, and DP charges',
    'feature.2': 'Compute selling proceeds after deducting all applicable fees and taxes',
    'feature.3': 'Accurate capital gains tax (CGT) calculation based on holding period and investor type',
    'feature.4': 'Visualize fee breakdowns and transaction costs clearly',
    'feature.5': 'Export calculation results as PDF or PNG for record keeping',
    'feature.6': 'Free to use with no registration required',
    
    'about.howworks.title': 'How It Works',
    'howworks.step1.title': '1. Choose Transaction Type',
    'howworks.step1.description': 'Select whether you\'re calculating the costs for buying shares or selling shares.',
    'howworks.step2.title': '2. Enter Transaction Details',
    'howworks.step2.description': 'Provide share quantity, price per share, and other relevant information.',
    'howworks.step3.title': '3. Get Detailed Breakdown',
    'howworks.step3.description': 'View comprehensive results including all fees, taxes, and net profit/loss.',
    'howworks.step4.title': '4. Save or Share Results',
    'howworks.step4.description': 'Download the calculation results as PDF or PNG for your records or to share with others.',
    
    // Fees & Taxes tab content
    'fees.broker.commission.title': 'Broker Commission Explained',
    'fees.broker.commission.description': 'Broker commission in Nepal follows a slab rate system based on transaction value:',
    'fees.broker.commission.impact': 'These commissions are charged on both buy and sell transactions, affecting your overall investment returns.',
    
    'fees.dp.sebon.title': 'DP Charge & SEBON Fees',
    'fees.dp.charge.title': 'DP Charge',
    'fees.dp.charge.description': 'The Depository Participant (DP) charge is a fixed fee of Rs. 25 per company per transaction. This fee is collected for maintaining electronic records of your share ownership.',
    'fees.dp.charge.example': 'For example, if you buy shares of 3 different companies in separate transactions, you\'ll pay Rs. 25 × 3 = Rs. 75 as DP charges.',
    
    'fees.sebon.fee.title': 'SEBON Fee',
    'fees.sebon.fee.description': 'The Securities Board of Nepal (SEBON) regulates the securities market and charges a fee of 0.015% on the transaction amount for both buy and sell transactions.',
    'fees.sebon.fee.example': 'For example, on a transaction of Rs. 100,000, the SEBON fee would be Rs. 15 (100,000 × 0.00015).',
    
    'fees.cgt.title': 'Capital Gains Tax in Nepal',
    'fees.cgt.description': 'Capital Gains Tax (CGT) in Nepal is applied on the profit made from selling shares. The rate varies based on investor type and holding period:',
    'fees.cgt.notes': 'Important points about CGT in Nepal:',
    'fees.cgt.note1': 'CGT is only applicable on profit (capital gain), not on the entire selling amount',
    'fees.cgt.note2': 'No tax is levied if you incur a loss',
    'fees.cgt.note3': 'Your broker automatically deducts CGT at the time of selling shares',
    
    'fees.tax.buyingselling.title': 'Tax on Buying and Selling Shares',
    'fees.tax.buyingselling.description': 'In Nepal\'s stock market, taxes are asymmetrically applied: there is no direct tax when buying shares, but Capital Gains Tax is applied when selling shares at a profit. However, both buy and sell transactions incur SEBON fees (0.015% each) and broker commissions. Understanding these tax implications is essential for calculating your true net returns, especially for short-term trading strategies where the higher 7.5% CGT rate applies for holdings under 365 days. Our calculator factors in all these elements to give you the most accurate estimation of your actual returns after all costs.',
    
    // FAQ tab content
    'faq.different.calculators.question': 'Why is my profit different from other calculators?',
    'faq.different.calculators.answer': 'Results may differ between calculators due to:',
    'faq.different.calculators.reason1': 'Different rounding methods for tax calculations',
    'faq.different.calculators.reason2': 'Whether DP charges are included',
    'faq.different.calculators.reason3': 'How broker commission slabs are applied',
    'faq.different.calculators.reason4': 'Whether all regulatory fees are included',
    'faq.different.calculators.note': 'This calculator follows the latest NEPSE guidelines and includes all applicable fees and taxes.',
    
    'faq.wacc.question': 'What is WACC price?',
    'faq.wacc.answer': 'WACC (Weighted Average Cost of Capital) price in the context of NEPSE refers to the average price at which you acquired shares of a company, including all transaction costs.',
    'faq.wacc.example': 'For example, if you bought shares at different times and prices:',
    'faq.wacc.example1': '100 shares @ Rs 500 (Cost: Rs 50,000)',
    'faq.wacc.example2': '150 shares @ Rs 450 (Cost: Rs 67,500)',
    'faq.wacc.calculation': 'Your WACC price would be total cost (Rs 117,500) divided by total shares (250), which equals Rs 470 per share.',
    'faq.wacc.note': 'This calculator shows your cost per share as the WACC price when you use the Buy Calculator.',
    
    'faq.roi.question': 'How is ROI calculated?',
    'faq.roi.answer': 'ROI (Return on Investment) is calculated as:',
    'faq.roi.formula': 'ROI = (Net Profit / Total Cost of Investment) × 100%',
    'faq.roi.where': 'Where:',
    'faq.roi.netprofit': 'Net Profit = Net Selling Price - Total Cost of Acquisition',
    'faq.roi.netselling': 'Net Selling Price = Selling Amount - Selling Costs (broker commission, SEBON fee, DP charge, CGT)',
    'faq.roi.totalcost': 'Total Cost of Acquisition = Buying Amount + Buying Costs (broker commission, SEBON fee, DP charge)',
    'faq.roi.note': 'This calculator accounts for all these factors to give you the most accurate ROI figure.',
    
    'faq.trading.hours.question': 'What are the latest NEPSE trading hours?',
    'faq.trading.hours.answer': 'NEPSE trading hours (as of 2024):',
    'faq.trading.hours.days': 'Trading Days: Sunday to Thursday (Nepal follows a Sunday-Friday week)',
    'faq.trading.hours.preopen': 'Pre-open Session: 10:30 AM - 11:00 AM',
    'faq.trading.hours.regular': 'Regular Trading Hours: 11:00 AM - 3:00 PM',
    'faq.trading.hours.closed': 'Closed: Friday, Saturday, and public holidays',
    'faq.trading.hours.note': 'Note: Trading hours may change, so always check the official NEPSE website for the most current information.',
    
    // Downloads and buttons
    'download.pdf': 'Download PDF',
    'download.png': 'Download PNG',
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
    
    // Fee breakdown section
    'transaction.value': 'कारोबार मूल्य',
    'broker.commission': 'ब्रोकर कमिशन',
    'sebon.fee': 'सेबोन शुल्क',
    'dp.charge': 'डिपी शुल्क',
    'total.cost': 'कुल लागत',
    'cost.per.share': 'प्रति सेयर लागत',
    
    // Tax calculation section
    'cost.of.acquisition': 'प्राप्तिको कुल लागत',
    'net.selling.price': 'खुद बिक्री मूल्य',
    'capital.gain.loss': 'पूँजीगत लाभ/घाटा',
    'capital.gains.tax': 'पूँजीगत लाभ कर',
    'cgt.tooltip': 'पूँजीगत लाभ कर दरहरू:\nव्यक्तिगत, ≥३६५ दिन: ५%\nव्यक्तिगत, <३६५ दिन: ७.५%\nसंस्थागत: १०%\nघाटामा कर लाग्दैन',
    
    // Final result section
    'total.cost.final': 'कुल लागत',
    'cost.per.share.final': 'प्रति सेयर लागत',
    'net.receivable': 'खुद प्राप्य',
    'profit.loss': 'नाफा/घाटा',
    'roi': 'आरओआई',
    
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
    'embed.title': 'Embed This Calculator',
    
    // About tab content
    'about.calculator.title': 'सेयर क्याल्कुलेटर एप',
    'about.calculator.description': 'नेपाल स्टक एक्सचेन्जमा सूचीबद्ध सेयरहरूको लागि तुरुन्तै आफ्नो नाफा/नोक्सान, औसत मूल्य, र पूँजीगत लाभ कर (सीजीटी) गणना गर्नुहोस्। सटीक, छिटो, र आर्थिक वर्ष २०८०/८१ का लागि अपडेट गरिएको।',
    'about.calculator.guidelines': 'यो क्याल्कुलेटरले सबै शुल्क गणनाहरूको लागि आधिकारिक SEBON/NEPSE दिशानिर्देशहरू पालना गर्दछ।',
    
    'about.features.title': 'विशेषताहरू',
    'feature.1': 'ब्रोकर कमिशन, सेबोन शुल्क, र डिपी शुल्क सहित खरिद लागतहरू गणना गर्नुहोस्',
    'feature.2': 'सबै लागू शुल्क र करहरू कटाएपछि बिक्री आय गणना गर्नुहोस्',
    'feature.3': 'होल्डिङ अवधि र लगानीकर्ता प्रकारमा आधारित सटीक पूँजीगत लाभ कर (CGT) गणना',
    'feature.4': 'शुल्क विभाजन र कारोबार लागतहरू स्पष्ट रूपमा देखाउनुहोस्',
    'feature.5': 'रेकर्ड राख्नको लागि PDF वा PNG को रूपमा गणना परिणामहरू निर्यात गर्नुहोस्',
    'feature.6': 'दर्ता आवश्यक नभई निःशुल्क प्रयोग गर्न सकिने',
    
    'about.howworks.title': 'यसरी काम गर्छ',
    'howworks.step1.title': '१. कारोबार प्रकार छान्नुहोस्',
    'howworks.step1.description': 'सेयर खरिद गर्ने वा बिक्री गर्ने लागतको गणना गर्ने हो भनेर छान्नुहोस्।',
    'howworks.step2.title': '२. कारोबार विवरणहरू प्रविष्ट गर्नुहोस्',
    'howworks.step2.description': 'सेयर संख्या, प्रति सेयर मूल्य, र अन्य सम्बन्धित जानकारी प्रदान गर्नुहोस्।',
    'howworks.step3.title': '३. विस्तृत विश्लेषण प्राप्त गर्नुहोस्',
    'howworks.step3.description': 'सबै शुल्क, कर र खुद नाफा/नोक्सान सहित व्यापक परिणामहरू हेर्नुहोस्।',
    'howworks.step4.title': '४. परिणामहरू सुरक्षित वा साझा गर्नुहोस्',
    'howworks.step4.description': 'आफ्नो रेकर्डको लागि वा अरूसँग साझा गर्न गणना परिणामहरू PDF वा PNG को रूपमा डाउनलोड गर्नुहोस्।',
    
    // Fees & Taxes tab content
    'fees.broker.commission.title': 'ब्रोकर कमिशन व्याख्या',
    'fees.broker.commission.description': 'नेपालमा ब्रोकर कमिशन कारोबार मूल्यमा आधारित स्लाब दर प्रणाली अनुसार हुन्छ:',
    'fees.broker.commission.impact': 'यी कमिशनहरू खरिद र बिक्री दुवै कारोबारमा लगाइन्छ, जसले तपाईंको समग्र लगानी प्रतिफलमा असर गर्दछ।',
    
    'fees.dp.sebon.title': 'डिपी शुल्क र सेबोन शुल्कहरू',
    'fees.dp.charge.title': 'डिपी शुल्क',
    'fees.dp.charge.description': 'डिपोजिटरी पार्टिसिपेन्ट (डिपी) शुल्क प्रति कम्पनी प्रति कारोबार रु. २५ को निश्चित शुल्क हो। यो शुल्क तपाईंको सेयर स्वामित्वको इलेक्ट्रोनिक रेकर्ड राख्नको लागि संकलन गरिन्छ।',
    'fees.dp.charge.example': 'उदाहरणका लागि, यदि तपाईंले छुट्टाछुट्टै कारोबारमा ३ फरक कम्पनीहरूको सेयर किन्नुहुन्छ भने, तपाईंले रु. २५ × ३ = रु. ७५ डिपी शुल्कको रूपमा तिर्नुपर्नेछ।',
    
    'fees.sebon.fee.title': 'सेबोन शुल्क',
    'fees.sebon.fee.description': 'नेपालको धितोपत्र बोर्ड (सेबोन) ले धितोपत्र बजारलाई नियमन गर्छ र खरिद र बिक्री दुवै कारोबारमा कारोबार रकममा ०.०१५% शुल्क लगाउँछ।',
    'fees.sebon.fee.example': 'उदाहरणका लागि, रु. १,००,००० को कारोबारमा, सेबोन शुल्क रु. १५ (१,००,००० × ०.०००१५) हुनेछ।',
    
    'fees.cgt.title': 'नेपालमा पूँजीगत लाभ कर',
    'fees.cgt.description': 'नेपालमा पूँजीगत लाभ कर (CGT) सेयर बिक्री गरेर आर्जित नाफामा लगाइन्छ। दर लगानीकर्ता प्रकार र होल्डिङ अवधिमा आधारित भिन्न हुन्छ:',
    'fees.cgt.notes': 'नेपालमा CGT बारे महत्त्वपूर्ण बुँदाहरू:',
    'fees.cgt.note1': 'CGT केवल नाफा (पूँजीगत लाभ) मा लागू हुन्छ, सम्पूर्ण बिक्री रकममा होइन',
    'fees.cgt.note2': 'यदि तपाईंले घाटा बेहोर्नुपर्यो भने कर लगाइँदैन',
    'fees.cgt.note3': 'तपाईंको ब्रोकरले सेयर बिक्री गर्ने समयमा स्वतः CGT कटौती गर्छ',
    
    'fees.tax.buyingselling.title': 'सेयर खरिद र बिक्रीमा कर',
    'fees.tax.buyingselling.description': 'नेपालको शेयर बजारमा, करहरू असमान रूपमा लागू हुन्छन्: सेयर खरिद गर्दा कुनै प्रत्यक्ष कर लाग्दैन, तर नाफामा सेयर बिक्री गर्दा पूँजीगत लाभ कर लाग्छ। यद्यपि, खरिद र बिक्री दुवै कारोबारमा सेबोन शुल्क (प्रत्येक ०.०१५%) र ब्रोकर कमिशन लाग्छ। यी कर प्रभावहरू बुझ्नु तपाईंको वास्तविक खुद प्रतिफलको गणना गर्नका लागि आवश्यक छ, विशेष गरी छोटो अवधिको व्यापार रणनीतिहरूका लागि जहाँ ३६५ दिन भन्दा कम होल्डिंगको लागि उच्च ७.५% CGT दर लागू हुन्छ। हाम्रो क्याल्कुलेटरले सबै लागतहरू पछिको तपाईंको वास्तविक प्रतिफलको सबैभन्दा सटीक अनुमान दिन यी सबै तत्वहरूलाई ध्यानमा राख्छ।',
    
    // FAQ tab content
    'faq.different.calculators.question': 'मेरो नाफा अन्य क्याल्कुलेटरहरूभन्दा किन फरक छ?',
    'faq.different.calculators.answer': 'क्याल्कुलेटरहरू बीच परिणामहरू निम्न कारणहरूले फरक हुन सक्छन्:',
    'faq.different.calculators.reason1': 'कर गणनाको लागि फरक राउन्डिंग विधिहरू',
    'faq.different.calculators.reason2': 'डिपी शुल्कहरू समावेश भए नभएको',
    'faq.different.calculators.reason3': 'ब्रोकर कमिशन स्लाबहरू कसरी लागू गरिन्छ',
    'faq.different.calculators.reason4': 'सबै नियामक शुल्कहरू समावेश भए नभएको',
    'faq.different.calculators.note': 'यो क्याल्कुलेटरले नवीनतम नेप्से दिशानिर्देशहरू पालना गर्छ र सबै लागू शुल्क र करहरू समावेश गर्दछ।',
    
    'faq.wacc.question': 'WACC मूल्य के हो?',
    'faq.wacc.answer': 'नेप्से सन्दर्भमा WACC (Weighted Average Cost of Capital) मूल्य भनेको तपाईंले कम्पनीको सेयर प्राप्त गरेको औसत मूल्य हो, जसमा सबै कारोबार लागतहरू समावेश छन्।',
    'faq.wacc.example': 'उदाहरणका लागि, यदि तपाईंले विभिन्न समय र मूल्यमा सेयरहरू किन्नुभयो भने:',
    'faq.wacc.example1': '१०० सेयर @ रु ५०० (लागत: रु ५०,०००)',
    'faq.wacc.example2': '१५० सेयर @ रु ४५० (लागत: रु ६७,५००)',
    'faq.wacc.calculation': 'तपाईंको WACC मूल्य कुल लागत (रु ११७,५००) लाई कुल सेयर (२५०) ले भाग गरेर, जुन प्रति सेयर रु ४७० हुन्छ।',
    'faq.wacc.note': 'यो क्याल्कुलेटरले तपाईंले खरिद क्याल्कुलेटर प्रयोग गर्दा तपाईंको प्रति सेयर लागतलाई WACC मूल्यको रूपमा देखाउँछ।',
    
    'faq.roi.question': 'ROI कसरी गणना गरिन्छ?',
    'faq.roi.answer': 'ROI (लगानीमा प्रतिफल) यसरी गणना गरिन्छ:',
    'faq.roi.formula': 'ROI = (खुद नाफा / लगानीको कुल लागत) × १००%',
    'faq.roi.where': 'जहाँ:',
    'faq.roi.netprofit': 'खुद नाफा = खुद बिक्री मूल्य - प्राप्तिको कुल लागत',
    'faq.roi.netselling': 'खुद बिक्री मूल्य = बिक्री रकम - बिक्री लागतहरू (ब्रोकर कमिशन, सेबोन शुल्क, डिपी शुल्क, CGT)',
    'faq.roi.totalcost': 'प्राप्तिको कुल लागत = खरिद रकम + खरिद लागतहरू (ब्रोकर कमिशन, सेबोन शुल्क, डिपी शुल्क)',
    'faq.roi.note': 'यो क्याल्कुलेटरले तपाईंलाई सबैभन्दा सटीक ROI आँकडा दिन यी सबै कारकहरूलाई ध्यानमा राख्छ।',
    
    'faq.trading.hours.question': 'नवीनतम नेप्से ट्रेडिङ घण्टाहरू के हुन्?',
    'faq.trading.hours.answer': 'नेप्से ट्रेडिङ घण्टाहरू (२०२४ अनुसार):',
    'faq.trading.hours.days': 'ट्रेडिङ दिनहरू: आइतबारदेखि बिहीबारसम्म (नेपाल आइतबार-शुक्रबार हप्ता पालना गर्छ)',
    'faq.trading.hours.preopen': 'प्रि-ओपन सेसन: १०:३० बिहान - ११:०० बिहान',
    'faq.trading.hours.regular': 'नियमित ट्रेडिङ घण्टाहरू: ११:०० बिहान - ३:०० अपराह्न',
    'faq.trading.hours.closed': 'बन्द: शुक्रबार, शनिबार, र सार्वजनिक बिदाहरू',
    'faq.trading.hours.note': 'नोट: ट्रेडिङ घण्टाहरू परिवर्तन हुन सक्छन्, त्यसैले सधैं नवीनतम जानकारीको लागि आधिकारिक नेप्से वेबसाइट हेर्नुहोस्।',
    
    // Downloads and buttons
    'download.pdf': 'PDF डाउनलोड गर्नुहोस्',
    'download.png': 'PNG डाउनलोड गर्नुहोस्',
  }
};


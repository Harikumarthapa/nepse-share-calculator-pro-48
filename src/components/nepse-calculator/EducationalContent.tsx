import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Book, Calculator, FileText, Link2 } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const EducationalContent: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-8 pt-4 border-t">
      <h2 className="text-2xl font-semibold mb-6">
        {language === 'en' ? 'About Share Calculator' : 'सेयर क्याल्कुलेटरको बारेमा'}
      </h2>
      
      <Tabs defaultValue="about">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="about">
            {language === 'en' ? 'About' : 'बारेमा'}
          </TabsTrigger>
          <TabsTrigger value="fees">
            {language === 'en' ? 'Fees & Taxes' : 'शुल्क र करहरू'}
          </TabsTrigger>
          <TabsTrigger value="faq">
            {language === 'en' ? 'FAQ' : 'प्राय सोधिने प्रश्नहरू'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'Share Calculator App' : 'सेयर क्याल्कुलेटर एप'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                {language === 'en' 
                  ? 'Instantly calculate your share profit/loss, average price, and capital gains tax (CGT) for stocks listed on the Nepal Stock Exchange. Accurate, fast, and updated for FY 2080/81.'
                  : 'नेपाल स्टक एक्सचेन्जमा सूचीबद्ध सेयरहरूको लागि तुरुन्तै आफ्नो नाफा/नोक्सान, औसत मूल्य, र पूँजीगत लाभ कर (सीजीटी) गणना गर्नुहोस्। सटीक, छिटो, र आर्थिक वर्ष २०८०/८१ का लागि अपडेट गरिएको।'}
              </p>
              <p className="mt-3">
                {language === 'en'
                  ? 'This calculator follows official SEBON/NEPSE guidelines for all fee calculations.'
                  : 'यो क्याल्कुलेटरले सबै शुल्क गणनाहरूको लागि आधिकारिक SEBON/NEPSE दिशानिर्देशहरू पालना गर्दछ।'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'Features' : 'विशेषताहरू'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Calculate buying costs including broker commission, SEBON fees, and DP charges'
                      : 'ब्रोकर कमिशन, सेबोन शुल्क, र डिपी शुल्क सहित खरिद लागतहरू गणना गर्नुहोस्'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Compute selling proceeds after deducting all applicable fees and taxes'
                      : 'सबै लागू शुल्क र करहरू कटाएपछि बिक्री आय गणना गर्नुहोस्'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Accurate capital gains tax (CGT) calculation based on holding period and investor type'
                      : 'होल्डिङ अवधि र लगानीकर्ता प्रकारमा आधारित सटीक पूँजीगत लाभ कर (CGT) गणना'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Visualize fee breakdowns and transaction costs clearly'
                      : 'शुल्क विभाजन र कारोबार लागतहरू स्पष्ट रूपमा देखाउनुहोस्'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Export calculation results as PDF or PNG for record keeping'
                      : 'रेकर्ड राख्नको लागि PDF वा PNG को रूपमा गणना परिणामहरू निर्यात गर्नुहोस्'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nepse-blue font-medium">✓</span>
                  <span>
                    {language === 'en'
                      ? 'Free to use with no registration required'
                      : 'दर्ता आवश्यक नभई निःशुल्क प्रयोग गर्न सकिने'}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'How It Works' : 'यसरी काम गर्छ'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? '1. Choose Transaction Type' : '१. कारोबार प्रकार छान्नुहोस्'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Select whether you\'re calculating the costs for buying shares or selling shares.'
                    : 'सेयर खरिद गर्ने वा बिक्री गर्ने लागतको गणना गर्ने हो भनेर छान्नुहोस्।'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? '2. Enter Transaction Details' : '२. कारोबार विवरणहरू प्रविष्ट गर्नुहोस्'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Provide share quantity, price per share, and other relevant information.'
                    : 'सेयर संख्या, प्रति सेयर मूल्य, र अन्य सम्बन्धित जानकारी प्रदान गर्नुहोस्।'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? '3. Get Detailed Breakdown' : '३. विस्तृत विश्लेषण प्राप्त गर्नुहोस्'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'View comprehensive results including all fees, taxes, and net profit/loss.'
                    : 'सबै शुल्क, कर र खुद नाफा/नोक्सान सहित व्यापक परिणामहरू हेर्नुहोस्।'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? '4. Save or Share Results' : '४. परिणामहरू सुरक्षित वा साझा गर्नुहोस्'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Download the calculation results as PDF or PNG for your records or to share with others.'
                    : 'आफ्नो रेकर्डको लागि वा अरूसँग साझा गर्न गणना परिणामहरू PDF वा PNG को रूपमा डाउनलोड गर्नुहोस्।'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'Broker Commission Explained' : 'ब्रोकर कमिशन व्याख्या'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                {language === 'en'
                  ? 'Broker commission in Nepal follows a slab rate system based on transaction value:'
                  : 'नेपालमा ब्रोकर कमिशन कारोबार मूल्यमा आधारित स्लाब दर प्रणाली अनुसार हुन्छ:'}
              </p>
              <table className="w-full mt-2 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">
                      {language === 'en' ? 'Transaction Amount (Rs)' : 'कारोबार रकम (रु.)'}
                    </th>
                    <th className="border p-2 text-left">
                      {language === 'en' ? 'Commission Rate' : 'कमिशन दर'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? 'Up to 50,000' : '५०,००० सम्म'}
                    </td>
                    <td className="border p-2">0.36%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? '50,000 - 500,000' : '५०,००० - ५,००,०००'}
                    </td>
                    <td className="border p-2">0.33%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? '500,000 - 2,000,000' : '५,००,००० - २०,००,०००'}
                    </td>
                    <td className="border p-2">0.31%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? '2,000,000 - 10,000,000' : '२०,००,००० - १,००,००,०००'}
                    </td>
                    <td className="border p-2">0.27%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? 'Above 10,000,000' : '१,००,००,००० भन्दा माथि'}
                    </td>
                    <td className="border p-2">0.24%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                {language === 'en'
                  ? 'These commissions are charged on both buy and sell transactions, affecting your overall investment returns.'
                  : 'यी कमिशनहरू खरिद र बिक्री दुवै कारोबारमा लगाइन्छ, जसले तपाईंको समग्र लगानी प्रतिफलमा असर गर्दछ।'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'DP Charge & SEBON Fees' : 'डिपी शुल्क र सेबोन शुल्कहरू'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? 'DP Charge' : 'डिपी शुल्क'}
                </h4>
                <p className="mt-1">
                  {language === 'en'
                    ? 'The Depository Participant (DP) charge is a fixed fee of Rs. 25 per company per transaction. This fee is collected for maintaining electronic records of your share ownership.'
                    : 'डिपोजिटरी पार्टिसिपेन्ट (डिपी) शुल्क प्रति कम्पनी प्रति कारोबार रु. २५ को निश्चित शुल्क हो। यो शुल्क तपाईंको सेयर स्वामित्वको इलेक्ट्रोनिक रेकर्ड राख्नको लागि संकलन गरिन्छ।'}
                </p>
                <p className="mt-2">
                  {language === 'en'
                    ? 'For example, if you buy shares of 3 different companies in separate transactions, you\'ll pay Rs. 25 × 3 = Rs. 75 as DP charges.'
                    : 'उदाहरणका लागि, यदि तपाईंले छुट्टाछुट्टै कारोबारमा ३ फरक कम्पनीहरूको सेयर किन्नुहुन्छ भने, तपाईंले रु. २५ × ३ = रु. ७५ डिपी शुल्कको रूपमा तिर्नुपर्नेछ।'}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">
                  {language === 'en' ? 'SEBON Fee' : 'सेबोन शुल्क'}
                </h4>
                <p className="mt-1">
                  {language === 'en'
                    ? 'The Securities Board of Nepal (SEBON) regulates the securities market and charges a fee of 0.015% on the transaction amount for both buy and sell transactions.'
                    : 'नेपालको धितोपत्र बोर्ड (सेबोन) ले धितोपत्र बजारलाई नियमन गर्छ र खरिद र बिक्री दुवै कारोबारमा कारोबार रकममा ०.०१५% शुल्क लगाउँछ।'}
                </p>
                <p className="mt-2">
                  {language === 'en'
                    ? 'For example, on a transaction of Rs. 100,000, the SEBON fee would be Rs. 15 (100,000 × 0.00015).'
                    : 'उदाहरणका लागि, रु. १,००,००० को कारोबारमा, सेबोन शुल्क रु. १५ (१,००,००० × ०.०००१५) हुनेछ।'}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nepse-blue" />
                {language === 'en' ? 'Capital Gains Tax in Nepal' : 'नेपालमा पूँजीगत लाभ कर'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                {language === 'en'
                  ? 'Capital Gains Tax (CGT) in Nepal is applied on the profit made from selling shares. The rate varies based on investor type and holding period:'
                  : 'नेपालमा पूँजीगत लाभ कर (CGT) सेयर बिक्री गरेर आर्जित नाफामा लगाइन्छ। दर लगानीकर्ता प्रकार र होल्डिङ अवधिमा आधारित भिन्न हुन्छ:'}
              </p>
              
              <table className="w-full mt-3 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">
                      {language === 'en' ? 'Investor Type' : 'लगानीकर्ता प्रकार'}
                    </th>
                    <th className="border p-2 text-left">
                      {language === 'en' ? 'Holding Period' : 'होल्डिङ अवधि'}
                    </th>
                    <th className="border p-2 text-left">
                      {language === 'en' ? 'Tax Rate' : 'कर दर'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2" rowSpan={2}>
                      {language === 'en' ? 'Individual' : 'व्यक्तिगत'}
                    </td>
                    <td className="border p-2">
                      {language === 'en' ? '365 days or more' : '३६५ दिन वा बढी'}
                    </td>
                    <td className="border p-2">5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? 'Less than 365 days' : '३६५ दिन भन्दा कम'}
                    </td>
                    <td className="border p-2">7.5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      {language === 'en' ? 'Institutional' : 'संस्थागत'}
                    </td>
                    <td className="border p-2">
                      {language === 'en' ? 'Any period' : 'कुनै पनि अवधि'}
                    </td>
                    <td className="border p-2">10%</td>
                  </tr>
                </tbody>
              </table>
              
              <p className="mt-3">
                {language === 'en' ? 'Important points about CGT in Nepal:' : 'नेपालमा CGT बारे महत्त्वपूर्ण बुँदाहरू:'}
              </p>
              <ul className="list-disc pl-5 mt-1">
                <li>
                  {language === 'en'
                    ? 'CGT is only applicable on profit (capital gain), not on the entire selling amount'
                    : 'CGT केवल नाफा (पूँजीगत लाभ) मा लागू हुन्छ, सम्पूर्ण बिक्री रकममा होइन'}
                </li>
                <li>
                  {language === 'en'
                    ? 'No tax is levied if you incur a loss'
                    : 'यदि तपाईंले घाटा बेहोर्नुपर्यो भने कर लगाइँदैन'}
                </li>
                <li>
                  {language === 'en'
                    ? 'Your broker automatically deducts CGT at the time of selling shares'
                    : 'तपाईंको ब्रोकरले सेयर बिक्री गर्ने समयमा स्वतः CGT कटौती गर्छ'}
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-nepse-gray rounded">
                <h5 className="font-medium">
                  {language === 'en' ? 'Tax on Buying and Selling Shares' : 'सेयर खरिद र बिक्रीमा कर'}
                </h5>
                <p className="mt-2">
                  {language === 'en'
                    ? 'In Nepal\'s stock market, taxes are asymmetrically applied: there is no direct tax when buying shares, but Capital Gains Tax is applied when selling shares at a profit. However, both buy and sell transactions incur SEBON fees (0.015% each) and broker commissions. Understanding these tax implications is essential for calculating your true net returns, especially for short-term trading strategies where the higher 7.5% CGT rate applies for holdings under 365 days. Our calculator factors in all these elements to give you the most accurate estimation of your actual returns after all costs.'
                    : 'नेपालको शेयर बजारमा, करहरू असमान रूपमा लागू हुन्छन्: सेयर खरिद गर्दा कुनै प्रत्यक्ष कर लाग्दैन, तर नाफामा सेयर बिक्री गर्दा पूँजीगत लाभ कर लाग्छ। यद्यपि, खरिद र बिक्री दुवै कारोबारमा सेबोन शुल्क (प्रत्येक ०.०१५%) र ब्रोकर कमिशन लाग्छ। यी कर प्रभावहरू बुझ्नु तपाईंको वास्तविक खुद प्रतिफलको गणना गर्नका लागि आवश्यक छ, विशेष गरी छोटो अवधिको व्यापार रणनीतिहरूका लागि जहाँ ३६५ दिन भन्दा कम होल्डिंगको लागि उच्च ७.५% CGT दर लागू हुन्छ। हाम्रो क्याल्कुलेटरले सबै लागतहरू पछिको तपाईंको वास्तविक प्रतिफलको सबैभन्दा सटीक अनुमान दिन यी सबै तत्वहरूलाई ध्यानमा राख्छ।'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">
                {language === 'en'
                  ? 'Why is my profit different from other calculators?'
                  : 'मेरो नाफा अन्य क्याल्कुलेटरहरूभन्दा किन फरक छ?'}
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>
                  {language === 'en'
                    ? 'Results may differ between calculators due to:'
                    : 'क्याल्कुलेटरहरू बीच परिणामहरू निम्न कारणहरूले फरक हुन सक्छन्:'}
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    {language === 'en'
                      ? 'Different rounding methods for tax calculations'
                      : 'कर गणनाको लागि फरक राउन्डिंग विधिहरू'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Whether DP charges are included'
                      : 'डिपी शुल्कहरू समावेश भए नभएको'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'How broker commission slabs are applied'
                      : 'ब्रोकर कमिशन स्लाबहरू कसरी लागू गरिन्छ'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Whether all regulatory fees are included'
                      : 'सबै नियामक शुल्कहरू समावेश भए नभएको'}
                  </li>
                </ul>
                <p className="mt-2">
                  {language === 'en'
                    ? 'This calculator follows the latest NEPSE guidelines and includes all applicable fees and taxes.'
                    : 'यो क्याल्कुलेटरले नवीनतम नेप्से दिशानिर्देशहरू पालना गर्छ र सबै लागू शुल्क र करहरू समावेश गर्दछ।'}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base">
                {language === 'en' ? 'What is WACC price?' : 'WACC मूल्य के हो?'}
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>
                  {language === 'en'
                    ? 'WACC (Weighted Average Cost of Capital) price in the context of NEPSE refers to the average price at which you acquired shares of a company, including all transaction costs.'
                    : 'नेप्से सन्दर्भमा WACC (Weighted Average Cost of Capital) मूल्य भनेको तपाईंले कम्पनीको सेयर प्राप्त गरेको औसत मूल्य हो, जसमा सबै कारोबार लागतहरू समावेश छन्।'}
                </p>
                <p className="mt-2">
                  {language === 'en'
                    ? 'For example, if you bought shares at different times and prices:'
                    : 'उदाहरणका लागि, यदि तपाईंले विभिन्न समय र मूल्यमा सेयरहरू किन्नुभयो भने:'}
                </p>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    {language === 'en'
                      ? '100 shares @ Rs 500 (Cost: Rs 50,000)'
                      : '१०० सेयर @ रु ५०० (लागत: रु ५०,०००)'}
                  </li>
                  <li>
                    {language === 'en'
                      ? '150 shares @ Rs 450 (Cost: Rs 67,500)'
                      : '१५० सेयर @ रु ४५० (लागत: रु ६७,५००)'}
                  </li>
                </ul>
                <p className="mt-2">
                  {language === 'en'
                    ? 'Your WACC price would be total cost (Rs 117,500) divided by total shares (250), which equals Rs 470 per share.'
                    : 'तपाईंको WACC मूल्य कुल लागत (रु ११७,५००) लाई कुल सेयर (२५०) ले भाग गरेर, जुन प्रति सेयर रु ४७० हुन्छ।'}
                </p>
                <p className="mt-2">
                  {language === 'en'
                    ? 'This calculator shows your cost per share as the WACC price when you use the Buy Calculator.'
                    : 'यो क्याल्कुलेटरले तपाईंले खरिद क्याल्कुलेटर प्रयोग गर्दा तपाईंको प्रति सेयर लागतलाई WACC मूल्यको रूपमा देखाउँछ।'}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base">
                {language === 'en' ? 'How is ROI calculated?' : 'ROI कसरी गणना गरिन्छ?'}
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>
                  {language === 'en'
                    ? 'ROI (Return on Investment) is calculated as:'
                    : 'ROI (लगानीमा प्रतिफल) यसरी गणना गरिन्छ:'}
                </p>
                <p className="mt-2 p-2 bg-gray-100 rounded">
                  {language === 'en'
                    ? 'ROI = (Net Profit / Total Cost of Investment) × 100%'
                    : 'ROI = (खुद नाफा / लगानीको कुल लागत) × १००%'}
                </p>
                <p className="mt-2">
                  {language === 'en' ? 'Where:' : 'जहाँ:'}
                </p>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    {language === 'en'
                      ? 'Net Profit = Net Selling Price - Total Cost of Acquisition'
                      : 'खुद नाफा = खुद बिक्री मूल्य - प्राप्तिको कुल लागत'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Net Selling Price = Selling Amount - Selling Costs (broker commission, SEBON fee, DP charge, CGT)'
                      : 'खुद बिक्री मूल्य = बिक्री रकम - बिक्री लागतहरू (ब्रोकर कमिशन, सेबोन शुल्क, डिपी शुल्क, CGT)'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Total Cost of Acquisition = Buying Amount + Buying Costs (broker commission, SEBON fee, DP charge)'
                      : 'प्राप्तिको कुल लागत = खरिद रकम + खरिद लागतहरू (ब्रोकर कमिशन, सेबोन शुल्क, डिपी शुल्क)'}
                  </li>
                </ul>
                <p className="mt-2">
                  {language === 'en'
                    ? 'This calculator accounts for all these factors to give you the most accurate ROI figure.'
                    : 'यो क्याल्कुलेटरले तपाईंलाई सबैभन्दा सटीक ROI आँकडा दिन यी सबै कारकहरूलाई ध्यानमा राख्छ।'}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base">
                {language === 'en'
                  ? 'What are the latest NEPSE trading hours?'
                  : 'नवीनतम नेप्से ट्रेडिङ घण्टाहरू के हुन्?'}
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p>
                  {language === 'en'
                    ? 'NEPSE trading hours (as of 2024):'
                    : 'नेप्से ट्रेडिङ घण्टाहरू (२०२४ अनुसार):'}
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    <strong>
                      {language === 'en'
                        ? 'Trading Days:'
                        : 'ट्रेडिङ दिनहरू:'}
                    </strong>
                    {' '}
                    {language === 'en'
                      ? 'Sunday to Thursday (Nepal follows a Sunday-Friday week)'
                      : 'आइतबारदेखि बिहीबारसम्म (नेपाल आइतबार-शुक्रबार हप्ता पालना गर्छ)'}
                  </li>
                  <li>
                    <strong>
                      {language === 'en'
                        ? 'Pre-open Session:'
                        : 'प्रि-ओपन सेसन:'}
                    </strong>
                    {' '}
                    {language === 'en'
                      ? '10:30 AM - 11:00 AM'
                      : '१०:३० बिहान - ११:०० बिहान'}
                  </li>
                  <li>
                    <strong>
                      {language === 'en'
                        ? 'Regular Trading Hours:'
                        : 'नियमित ट्रेडिङ घण्टाहरू:'}
                    </strong>
                    {' '}
                    {language === 'en'
                      ? '11:00 AM - 3:00 PM'
                      : '११:०० बिहान - ३:०० अपराह्न'}
                  </li>
                  <li>
                    <strong>
                      {language === 'en'
                        ? 'Closed:'
                        : 'बन्द:'}
                    </strong>
                    {' '}
                    {language === 'en'
                      ? 'Friday, Saturday, and public holidays'
                      : 'शुक्रबार, शनिबार, र सार्वजनिक बिदाहरू'}
                  </li>
                </ul>
                <p className="mt-2">
                  {language === 'en'
                    ? 'Note: Trading hours may change, so always check the official NEPSE website for the most current information.'
                    : 'नोट: ट्रेडिङ घण्टाहरू परिवर्तन हुन सक्छन्, त्यसैले सधैं नवीनतम जानकारीको लागि आधिकारिक नेप्से वेबसाइट हेर्नुहोस्।'}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;

import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ne' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 bg-white border-gray-200"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;


import React from 'react';
import { Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <span className={`text-sm ${language === 'en' ? 'font-medium' : ''}`}>EN</span>
      <Switch 
        checked={language === 'ne'}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
      />
      <span className={`text-sm ${language === 'ne' ? 'font-medium' : ''}`}>नेपाली</span>
    </div>
  );
};

export default LanguageToggle;

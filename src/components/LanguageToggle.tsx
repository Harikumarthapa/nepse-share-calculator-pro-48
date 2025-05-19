
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={toggleLanguage}
        className="text-sm flex items-center bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors"
        aria-label="Toggle language"
      >
        <span className={language === 'en' ? 'font-medium' : 'opacity-75'}>EN</span>
        <span className="mx-1.5">|</span>
        <span className={language === 'ne' ? 'font-medium' : 'opacity-75'}>नेपाली</span>
      </button>
    </div>
  );
};

export default LanguageToggle;

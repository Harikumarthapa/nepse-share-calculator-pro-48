import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from '@/contexts/LanguageContext';

const EmbedInfo: React.FC = () => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('600');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const embedCode = `<iframe src="${window.location.origin}/embed" width="${width}" height="${height}" frameborder="0" title="NEPSE Share Calculator"></iframe>
<div style="text-align: right; margin-top: 5px; font-size: 12px;">
  <a href="https://sharecalculator.app/" target="_blank" rel="noopener">Powered by Share Calculator App</a>
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: t('embed.copied') || 'Copied!',
      description: t('embed.copied.description') || 'Embed code copied to clipboard.',
    });
  };

  return (
    <div className="mt-8 pt-4 border-t w-full sm:w-[80%] mx-auto">
      <div className="relative">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-xl border border-white/40 shadow-xl" />
        
        {/* Content */}
        <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-4 flex items-center gap-2">
            <Share size={18} className="text-nepse-blue" />
            {t('embed.title')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
          {t('embed.description') || 'Add this calculator to your website or blog by copying the embed code.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="embedWidth" className="text-sm">{t('embed.width') || 'Width'}</Label>
              <Input 
                id="embedWidth" 
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%"
                className="bg-white/50 h-8 sm:h-10 text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="embedHeight" className="text-sm">{t('embed.height') || 'Height'}</Label>
              <Input 
                id="embedHeight" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="600"
                className="bg-white/50 h-8 sm:h-10 text-sm"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-3 sm:mt-4">
            <Button onClick={copyToClipboard} size={window.innerWidth < 640 ? "sm" : "default"} className="flex items-center gap-1 h-8 sm:h-10 text-xs sm:text-sm">
              <Copy size={window.innerWidth < 640 ? 14 : 16} />
              {t('embed.copy') || 'Copy Embed Code'}
            </Button>
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-8">
                {isOpen ? (t('embed.hide') || 'Hide Code') : (t('embed.show') || 'Show Code')}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-3 p-3 bg-white/50 backdrop-blur-sm rounded text-xs overflow-auto border border-white/40">
                <code className="whitespace-pre-wrap break-all">{embedCode}</code>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="mt-3 sm:mt-4 p-3 bg-white/50 backdrop-blur-sm rounded border border-white/40">
             <p className="text-xs sm:text-sm text-center text-gray-600">
              {t('embed.info') || 'You can customize the width and height to match your site layout.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedInfo;
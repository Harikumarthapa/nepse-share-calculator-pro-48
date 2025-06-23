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
  const [height, setHeight] = useState('650');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const embedCode = `<iframe src="${window.location.origin}/embed" width="${width}" height="${height}" frameborder="0" title="NEPSE Share Calculator" style="border: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"></iframe>
<div style="text-align: right; margin-top: 5px; font-size: 12px;">
  <a href="https://sharecalculator.app/" target="_blank" rel="noopener">Powered by Share Calculator App</a>
</div>`;

  const responsiveEmbedCode = `<div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe src="${window.location.origin}/embed" 
          width="100%" 
          height="${height}" 
          frameborder="0" 
          title="NEPSE Share Calculator"
          style="border: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: block;">
  </iframe>
  <div style="text-align: right; margin-top: 5px; font-size: 12px;">
    <a href="https://sharecalculator.app/" target="_blank" rel="noopener">Powered by Share Calculator App</a>
  </div>
</div>`;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
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
                placeholder="650"
                className="bg-white/50 h-8 sm:h-10 text-sm"
              />
              <p className="text-xs text-gray-500">Recommended: 600-700px for minimal layout</p>
            </div>
          </div>
          
          {/* Embed Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Choose Embed Type:</h3>
            
            {/* Standard Embed */}
            <div className="p-3 bg-white/30 rounded-lg border border-white/40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Standard Embed</span>
                <Button 
                  onClick={() => copyToClipboard(embedCode)} 
                  size="sm" 
                  variant="outline"
                  className="h-7 text-xs"
                >
                  <Copy size={12} className="mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-xs text-gray-600">Fixed width and height, good for specific layouts</p>
            </div>
            
            {/* Responsive Embed */}
            <div className="p-3 bg-white/30 rounded-lg border border-white/40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Responsive Embed</span>
                <Button 
                  onClick={() => copyToClipboard(responsiveEmbedCode)} 
                  size="sm" 
                  className="h-7 text-xs"
                >
                  <Copy size={12} className="mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-xs text-gray-600">Automatically adjusts to container width, recommended for most websites</p>
            </div>
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-8">
                {isOpen ? (t('embed.hide') || 'Hide Preview') : (t('embed.show') || 'Show Preview')}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-3 space-y-3">
                {/* Standard Code Preview */}
                <div>
                  <h4 className="text-xs font-medium mb-2">Standard Embed Code:</h4>
                  <div className="p-3 bg-white/50 backdrop-blur-sm rounded text-xs overflow-auto border border-white/40">
                    <code className="whitespace-pre-wrap break-all">{embedCode}</code>
                  </div>
                </div>
                
                {/* Responsive Code Preview */}
                <div>
                  <h4 className="text-xs font-medium mb-2">Responsive Embed Code:</h4>
                  <div className="p-3 bg-white/50 backdrop-blur-sm rounded text-xs overflow-auto border border-white/40">
                    <code className="whitespace-pre-wrap break-all">{responsiveEmbedCode}</code>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="mt-3 sm:mt-4 p-3 bg-white/50 backdrop-blur-sm rounded border border-white/40">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                💡 Tips for better embedding:
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4">
                <li>• Use responsive embed for mobile-friendly sites</li>
                <li>• Increase height (700-900px) to avoid scrollbars</li>
                <li>• Test on different screen sizes</li>
                <li>• The embed route shows only the calculator without navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedInfo;
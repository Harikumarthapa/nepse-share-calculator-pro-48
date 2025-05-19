
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const EmbedInfo: React.FC = () => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('800');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const embedCode = `<iframe src="${window.location.origin}" width="${width}" height="${height}" frameborder="0" title="Share Calculator"></iframe>
<div style="text-align: right; margin-top: 5px; font-size: 12px;">
  <a href="https://sharecalculator.app/" target="_blank" rel="noopener">Powered by Share Calculator App</a>
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied to clipboard",
      description: "Embed code has been copied to your clipboard",
    });
  };

  return (
    <div className="mt-8 pt-4 border-t w-[70%] mx-auto">
      <h2 className="text-lg font-medium mb-4">Embed This Calculator</h2>
      <p className="text-sm text-gray-500">Add this calculator to your website or blog by copying the embed code.</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="embedWidth">Width</Label>
          <Input 
            id="embedWidth" 
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="100%"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="embedHeight">Height</Label>
          <Input 
            id="embedHeight" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="800"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button onClick={copyToClipboard} size="sm" className="flex items-center gap-1">
          <Copy size={16} />
          Copy Embed Code
        </Button>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="text-xs">
            {isOpen ? "Hide Code" : "Show Code"}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="mt-3 p-3 bg-gray-100 rounded text-xs overflow-auto">
            <code className="whitespace-pre-wrap break-all">{embedCode}</code>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
        <p className="text-sm text-center text-gray-600">
          Embed this calculator on your website to provide your visitors with a helpful NEPSE transaction calculation tool.
        </p>
      </div>
    </div>
  );
};

export default EmbedInfo;

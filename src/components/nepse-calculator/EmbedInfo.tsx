
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EmbedInfo: React.FC = () => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('800');
  const { toast } = useToast();
  
  const embedCode = `<iframe src="${window.location.origin}" width="${width}" height="${height}" frameborder="0" title="NEPSE Share Calculator"></iframe>
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
    <div className="mt-8 pt-4 border-t">
      <h3 className="text-lg font-medium mb-4">Embed This Calculator</h3>
      <p className="text-sm text-gray-500">Add this calculator to your website or blog by copying the code below:</p>
      
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
      
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs overflow-auto">
        <code className="whitespace-pre-wrap break-all">{embedCode}</code>
      </div>
      
      <Button onClick={copyToClipboard} variant="outline" className="mt-4 w-full">
        Copy Embed Code
      </Button>
    </div>
  );
};

export default EmbedInfo;

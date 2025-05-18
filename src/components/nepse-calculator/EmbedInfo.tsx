
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmbedInfo: React.FC = () => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('800');
  
  const embedCode = `<iframe src="${window.location.origin}" width="${width}" height="${height}" frameborder="0" title="NEPSE Transaction Calculator"></iframe>
<!-- Powered by <a href="https://sharecalculator.app/" target="_blank" rel="noopener noreferrer">Share Calculator App</a> -->`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };
  
  return (
    <div className="mt-8 pt-4 border-t">
      <h3 className="text-lg font-medium mb-4">Embed This Calculator</h3>
      <p className="text-sm text-gray-500 mb-4">
        This calculator can be embedded in your website or blog. Customize the dimensions below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input 
            id="width" 
            value={width} 
            onChange={(e) => setWidth(e.target.value)}
            placeholder="100%" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input 
            id="height" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="800"
          />
        </div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded text-xs overflow-auto mb-4">
        <code className="whitespace-pre-wrap">{embedCode}</code>
      </div>
      
      <Button onClick={copyToClipboard} className="w-full">
        Copy Embed Code
      </Button>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        Powered by <a href="https://sharecalculator.app/" target="_blank" rel="noopener noreferrer" className="text-nepse-blue hover:underline">
          Share Calculator App
        </a>
      </div>
    </div>
  );
};

export default EmbedInfo;

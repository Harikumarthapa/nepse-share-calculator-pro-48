
import React from 'react';

const EmbedInfo: React.FC = () => {
  return (
    <div className="mt-8 pt-4 border-t text-sm text-gray-500">
      <p>This calculator can be embedded in your website or blog.</p>
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
        <code>{`<iframe src="${window.location.origin}" width="100%" height="800" frameborder="0"></iframe>`}</code>
      </div>
    </div>
  );
};

export default EmbedInfo;

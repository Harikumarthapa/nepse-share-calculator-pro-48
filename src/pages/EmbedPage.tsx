import React, { useState } from 'react';
import ResultsDisplay from './ResultsDisplay';
import { CalculationInputs, CalculationResults } from './types';

// You can prefill inputs or add form for embed users later if needed
const defaultInputs: CalculationInputs = {
  quantity: 100,
  buyPrice: 100,
  sellPrice: 120,
  transactionType: 'sell',
  // add other required input fields here with reasonable defaults
};

const defaultResults: CalculationResults | null = null; // or calculate initial results

const EmbedPage: React.FC = () => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState<CalculationResults | null>(defaultResults);

  // Optionally: add minimal UI to allow users to input data in embed mode

  return (
    <div style={{ padding: 20, background: '#fff', maxWidth: 600, margin: '0 auto' }}>
      <ResultsDisplay results={results} inputs={inputs} />
      <div style={{ textAlign: 'right', marginTop: 10, fontSize: 12 }}>
        <a href="https://sharecalculator.app" target="_blank" rel="noopener noreferrer">
          Powered by Share Calculator App
        </a>
      </div>
    </div>
  );
};

export default EmbedPage;


import React from 'react';
import { CalculationInputs, CalculationResults } from './types';
import InputSummary from './results/InputSummary';
import FeeBreakdown from './results/FeeBreakdown';
import TaxCalculation from './results/TaxCalculation';
import FinalResult from './results/FinalResult';

interface ResultsDisplayProps {
  results: CalculationResults;
  inputs: CalculationInputs;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputs }) => {
  if (!results) return null;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Calculation Results</h3>
      
      <InputSummary inputs={inputs} />
      <FeeBreakdown results={results} />
      <TaxCalculation results={results} inputs={inputs} />
      <FinalResult results={results} inputs={inputs} />
    </div>
  );
};

export default ResultsDisplay;

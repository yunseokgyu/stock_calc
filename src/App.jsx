import React, { useState } from 'react';
import Layout from './components/Layout';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import { generateStockData } from './utils/mockData';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (formData) => {
    setLoading(true);
    // Simulate API delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));

    const data = generateStockData(
      formData.symbol,
      formData.startDate,
      formData.endDate,
      formData.initialInvestment,
      formData.monthlyContribution
    );

    setResults(data);
    setLoading(false);
  };

  return (
    <Layout>
      <InputForm onCalculate={handleCalculate} />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && results && (
        <ResultsDashboard data={results} />
      )}
    </Layout>
  );
}

export default App;

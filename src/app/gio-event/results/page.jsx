import React, { Suspense } from 'react';
import ResultsPage from '@/components/results/ResultPage';

const Page = () => {
  return (
    <div>
      {/* Wrap ResultsPage in Suspense */}
      <Suspense fallback={<div>Loading Results...</div>}>
        <ResultsPage />
      </Suspense>
    </div>
  );
};

export default Page;

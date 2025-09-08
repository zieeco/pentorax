
import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
  sublabel?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, sublabel }) => (
  <div className="text-center">
    <p className="text-4xl lg:text-5xl font-extrabold text-blue-600">{value}</p>
    <p className="mt-2 text-lg font-semibold text-gray-700">{label}</p>
    {sublabel && <p className="text-sm text-gray-500">{sublabel}</p>}
  </div>
);

const Journey: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mr-4">OUR JOURNEY SO FAR...</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10M16 16l4-4m0 0l-4-4m4 4H9" />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <StatItem value="9.8GWh+" label="Green Energy Generated" />
          <StatItem value="9.3MWp+" label="Installed Solar PV Capacity" />
          <StatItem value="23.8MWh+" label="Active Storage System (BESS)" />
          <StatItem value="23,000MT+" label="Displaced CO2e Equivalent" />
          <StatItem value="200k+" label="Sequestered Carbon Equivalent" sublabel="(Tree Seedlings Grown)" />
          <StatItem value="2.2million" label="Avoided Diesel Equivalent (Litres)" />
        </div>
      </div>
    </section>
  );
};

export default Journey;

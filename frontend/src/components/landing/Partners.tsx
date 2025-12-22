
import React from 'react';

const PartnerLogo: React.FC<{ name: string; logoUrl: string }> = ({ name, logoUrl }) => (
  <div className="flex justify-center items-center p-4">
    <img src={logoUrl} alt={name} className="h-10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
  </div>
);


const Partners: React.FC = () => {
  const logos = [
    { name: 'PI Express', url: 'https://i.imgur.com/K5b1U1O.png' },
    { name: 'Baze University', url: 'https://i.imgur.com/8Qp2j7F.png' },
    { name: '234', url: 'https://i.imgur.com/Fw54x4p.png' },
    { name: 'SunFi', url: 'https://i.imgur.com/L4Z9r4r.png' },
    { name: 'All On', url: 'https://i.imgur.com/eBf9K3T.png' },
    { name: 'Dangote', url: 'https://i.imgur.com/3Z6O1z7.png' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Partners and Clients</h2>
        <p className="mt-4 text-lg text-gray-600">Let's meet some of our prestigious partners and esteemed customers</p>
        
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {logos.map(logo => (
            <PartnerLogo key={logo.name} name={logo.name} logoUrl={logo.url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const ShopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Shop Solar Products</h1>
        <p className="text-muted-foreground">
          Product catalog coming soon. This page will display all solar panels, inverters, batteries, and installation services.
        </p>
        {/* ProductGrid component will be added here */}
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;

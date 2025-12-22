import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const ProductDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">Product Detail</h1>
        <p className="mt-4 text-muted-foreground">Product details will be displayed here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

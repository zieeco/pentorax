import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Blog</h1>
        <p className="text-muted-foreground">
          Solar energy insights, tips, and news will be displayed here.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;

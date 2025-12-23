import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';

// About section
import AboutPage from '@/pages/AboutPage';
import TeamPage from '@/pages/TeamPage';
import CareersPage from '@/pages/CareersPage';

// Solutions section
import SolutionsPage from '@/pages/SolutionsPage';
import ResidentialPage from '@/pages/ResidentialPage';
import CommercialPage from '@/pages/CommercialPage';
import IndustrialPage from '@/pages/IndustrialPage';
import OffGridPage from '@/pages/OffGridPage';

// Products section
import ProductsPage from '@/pages/ProductsPage';
import SolarPanelsPage from '@/pages/SolarPanelsPage';
import InvertersPage from '@/pages/InvertersPage';
import BatteriesPage from '@/pages/BatteriesPage';
import AccessoriesPage from '@/pages/AccessoriesPage';

// Resources section
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import FAQsPage from '@/pages/FAQsPage';
import SupportPage from '@/pages/SupportPage';
import ContactPage from '@/pages/ContactPage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 5,
      retryDelay: 1000,
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* About section */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/team" element={<TeamPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              
              {/* Solutions section */}
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/residential" element={<ResidentialPage />} />
              <Route path="/solutions/commercial" element={<CommercialPage />} />
              <Route path="/solutions/industrial" element={<IndustrialPage />} />
              <Route path="/solutions/off-grid" element={<OffGridPage />} />
              
              {/* Products section */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/solar-panels" element={<SolarPanelsPage />} />
              <Route path="/products/inverters" element={<InvertersPage />} />
              <Route path="/products/batteries" element={<BatteriesPage />} />
              <Route path="/products/accessories" element={<AccessoriesPage />} />
              
              {/* Resources section */}
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

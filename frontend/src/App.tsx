import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import AuthRedirect from '@/components/AuthRedirect';

// Landing
import LandingPage from '@/pages/LandingPage';

// Shop
import ShopPage from '@/pages/shop/ShopPage';
import ProductDetailPage from '@/pages/shop/ProductDetailPage';
import CartPage from '@/pages/shop/CartPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';

// About
import AboutPage from '@/pages/about/AboutPage';
import TeamPage from '@/pages/about/TeamPage';
import CareersPage from '@/pages/about/CareersPage';

// Solutions
import SolutionsPage from '@/pages/solutions/SolutionsPage';
import ResidentialPage from '@/pages/solutions/ResidentialPage';
import CommercialPage from '@/pages/solutions/CommercialPage';
import IndustrialPage from '@/pages/solutions/IndustrialPage';
import OffGridPage from '@/pages/solutions/OffGridPage';

// Products
import ProductsPage from '@/pages/products/ProductsPage';
import SolarPanelsPage from '@/pages/products/SolarPanelsPage';
import InvertersPage from '@/pages/products/InvertersPage';
import BatteriesPage from '@/pages/products/BatteriesPage';
import AccessoriesPage from '@/pages/products/AccessoriesPage';

// Resources
import BlogPage from '@/pages/resources/BlogPage';
import BlogPostPage from '@/pages/resources/BlogPostPage';
import CaseStudiesPage from '@/pages/resources/CaseStudiesPage';
import FAQsPage from '@/pages/resources/FAQsPage';
import SupportPage from '@/pages/resources/SupportPage';
import ContactPage from '@/pages/resources/ContactPage';

// Auth
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import AuthConfirmationPage from '@/pages/auth/AuthConfirmationPage';

// Dashboard
import DashboardPage from '@/pages/dashboard/DashboardPage';
import { ProductsPage as AdminProductsPage, ProductFormPage } from '@/pages/dashboard/products';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Auth Routes (No Layout) - Redirect if already logged in */}
            <Route path="/auth/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
            <Route path="/auth/signup" element={<AuthRedirect><SignupPage /></AuthRedirect>} />
            <Route path="/auth/forgot-password" element={<AuthRedirect><ForgotPasswordPage /></AuthRedirect>} />
            <Route path="/auth/reset-password" element={<AuthRedirect><ResetPasswordPage /></AuthRedirect>} />
            <Route path="/auth/confirmation" element={<AuthConfirmationPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Customer Dashboard (default) */}
              <Route index element={<DashboardPage />} />
              
              {/* Admin Dashboard */}
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Staff Dashboard */}
              <Route 
                path="staff" 
                element={
                  <ProtectedRoute requireStaff>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Product Management (Admin/Staff) */}
              <Route 
                path="products" 
                element={
                  <ProtectedRoute requireStaff>
                    <AdminProductsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="products/new" 
                element={
                  <ProtectedRoute requireStaff>
                    <ProductFormPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="products/:slug/edit" 
                element={
                  <ProtectedRoute requireStaff>
                    <ProductFormPage />
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* Customer-facing Routes (With Layout) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  {/* Main pages */}
                  <Route path="/" element={<LandingPage />} />
                  
                  {/* Shop */}
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  
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
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/faqs" element={<FAQsPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

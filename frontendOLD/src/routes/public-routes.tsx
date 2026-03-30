/**
 * Public Routes Configuration
 * Routes accessible without authentication, wrapped in the main Layout
 */
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

// Landing
const LandingPage = lazy(() => import('@/pages/LandingPage'));

// Shop
const ShopPage = lazy(() => import('@/pages/shop/ShopPage'));
const ProductDetailPage = lazy(() => import('@/pages/shop/ProductDetailPage'));
const CartPage = lazy(() => import('@/pages/shop/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/shop/CheckoutPage'));
const PaymentSuccessPage = lazy(() => import('@/pages/shop/PaymentSuccessPage'));
const OrderHistoryPage = lazy(() => import('@/pages/shop/OrderHistoryPage'));

// About
const AboutPage = lazy(() => import('@/pages/about/AboutPage'));
const TeamPage = lazy(() => import('@/pages/about/TeamPage'));
const CareersPage = lazy(() => import('@/pages/about/CareersPage'));

// Solutions
const SolutionsPage = lazy(() => import('@/pages/solutions/SolutionsPage'));
const ResidentialPage = lazy(() => import('@/pages/solutions/ResidentialPage'));
const CommercialPage = lazy(() => import('@/pages/solutions/CommercialPage'));
const IndustrialPage = lazy(() => import('@/pages/solutions/IndustrialPage'));
const OffGridPage = lazy(() => import('@/pages/solutions/OffGridPage'));

// Products
const ProductsPage = lazy(() => import('@/pages/products/ProductsPage'));
const SolarPanelsPage = lazy(() => import('@/pages/products/SolarPanelsPage'));
const InvertersPage = lazy(() => import('@/pages/products/InvertersPage'));
const BatteriesPage = lazy(() => import('@/pages/products/BatteriesPage'));
const AccessoriesPage = lazy(() => import('@/pages/products/AccessoriesPage'));

// Resources
const BlogPage = lazy(() => import('@/pages/resources/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/resources/BlogPostPage'));
const CaseStudiesPage = lazy(() => import('@/pages/resources/CaseStudiesPage'));
const FAQsPage = lazy(() => import('@/pages/resources/FAQsPage'));
const SupportPage = lazy(() => import('@/pages/resources/SupportPage'));
const ContactPage = lazy(() => import('@/pages/resources/ContactPage'));

/**
 * Public routes - accessible to everyone (guest or logged in)
 * All wrapped within the main Layout component
 */
export const publicRoutes: RouteObject[] = [
  // Home
  { path: '/', element: <LandingPage /> },
  
  // Shop
  { path: '/shop', element: <ShopPage /> },
  { path: '/shop/:slug', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/payment/success', element: <PaymentSuccessPage /> },
  { path: '/orders', element: <OrderHistoryPage /> },
  
  // About
  { path: '/about', element: <AboutPage /> },
  { path: '/about/team', element: <TeamPage /> },
  { path: '/about/careers', element: <CareersPage /> },
  
  // Solutions
  { path: '/solutions', element: <SolutionsPage /> },
  { path: '/solutions/residential', element: <ResidentialPage /> },
  { path: '/solutions/commercial', element: <CommercialPage /> },
  { path: '/solutions/industrial', element: <IndustrialPage /> },
  { path: '/solutions/off-grid', element: <OffGridPage /> },
  
  // Products
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/solar-panels', element: <SolarPanelsPage /> },
  { path: '/products/inverters', element: <InvertersPage /> },
  { path: '/products/batteries', element: <BatteriesPage /> },
  { path: '/products/accessories', element: <AccessoriesPage /> },
  
  // Resources
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/case-studies', element: <CaseStudiesPage /> },
  { path: '/faqs', element: <FAQsPage /> },
  { path: '/support', element: <SupportPage /> },
  { path: '/contact', element: <ContactPage /> },
];

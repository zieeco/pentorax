/**
 * Main Application Component
 * Uses modular route configuration from /routes
 */
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '@/routes';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
};

export default App;

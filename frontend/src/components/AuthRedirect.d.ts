import React from 'react';
interface AuthRedirectProps {
    children: React.ReactNode;
}
/**
 * Redirects authenticated users away from auth pages (login, signup, etc.)
 * to their role-based dashboard
 */
declare const AuthRedirect: React.FC<AuthRedirectProps>;
export default AuthRedirect;

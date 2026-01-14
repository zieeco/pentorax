import React from 'react';
interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    requireStaff?: boolean;
}
declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;

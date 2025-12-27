import type { AuthStoreGetter } from './auth-types';

export const createPermissionHelpers = (get: AuthStoreGetter) => ({
  isAdmin: () => {
    const { role } = get();
    return role === 'admin';
  },

  isStaff: () => {
    const { role } = get();
    return role === 'staff' || role === 'admin';
  },

  isCustomer: () => {
    const { role } = get();
    return role === 'customer';
  },

  canManageProducts: () => {
    const { role } = get();
    return role === 'staff' || role === 'admin';
  },

  canManageOrders: () => {
    const { role } = get();
    return role === 'staff' || role === 'admin';
  },

  canManageUsers: () => {
    const { role } = get();
    return role === 'admin';
  },

  canPlaceOrders: () => {
    const { role } = get();
    return role !== null; // All authenticated users
  },

  canViewAllOrders: () => {
    const { role } = get();
    return role === 'staff' || role === 'admin';
  },
});

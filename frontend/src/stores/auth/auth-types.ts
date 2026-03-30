import type { Session, User, UserMetadata, UserRole } from '@/utils/authHelpers';

// AUTH STATE INTERFACE
export interface AuthState {
  // Core auth state
  session: Session | null;
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // State setters
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole | null) => void;
  initialize: () => () => void;

  // Auth actions
  signIn: (email: string, password: string) => Promise<AuthResponse<User>>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    metadata?: UserMetadata
  ) => Promise<AuthResponse<User>>;
  forgotPassword: (email: string) => Promise<AuthErrorResponse>;
  updatePassword: (newPassword: string) => Promise<AuthErrorResponse>;
  resendVerificationEmail: (email: string) => Promise<AuthErrorResponse>;
  checkUser: () => Promise<UserMetadata>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;

  // Permission helpers
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isCustomer: () => boolean;
  canManageProducts: () => boolean;
  canManageOrders: () => boolean;
  canManageUsers: () => boolean;
  canPlaceOrders: () => boolean;
  canViewAllOrders: () => boolean;
}

// RESPONSE TYPES
export interface AuthResponse<T> {
  data: T | null;
  error: any;
}

export interface AuthErrorResponse {
  error: any;
}

// STORE SETTER TYPE
export type AuthStoreSetter = (
  partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)
) => void;
export type AuthStoreGetter = () => AuthState;

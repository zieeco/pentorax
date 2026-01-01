import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';
import { supabase } from '../utils/supabaseClient';
import { extractUserMetadata, type UserRole } from '@/utils/authHelpers';
import { useAuthStore } from '@/stores/auth';

// --- Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Environment-aware configuration
console.log('🌍 Environment:', import.meta.env.MODE);
console.log('🔗 API Base URL:', API_BASE_URL);

// Request retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableErrors: ['ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND'],
} as const;

type RetryableErrorCode = (typeof RETRY_CONFIG.retryableErrors)[number];

// --- Create Axios Instance ---
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Enhanced request config type
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

// --- Helper: Check if error is retryable ---
const isRetryableError = (error: AxiosError): boolean => {
  if (!error.code) return false;
  return RETRY_CONFIG.retryableErrors.includes(
    error.code as RetryableErrorCode,
  );
};

// --- Helper: Delay function for retries ---
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Interceptors ---

// 1. Request Interceptor: Attach Supabase JWT from Zustand store
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get current session token synchronously
    const accessToken = useAuthStore.getState().session?.access_token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(
        `📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      );
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// 2. Response Interceptor: Handle errors globally and retry on 401
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(
        `📥 ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    // Handle network errors first
    if (!error.response) {
      // Check if this is a retryable network error
      if (
        isRetryableError(error) &&
        (!originalRequest._retryCount ||
          originalRequest._retryCount < RETRY_CONFIG.maxRetries)
      ) {
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        console.warn(
          `Network error, retrying... (${originalRequest._retryCount}/${RETRY_CONFIG.maxRetries})`,
        );
        await delay(RETRY_CONFIG.retryDelay * originalRequest._retryCount);

        return axiosInstance(originalRequest);
      }

      toast.error('Network Error: Could not reach the server.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const errorData = data as {
      detail?: string | { msg: string }[];
      message?: string;
    };

    // --- Handle 401: Try to refresh session and retry ---
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {
          data: { session: refreshedSession },
          error: refreshError,
        } = await supabase.auth.refreshSession();

        if (refreshError) throw refreshError;

        if (refreshedSession?.access_token) {
          // Update auth store with fresh data
          const { role } = extractUserMetadata(refreshedSession.user);
          useAuthStore.setState({
            session: refreshedSession,
            user: refreshedSession.user,
            role: role as UserRole | null,
          });

          // Persist to localStorage for cross-tab sync
          localStorage.setItem('WW-auth', JSON.stringify(refreshedSession));

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${refreshedSession.access_token}`;
          }
          return axiosInstance(originalRequest);
        }
      } catch (refreshErr) {
        console.error('Session refresh failed:', refreshErr);
      }

      // If we get here, refresh failed or no session
      toast.error('Your session has expired. Please log in again.');

      // Clear auth state
      useAuthStore.setState({
        session: null,
        user: null,
        role: null,
      });
      localStorage.removeItem('WW-auth');

      // Redirect to sign-in
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
      return Promise.reject(error);
    }

    // Handle case where 401 retry already attempted
    if (status === 401 && originalRequest._retry) {
      toast.error('Authentication failed. Please log in again.');
      return Promise.reject(error);
    }

    // --- Handle other status codes ---
    switch (status) {
      case 400:
        if (errorData?.detail && typeof errorData.detail === 'string') {
          toast.error(`Bad Request: ${errorData.detail}`);
        } else {
          toast.error('Bad Request: Please check your input.');
        }
        break;

      case 403:
        toast.error(
          "Access denied: You don't have permission for this action.",
        );
        break;

      case 404:
        toast.error('Not Found: The requested resource does not exist.');
        break;

      case 409:
        toast.error('Conflict: This action conflicts with existing data.');
        break;

      case 422:
        // FastAPI validation error
        if (typeof errorData.detail === 'string') {
          toast.error(`Validation Error: ${errorData.detail}`);
        } else if (Array.isArray(errorData.detail)) {
          const firstError = errorData.detail[0];
          if (
            firstError &&
            typeof firstError === 'object' &&
            'msg' in firstError
          ) {
            toast.error(`Validation Error: ${firstError.msg}`);
          } else {
            toast.error('Validation Error: Please check your input.');
          }
        } else {
          toast.error('Validation Error: Please check your input.');
        }
        break;

      case 429:
        toast.error('Too Many Requests: Please wait a moment and try again.');
        break;

      case 500:
        toast.error(
          'Server Error: Something went wrong on our end. Please try again later.',
        );
        break;

      case 502:
      case 503:
      case 504:
        toast.error('Service Unavailable: Please try again in a few moments.');
        break;

      default: {
        // Fallback: show API message if available, with better error extraction
        let errorMessage = 'An unexpected error occurred.';

        if (errorData?.detail && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (
          errorData?.message &&
          typeof errorData.message === 'string'
        ) {
          errorMessage = errorData.message;
        }

        toast.error(errorMessage);
        break;
      }
    }

    // Forward error for potential local handling
    return Promise.reject(error);
  },
);

// Export utilities for manual usage
export const httpClient = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  delete: axiosInstance.delete,
} as const;

// Export typed error handler for custom error handling
export const isHttpError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

// Export helper to check specific HTTP status
export const isHttpStatus = (error: unknown, status: number): boolean => {
  return isHttpError(error) && error.response?.status === status;
};

// Export as apiClient for consistency
export const apiClient = axiosInstance;

export default axiosInstance;

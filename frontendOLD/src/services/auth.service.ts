import apiClient from '@/lib/axiosInstance';
import type { User, Session } from '@/utils/authHelpers';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/token-login/', { email, password });
    return response.data; // Should return { access_token, token_type, user }
  },
  
  register: async (email: string, password: string, fullName: string, metadata?: any) => {
    const response = await apiClient.post('/register/', {
      email,
      password,
      name: fullName,
      ...metadata
    });
    return response.data;
  },
  
  logout: async () => {
    await apiClient.post('/logout/');
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/profiles/me/');
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/forgot-password/', { email });
    return response.data;
  },
  
  updatePassword: async (password: string) => {
    const response = await apiClient.post('/update-password/', { password });
    return response.data;
  }
};

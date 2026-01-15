import { createClient } from '@supabase/supabase-js';

// Read Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Safeguard checks
if (!supabaseUrl) {
  const errorMessage =
    'Critical Error: VITE_SUPABASE_URL is not defined. Please check your .env file in the frontend directory.';
  console.error(errorMessage);
  throw new Error(errorMessage);
}

if (!supabaseAnonKey) {
  const errorMessage =
    'Critical Error: VITE_SUPABASE_ANON_KEY is not defined. Please check your .env file in the frontend directory.';
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

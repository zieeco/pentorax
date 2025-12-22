/// <reference types="vite/client" />

interface ImportMetaEnv {
  // readonly VITE_SUPABASE_URL: string;
  // readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_URL?: string; // Optional API URL if different from Supabase
  readonly VITE_STORAGE_BUCKET?: string; // Optional storage bucket name
  readonly VITE_APP_VERSION?: string; // Optional app version
  readonly VITE_APP_NAME?: string; // Optional app name
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

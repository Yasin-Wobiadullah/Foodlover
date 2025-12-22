import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ideswdhtrmrqesmfbybh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkZXN3ZGh0cm1ycWVzbWZieWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTE3MDUsImV4cCI6MjA2NjI2NzcwNX0.qjKL5QQOgbpG2d5-_ZM3IAobFwko2b8tPlP6cY-DAQ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://xvjjvulsclejlomycirp.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2amp2dWxzY2xlamxvbXljaXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MDU5NzMsImV4cCI6MTk5OTI4MTk3M30.UJcr8g-ex_xBbDUMTanIQoyjbyioX9fov_gQe-edCzQ';

export const supabase = createClient(supabaseURL, supabaseAnonKey);

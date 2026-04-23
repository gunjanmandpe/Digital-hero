import { createClient } from '@supabase/supabase-js'

// We will use environment variables for Supabase connection.
// For now, if they are missing, it mock the client for UI testing.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

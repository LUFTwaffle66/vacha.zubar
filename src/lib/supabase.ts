import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type VacationStatus = {
  id: string
  is_on_vacation: boolean
  return_date: string | null
  message: string | null
  updated_at: string
}
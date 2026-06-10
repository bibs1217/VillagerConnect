import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://vthpgqhlhihnoeawjdyc.supabase.co'
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aHBncWhsaGlobm9lYXdqZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODk5NjMsImV4cCI6MjA5NjA2NTk2M30.SnLIQX-Ntn0ba3Ap1lcfG8RULan15E3qGwRAMoDtrXo'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPA_URL, SUPA_KEY, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(toSet) {
        try { toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
      },
    },
  })
}

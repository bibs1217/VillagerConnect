'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/entertainment')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{ width: '44px', height: '44px', background: '#2D7A2D', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>🌴</span>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>VillagerConnect</span>
            </div>
          </Link>
          <p style={{ color: '#666', marginTop: '0.75rem', fontSize: '0.9rem' }}>Your Villages community hub</p>
        </div>

        {/* Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '1rem', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.25rem' }}>Welcome back</h1>
          <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Sign in to your VillagerConnect account</p>

          {error && (
            <div style={{ background: '#FFF2F2', border: '1px solid #FFCCCC', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1.25rem', color: '#CC0000', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.4rem' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A' }}>Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{ background: loading ? '#A8C8A8' : '#2D7A2D', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.25rem' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#888', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#2D7A2D', fontWeight: 700, textDecoration: 'none' }}>Create one free</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#AAA', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          For residents and visitors of The Villages, Florida
        </p>
      </div>
    </div>
  )
}

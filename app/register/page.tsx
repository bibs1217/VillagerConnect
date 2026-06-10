'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [residencyType, setResidencyType] = useState<'resident' | 'visitor' | 'prospective'>('resident')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, neighborhood, residency_type: residencyType },
      },
    })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('villager_user_profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        neighborhood,
        residency_type: residencyType,
      })
      router.push('/entertainment')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
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
          <p style={{ color: '#666', marginTop: '0.75rem', fontSize: '0.9rem' }}>Join your Villages community</p>
        </div>

        {/* Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '1rem', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.25rem' }}>Create your account</h1>
          <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Free for all Villages residents and visitors</p>

          {error && (
            <div style={{ background: '#FFF2F2', border: '1px solid #FFCCCC', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1.25rem', color: '#CC0000', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.4rem' }}>Full name</label>
              <input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
              />
            </div>

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
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.4rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.4rem' }}>Neighborhood <span style={{ color: '#AAA', fontWeight: 400 }}>(optional)</span></label>
              <input
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                placeholder="e.g. Buttonwood, Marsh Bend, Fenney…"
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.95rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.4rem' }}>I am a…</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['resident', 'visitor', 'prospective'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setResidencyType(t)}
                    style={{ flex: 1, padding: '0.625rem', borderRadius: '0.5rem', border: `2px solid ${residencyType === t ? '#2D7A2D' : '#E0E0E0'}`, background: residencyType === t ? 'rgba(45,122,45,0.08)' : '#FFFFFF', color: residencyType === t ? '#2D7A2D' : '#555', fontWeight: residencyType === t ? 700 : 400, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                    {t === 'prospective' ? 'Prospective' : t === 'visitor' ? 'Visitor' : 'Resident'}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ background: loading ? '#A8C8A8' : '#2D7A2D', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.25rem' }}>
              {loading ? 'Creating account…' : 'Create account — Free'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#888', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#2D7A2D', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#AAA', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          For residents and visitors of The Villages, Florida
        </p>
      </div>
    </div>
  )
}

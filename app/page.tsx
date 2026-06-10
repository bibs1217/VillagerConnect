'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'

const FEATURES = [
  { icon: '🎵', title: 'Entertainment', desc: 'Nightly music at town squares and recreation centers', href: '/entertainment', color: '#2D7A2D' },
  { icon: '📰', title: 'Local News', desc: 'Latest news from The Villages and Sumter County', href: '/news', color: '#2D7A2D' },
  { icon: '🗳️', title: 'Elections', desc: 'Voter information, officials, and upcoming elections', href: '/elections', color: '#2D7A2D' },
  { icon: '🏪', title: 'Landings & Dining', desc: 'Complete directory of town squares and restaurants', href: '/landings', color: '#2D7A2D' },
  { icon: '🏌️', title: 'Golf Cart Rentals', desc: 'Rent golf carts from local companies', href: '/golf-carts', color: '#2D7A2D' },
  { icon: '⛳', title: 'Golf Courses', desc: '50+ executive and championship courses', href: '/golf-courses', color: '#2D7A2D' },
  { icon: '💬', title: 'Community Forums', desc: 'Connect with neighbors and community groups', href: '/forums', color: '#2D7A2D' },
  { icon: '📅', title: 'Events', desc: 'Community events, clubs, and activities', href: '/events', color: '#2D7A2D' },
]

const STATS = [
  { value: '3', label: 'Town Squares', icon: '🏛️' },
  { value: '12+', label: 'Landings', icon: '🏪' },
  { value: '50+', label: 'Golf Courses', icon: '⛳' },
  { value: '100K+', label: 'Residents', icon: '👥' },
]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#1A1A1A', fontFamily: "Georgia, 'Times New Roman', sans-serif" }}>

      {/* Header */}
      <header style={{ background: '#2D7A2D', padding: '0 2rem', height: '4.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>🏌️</span>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>VillagerConnect</div>
            <div style={{ fontSize: '0.72rem', color: '#FFD700', fontWeight: 600, letterSpacing: '0.3px' }}>Your Complete Guide to Life in The Villages</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/login" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0.5rem' }}>Sign In</Link>
          <Link href="/register" style={{ background: '#FFD700', color: '#1A1A1A', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.875rem' }}>Join Free</Link>
          <Link href="/entertainment" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>Explore →</Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #2D7A2D 0%, #1a5c1a 60%, #0f400f 100%)', padding: '5rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1400&q=80") center/cover', opacity: 0.08 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '9999px', padding: '0.4rem 1.25rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#FFD700', fontWeight: 700 }}>
            🌴 Welcome to The Villages, Florida
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem', color: '#FFFFFF', letterSpacing: '-1px' }}>
            Everything You Need<br /><span style={{ color: '#FFD700' }}>In One Place</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Entertainment, news, golf, dining, elections, and community — your complete guide to life in the world's friendliest retirement community.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/entertainment" style={{ background: '#FFD700', color: '#1A1A1A', padding: '1rem 2.5rem', borderRadius: '0.75rem', fontWeight: 800, fontSize: '1.1rem', display: 'inline-block' }}>
              Tonight's Entertainment →
            </Link>
            <Link href="/landings" style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1.1rem', display: 'inline-block' }}>
              Find a Restaurant
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.875rem', padding: '1rem 1.5rem' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{s.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFD700' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.75rem' }}>Everything The Villages Offers</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Your all-in-one resource for community life</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <Link key={i} href={f.href}
              style={{ display: 'block', background: '#FFFFFF', border: '2px solid #E0E0E0', borderRadius: '1rem', padding: '1.75rem', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2D7A2D'; el.style.boxShadow = '0 8px 32px rgba(45,122,45,0.15)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#E0E0E0'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}>
              <div style={{ width: '54px', height: '54px', background: 'rgba(45,122,45,0.08)', border: '2px solid rgba(45,122,45,0.2)', borderRadius: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>{f.desc}</p>
              <span style={{ color: '#2D7A2D', fontWeight: 700, fontSize: '0.9rem' }}>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Info Banner */}
      <section style={{ background: '#F5F5F5', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎵</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>Nightly Entertainment</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>Free live music every night at Lake Sumter Landing, Spanish Springs, and Brownwood Paddock Square.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⛳</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>World-Class Golf</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>Over 50 golf courses including championship and executive layouts — more than any retirement community on Earth.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏌️</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>Golf Cart Community</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>Over 60,000 golf carts and 100+ miles of dedicated cart paths connecting every neighborhood and amenity.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2D7A2D', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏌️ VillagerConnect
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          Your Complete Guide to Life in The Villages, Florida
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          The Villages, FL 32162 · Sumter County, Florida
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          <Link href="/entertainment" style={{ color: '#FFD700' }}>Entertainment</Link>
          <Link href="/golf-courses" style={{ color: '#FFD700' }}>Golf Courses</Link>
          <Link href="/landings" style={{ color: '#FFD700' }}>Landings & Dining</Link>
          <Link href="/news" style={{ color: '#FFD700' }}>News</Link>
          <Link href="/elections" style={{ color: '#FFD700' }}>Elections</Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Not affiliated with The Villages developer or management. Community resource site.
        </p>
      </footer>
    </div>
  )
}

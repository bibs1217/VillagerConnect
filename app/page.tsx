'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const FEATURES = [
  { icon: '🎵', title: 'Entertainment',     desc: 'Nightly music at town squares and recreation centers', href: '/entertainment' },
  { icon: '📰', title: 'Local News',        desc: 'Latest news from The Villages and Sumter County',     href: '/news' },
  { icon: '🗳️', title: 'Elections',         desc: 'Voter information, officials, and upcoming elections', href: '/elections' },
  { icon: '🏪', title: 'Landings & Dining', desc: 'Complete directory of town squares and restaurants',  href: '/landings' },
  { icon: '🏌️', title: 'Golf Cart Rentals', desc: 'Rent golf carts from local companies',                href: '/golf-carts' },
  { icon: '⛳', title: 'Golf Courses',      desc: '50+ executive and championship courses',              href: '/golf-courses' },
  { icon: '💬', title: 'Community Forums',  desc: 'Connect with neighbors and community groups',         href: '/forums' },
  { icon: '📅', title: 'Events',            desc: 'Community events, clubs, and activities',             href: '/events' },
]

const STATS = [
  { value: '3',    label: 'Town Squares', icon: '🏛️' },
  { value: '12+',  label: 'Landings',    icon: '🏪' },
  { value: '50+',  label: 'Golf Courses', icon: '⛳' },
  { value: '100K+',label: 'Residents',   icon: '👥' },
]

// ── Weather widget ────────────────────────────────────────────────────────────

const COUNTIES = [
  { name: 'The Villages', county: 'Sumter',   lat: 28.9184, lon: -81.9284 },
  { name: 'Ocala',        county: 'Marion',   lat: 29.1872, lon: -82.1401 },
  { name: 'Leesburg',     county: 'Lake',     lat: 28.8108, lon: -81.8801 },
  { name: 'Gainesville',  county: 'Alachua',  lat: 29.6516, lon: -82.3248 },
  { name: 'Inverness',    county: 'Citrus',   lat: 28.8358, lon: -82.3309 },
  { name: 'Brooksville',  county: 'Hernando', lat: 28.5550, lon: -82.3882 },
]

function wmoInfo(code: number): { icon: string; desc: string } {
  if (code === 0) return { icon: '☀️', desc: 'Clear' }
  if (code <= 3)  return { icon: '⛅', desc: 'Partly Cloudy' }
  if (code <= 48) return { icon: '🌫️', desc: 'Foggy' }
  if (code <= 57) return { icon: '🌦️', desc: 'Drizzle' }
  if (code <= 67) return { icon: '🌧️', desc: 'Rain' }
  if (code <= 77) return { icon: '❄️', desc: 'Snow' }
  if (code <= 82) return { icon: '🌦️', desc: 'Showers' }
  if (code <= 86) return { icon: '❄️', desc: 'Snow Showers' }
  return { icon: '⛈️', desc: 'Thunderstorm' }
}

function fmt12h(iso: string) {
  const h = new Date(iso).getHours()
  return h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`
}

function fmtDay(iso: string, i: number) {
  if (i === 0) return 'Today'
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })
}

interface WHour { time: string; temp: number; code: number; precip: number }
interface WDay  { date: string; code: number; hi: number; lo: number; precip: number }
interface WeatherData {
  current: { temp: number; feels: number; humidity: number; wind: number; code: number }
  hourly: WHour[]
  daily:  WDay[]
}

async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&temperature_unit=fahrenheit&wind_speed_unit=mph` +
    `&timezone=America%2FNew_York&forecast_days=7`
  const d = await (await fetch(url)).json()
  const now = new Date(); now.setMinutes(0, 0, 0)
  const start = Math.max(0, d.hourly.time.findIndex((t: string) => new Date(t) >= now))
  return {
    current: {
      temp:     Math.round(d.current.temperature_2m),
      feels:    Math.round(d.current.apparent_temperature),
      humidity: d.current.relative_humidity_2m,
      wind:     Math.round(d.current.wind_speed_10m),
      code:     d.current.weather_code,
    },
    hourly: d.hourly.time.slice(start, start + 12).map((t: string, i: number) => ({
      time:   t,
      temp:   Math.round(d.hourly.temperature_2m[start + i]),
      code:   d.hourly.weather_code[start + i],
      precip: d.hourly.precipitation_probability[start + i] ?? 0,
    })),
    daily: d.daily.time.map((t: string, i: number) => ({
      date:   t,
      code:   d.daily.weather_code[i],
      hi:     Math.round(d.daily.temperature_2m_max[i]),
      lo:     Math.round(d.daily.temperature_2m_min[i]),
      precip: d.daily.precipitation_probability_max[i] ?? 0,
    })),
  }
}

function WeatherWidget() {
  const [sel,     setSel]     = useState(0)
  const [data,    setData]    = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [err,     setErr]     = useState(false)
  const [view,    setView]    = useState<'hourly' | 'daily'>('hourly')

  useEffect(() => {
    setLoading(true); setData(null); setErr(false)
    const c = COUNTIES[sel]
    fetchWeather(c.lat, c.lon)
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setErr(true); setLoading(false) })
  }, [sel])

  const county = COUNTIES[sel]
  const cur = data?.current
  const wmo = cur ? wmoInfo(cur.code) : null

  return (
    <div style={{
      background: 'rgba(0,0,0,0.52)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '1.25rem',
      color: '#fff',
      width: '310px',
      flexShrink: 0,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
    }}>

      {/* Header label */}
      <div style={{ padding: '0.6rem 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>🌤 Local Weather</span>
        <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>Open-Meteo · Live</span>
      </div>

      {/* County tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.1)', scrollbarWidth: 'none', marginTop: '0.35rem' }}>
        {COUNTIES.map((co, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            background: i === sel ? 'rgba(45,122,45,0.45)' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${i === sel ? '#FFD700' : 'transparent'}`,
            color: i === sel ? '#FFD700' : 'rgba(255,255,255,0.55)',
            padding: '0.35rem 0.6rem',
            fontSize: '0.67rem',
            fontWeight: i === sel ? 700 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap' as const,
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}>{co.county}</button>
        ))}
      </div>

      {/* Current conditions */}
      <div style={{ padding: '0.75rem 1rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>
            📍 {county.name}, {county.county} Co.
          </div>
          {loading ? (
            <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.25)', fontWeight: 800, lineHeight: 1 }}>—°</div>
          ) : err ? (
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,165,0,0.8)', marginTop: '0.25rem' }}>⚠ Unable to load</div>
          ) : cur && wmo ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
                <span style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>{cur.temp}°</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>F</span>
              </div>
              <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.75)', margin: '0.1rem 0 0.3rem' }}>
                {wmo.desc} · Feels like {cur.feels}°
              </div>
              <div style={{ display: 'flex', gap: '0.7rem', fontSize: '0.67rem', color: 'rgba(255,255,255,0.45)' }}>
                <span>💧 {cur.humidity}%</span>
                <span>💨 {cur.wind} mph</span>
              </div>
            </>
          ) : null}
        </div>
        <div style={{ fontSize: '3rem', lineHeight: 1, flexShrink: 0, marginLeft: '0.5rem' }}>{wmo?.icon ?? '🌡️'}</div>
      </div>

      {/* Hourly / 7-Day toggle */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {(['hourly', 'daily'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1,
            background: view === v ? 'rgba(45,122,45,0.35)' : 'transparent',
            border: 'none',
            color: view === v ? '#FFD700' : 'rgba(255,255,255,0.45)',
            padding: '0.35rem',
            fontSize: '0.68rem',
            fontWeight: view === v ? 700 : 400,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}>{v === 'hourly' ? '⏱ Hourly' : '📅 7-Day'}</button>
        ))}
      </div>

      {/* Forecast content */}
      <div style={{ padding: '0.5rem', minHeight: '80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '0.75rem', fontSize: '0.75rem' }}>
            Loading weather data…
          </div>
        ) : view === 'hourly' ? (
          <div style={{ display: 'flex', gap: '0.3rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' as const }}>
            {data?.hourly.map((h, i) => {
              const wi = wmoInfo(h.code)
              return (
                <div key={i} style={{
                  flexShrink: 0,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '0.625rem',
                  padding: '0.35rem 0.4rem',
                  minWidth: '44px',
                }}>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.1rem' }}>{fmt12h(h.time)}</div>
                  <div style={{ fontSize: '1rem' }}>{wi.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{h.temp}°</div>
                  {h.precip > 0 && (
                    <div style={{ fontSize: '0.55rem', color: '#7dd3fc' }}>💧{h.precip}%</div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data?.daily.map((d, i) => {
              const wi = wmoInfo(d.code)
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.28rem 0.25rem',
                  borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{wi.icon}</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', flex: 1 }}>{fmtDay(d.date, i)}</span>
                  {d.precip > 0 && <span style={{ fontSize: '0.6rem', color: '#7dd3fc', flexShrink: 0 }}>💧{d.precip}%</span>}
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', flexShrink: 0, minWidth: '22px', textAlign: 'right' }}>{d.lo}°</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, minWidth: '22px', textAlign: 'right' }}>{d.hi}°</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

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

      {/* Hero — two-column: headline left, weather right */}
      <section style={{ background: 'linear-gradient(135deg, #2D7A2D 0%, #1a5c1a 60%, #0f400f 100%)', padding: '4rem 2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1400&q=80") center/cover', opacity: 0.08, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto', display: 'flex', gap: '2.5rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          {/* Left: text & CTAs */}
          <div style={{ flex: 1, minWidth: '300px', maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '9999px', padding: '0.4rem 1.25rem', marginBottom: '1.75rem', fontSize: '0.85rem', color: '#FFD700', fontWeight: 700 }}>
              🌴 Welcome to The Villages, Florida
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.1rem', color: '#FFFFFF', letterSpacing: '-1px' }}>
              Everything You Need<br /><span style={{ color: '#FFD700' }}>In One Place</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '560px' }}>
              Entertainment, news, golf, dining, elections, and community — your complete guide to life in the world's friendliest retirement community.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="/entertainment" style={{ background: '#FFD700', color: '#1A1A1A', padding: '0.875rem 2rem', borderRadius: '0.75rem', fontWeight: 800, fontSize: '1rem', display: 'inline-block', textDecoration: 'none' }}>
                Tonight's Entertainment →
              </Link>
              <Link href="/landings" style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', display: 'inline-block', textDecoration: 'none' }}>
                Find a Restaurant
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.875rem', padding: '0.75rem 1.1rem' }}>
                  <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#FFD700' }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: weather widget */}
          <WeatherWidget />
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
              style={{ display: 'block', background: '#FFFFFF', border: '2px solid #E0E0E0', borderRadius: '1rem', padding: '1.75rem', textDecoration: 'none', cursor: 'pointer' }}
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
        <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏌️ VillagerConnect</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Your Complete Guide to Life in The Villages, Florida</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '1rem' }}>The Villages, FL 32162 · Sumter County, Florida</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          <Link href="/entertainment" style={{ color: '#FFD700' }}>Entertainment</Link>
          <Link href="/golf-courses"  style={{ color: '#FFD700' }}>Golf Courses</Link>
          <Link href="/landings"      style={{ color: '#FFD700' }}>Landings & Dining</Link>
          <Link href="/news"          style={{ color: '#FFD700' }}>News</Link>
          <Link href="/elections"     style={{ color: '#FFD700' }}>Elections</Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Not affiliated with The Villages developer or management. Community resource site.
        </p>
      </footer>
    </div>
  )
}

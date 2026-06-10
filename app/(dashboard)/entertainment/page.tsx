'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

interface Event {
  performer: string
  genre: string
  venue: string
  date: string
  time: string
  cover_charge: string
  description: string
}

const VENUES = ['All', 'Lake Sumter Landing', 'Brownwood Paddock Square', 'Spanish Springs Town Square', 'Recreation Centers']
const GENRES = ['All', 'Country', 'Rock', 'Jazz', 'Pop', 'Tribute Band', 'Classical', 'Oldies', 'Big Band']

const GENRE_COLORS: Record<string, string> = {
  Country: '#8B4513', Rock: '#CC0000', Jazz: '#1a1a6e', Pop: '#CC0099',
  'Tribute Band': '#555', Classical: '#2D7A2D', Oldies: '#8B6914', 'Big Band': '#1a6e6e',
}

const SAMPLE_EVENTS: Event[] = [
  { performer: 'The Midnight Cowboys', genre: 'Country', venue: 'Lake Sumter Landing', date: '2026-06-10', time: '7:00 PM', cover_charge: 'Free', description: 'Classic country hits from the 70s and 80s' },
  { performer: 'Florida Gold', genre: 'Oldies', venue: 'Spanish Springs Town Square', date: '2026-06-10', time: '7:30 PM', cover_charge: 'Free', description: 'Your favorite golden oldies from the 50s through 70s' },
  { performer: 'The Swingin\' Seniors', genre: 'Big Band', venue: 'Brownwood Paddock Square', date: '2026-06-10', time: '8:00 PM', cover_charge: 'Free', description: 'Big band and swing music in the Paddock Square tradition' },
  { performer: 'Eagles Tribute', genre: 'Tribute Band', venue: 'Lake Sumter Landing', date: '2026-06-11', time: '7:00 PM', cover_charge: 'Free', description: 'The complete Eagles experience — Hotel California and more' },
  { performer: 'Jazz Ensemble of The Villages', genre: 'Jazz', venue: 'Savannah Center', date: '2026-06-11', time: '7:00 PM', cover_charge: '$5', description: 'The Villages\' premier jazz ensemble performs standards and originals' },
  { performer: 'Southern Roots', genre: 'Country', venue: 'Spanish Springs Town Square', date: '2026-06-12', time: '7:30 PM', cover_charge: 'Free', description: 'Modern country and bluegrass performed by local favorites' },
  { performer: 'Classic Rock All-Stars', genre: 'Rock', venue: 'Brownwood Paddock Square', date: '2026-06-12', time: '8:00 PM', cover_charge: 'Free', description: 'Classic rock anthems from the 60s, 70s, and 80s' },
  { performer: 'The Villages Symphony Orchestra', genre: 'Classical', venue: 'Sharon L. Morse Performing Arts Center', date: '2026-06-13', time: '7:30 PM', cover_charge: '$15', description: 'Full orchestra performing classical masterworks' },
  { performer: 'Elton John Tribute — Crocodile Rock', genre: 'Tribute Band', venue: 'Lake Sumter Landing', date: '2026-06-13', time: '7:00 PM', cover_charge: 'Free', description: 'A dazzling tribute to the Rocket Man himself' },
  { performer: 'Margaritaville Band', genre: 'Pop', venue: 'Spanish Springs Town Square', date: '2026-06-14', time: '7:30 PM', cover_charge: 'Free', description: 'Jimmy Buffett favorites and island vibes for the weekend' },
  { performer: 'Country Roads', genre: 'Country', venue: 'Brownwood Paddock Square', date: '2026-06-14', time: '8:00 PM', cover_charge: 'Free', description: 'John Denver, Kenny Rogers, Dolly Parton and more' },
  { performer: 'Village Voices Choir', genre: 'Classical', venue: 'First United Methodist Church', date: '2026-06-15', time: '3:00 PM', cover_charge: 'Free', description: 'Community choir concert featuring sacred and secular music' },
  { performer: 'The Platters Tribute', genre: 'Oldies', venue: 'Lake Sumter Landing', date: '2026-06-15', time: '7:00 PM', cover_charge: 'Free', description: 'Doo-wop and early rock and roll classics' },
  { performer: 'Fleetwood Mac Revisited', genre: 'Tribute Band', venue: 'Spanish Springs Town Square', date: '2026-06-16', time: '7:30 PM', cover_charge: 'Free', description: 'Go your own way with this incredible Fleetwood Mac tribute' },
  { performer: 'Blues Brothers Experience', genre: 'Rock', venue: 'Brownwood Paddock Square', date: '2026-06-17', time: '8:00 PM', cover_charge: 'Free', description: 'Soul, blues, and R&B in the Blues Brothers tradition' },
  { performer: 'Piano Bar with Larry Stevens', genre: 'Jazz', venue: 'The Waterfront Inn', date: '2026-06-18', time: '6:00 PM', cover_charge: 'Free with dinner', description: 'Intimate piano bar with standards and singalong favorites' },
  { performer: 'Alabama Tribute — Forever Country', genre: 'Country', venue: 'Lake Sumter Landing', date: '2026-06-19', time: '7:00 PM', cover_charge: 'Free', description: 'The best of Alabama and classic country radio hits' },
  { performer: 'Pop Hits of the 80s', genre: 'Pop', venue: 'Spanish Springs Town Square', date: '2026-06-20', time: '7:30 PM', cover_charge: 'Free', description: 'All your favorite 80s pop hits live on the square' },
  { performer: 'Villages Big Band', genre: 'Big Band', venue: 'Savannah Center', date: '2026-06-21', time: '7:00 PM', cover_charge: '$8', description: 'Glenn Miller, Tommy Dorsey, and the golden era of swing' },
  { performer: 'Neil Diamond Tribute', genre: 'Tribute Band', venue: 'Brownwood Paddock Square', date: '2026-06-21', time: '8:00 PM', cover_charge: 'Free', description: 'Sweet Caroline and all the Diamond classics live on the square' },
]

export default function EntertainmentPage() {
  const [venueFilter, setVenueFilter] = useState('All')
  const [genreFilter, setGenreFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [aiLoaded, setAiLoaded] = useState(false)

  const filtered = events.filter(e => {
    const matchVenue = venueFilter === 'All' || e.venue.includes(venueFilter.replace('Recreation Centers', ''))
    const matchGenre = genreFilter === 'All' || e.genre === genreFilter
    const matchSearch = !search || e.performer.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase()) || e.genre.toLowerCase().includes(search.toLowerCase())
    return matchVenue && matchGenre && matchSearch
  })

  async function loadAIListings() {
    setLoading(true)
    try {
      const res = await fetch('/api/villager-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'entertainment' }),
      })
      const data = await res.json()
      if (data.events?.length) { setEvents(data.events); setAiLoaded(true) }
    } catch {}
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>🎵 Entertainment</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Nightly live music at The Villages town squares and recreation centers</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="https://www.thevillages.com/entertainment/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#2D7A2D', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
            Official Calendar ↗
          </a>
          {!aiLoaded && (
            <button onClick={loadAIListings} disabled={loading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FFD700', color: '#1A1A1A', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? '⏳ Loading AI listings…' : '✨ Load Live AI Listings'}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search performers, venues, or genres…"
          style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem', color: '#1A1A1A', outline: 'none', background: '#F5F5F5' }} />
      </div>

      {/* Venue Filter */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {VENUES.map(v => (
          <button key={v} onClick={() => setVenueFilter(v)}
            style={{ padding: '0.45rem 1rem', borderRadius: '9999px', border: `2px solid ${venueFilter === v ? '#2D7A2D' : '#E0E0E0'}`, background: venueFilter === v ? '#2D7A2D' : '#FFFFFF', color: venueFilter === v ? 'white' : '#444', fontWeight: venueFilter === v ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
            {v}
          </button>
        ))}
      </div>

      {/* Genre Filter */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {GENRES.map(g => (
          <button key={g} onClick={() => setGenreFilter(g)}
            style={{ padding: '0.35rem 0.875rem', borderRadius: '9999px', border: `1px solid ${genreFilter === g ? '#FFD700' : '#E0E0E0'}`, background: genreFilter === g ? '#FFD700' : '#FFFFFF', color: '#1A1A1A', fontWeight: genreFilter === g ? 700 : 400, fontSize: '0.8rem', cursor: 'pointer' }}>
            {g}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Event Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((e, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.25rem', borderLeft: `4px solid ${GENRE_COLORS[e.genre] ?? '#2D7A2D'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', lineHeight: 1.3 }}>{e.performer}</h3>
              <span style={{ background: e.cover_charge === 'Free' ? 'rgba(45,122,45,0.1)' : 'rgba(255,215,0,0.2)', color: e.cover_charge === 'Free' ? '#2D7A2D' : '#8B6914', border: `1px solid ${e.cover_charge === 'Free' ? 'rgba(45,122,45,0.3)' : 'rgba(255,215,0,0.4)'}`, borderRadius: '9999px', padding: '0.2rem 0.75rem', fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {e.cover_charge}
              </span>
            </div>
            <div style={{ marginBottom: '0.625rem' }}>
              <span style={{ background: GENRE_COLORS[e.genre] ?? '#2D7A2D', color: 'white', borderRadius: '9999px', padding: '0.2rem 0.75rem', fontSize: '0.72rem', fontWeight: 700 }}>{e.genre}</span>
            </div>
            <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.875rem' }}>{e.description}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#444' }}>
              <span>📍 {e.venue}</span>
              <span>📅 {new Date(e.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span>🕐 {e.time}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</div>
          <p style={{ fontSize: '1.1rem' }}>No events found matching your filters.</p>
        </div>
      )}
    </div>
  )
}

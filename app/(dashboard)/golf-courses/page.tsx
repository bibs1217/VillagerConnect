'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

interface GolfCourse {
  name: string
  type: 'Championship' | 'Executive' | 'Pitch & Putt'
  holes: number
  location: string
  greenFees?: string
  memberOnly: boolean
  phone?: string
  notes: string
  par?: number
}

const COURSES: GolfCourse[] = [
  // Championship
  { name: 'Hacienda Hills Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'One of the most prestigious championship courses in The Villages. Rolling terrain, water hazards, and immaculate fairways.' },
  { name: 'Evans Prairie Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Championship course with challenging layout featuring multiple water features and well-bunkered greens.' },
  { name: 'Tierra Del Sol Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Spanish-themed championship course with beautiful landscaping, mature trees, and demanding back nine.' },
  { name: 'Bonifay Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Traditional championship layout with tree-lined fairways and elevated greens. A Villages classic.' },
  { name: 'Belle Glade Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'New championship course featuring modern design with native Florida landscaping and challenging par 5s.' },
  { name: 'Fenney Golf Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Located in the newest Fenney neighborhoods. Modern championship design with stunning views and challenging greens.' },
  { name: 'Loblolly Country Club', type: 'Championship', holes: 18, par: 72, location: 'The Villages, FL', greenFees: 'Members only', memberOnly: true, notes: 'Named for the native loblolly pine trees that frame many of its fairways. A challenging and scenic layout.' },
  { name: 'Laurel Valley Golf Club', type: 'Championship', holes: 18, par: 72, location: 'Lady Lake, FL', greenFees: '$45–$75', memberOnly: false, phone: '(352) 753-7400', notes: 'Semi-private championship course open to the public. Located adjacent to The Villages with excellent greens.' },
  // Executive
  { name: 'Allamanda Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Nine-hole executive course. Perfect for a quick 9 or beginners learning the game. Walking distance from neighborhoods.' },
  { name: 'Aloha Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Hawaiian-themed executive course with beautiful tropical landscaping and friendly layout for all skill levels.' },
  { name: 'Amelia Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Classic executive layout. Great for a morning round before the Florida heat sets in.' },
  { name: 'Annex Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Compact executive course in a neighborhood setting. Perfect for residents within walking or cart distance.' },
  { name: 'Arroyo Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Challenging executive layout with several water features. A step up for executive course players.' },
  { name: 'Bailey Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Friendly executive course with open fairways and manageable greens. Great for all handicap levels.' },
  { name: 'Belvedere Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Scenic executive course with rolling terrain and views of surrounding neighborhoods.' },
  { name: 'Boone Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Classic Villages executive course design. Well-maintained throughout the year.' },
  { name: 'Breckenridge Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Tree-lined executive course that rewards accurate iron play. A local favorite.' },
  { name: 'Brixton Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Fun executive layout with a mix of short and medium holes. Great for working on the short game.' },
  { name: 'Calumet Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Open executive layout good for beginners. Plenty of birdie opportunities for experienced players.' },
  { name: 'Cane Garden Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Challenging executive course with native landscape. One of the more scenic executive layouts in The Villages.' },
  { name: 'Chula Vista Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Named for the Spanish Springs area. Compact but challenging layout with tight fairways.' },
  { name: 'Clifton Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Relaxed executive course. Ideal for an evening round or a beginner wanting to develop their game.' },
  { name: 'Coconut Cove Executive', type: 'Executive', holes: 9, par: 31, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Tropical-themed executive course with beautiful Florida landscaping and water features.' },
  { name: 'Crestview Executive', type: 'Executive', holes: 9, par: 30, location: 'The Villages, FL', greenFees: 'Free for residents', memberOnly: false, notes: 'Elevated terrain executive course. Offers some of the best views of surrounding neighborhoods.' },
]

export default function GolfCoursesPage() {
  const [filter, setFilter] = useState<'All' | 'Championship' | 'Executive' | 'Public' | 'Members Only'>('All')
  const [search, setSearch] = useState('')

  const filtered = COURSES.filter(c => {
    const matchType = filter === 'All' || c.type === filter || (filter === 'Public' && !c.memberOnly) || (filter === 'Members Only' && c.memberOnly)
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const championship = filtered.filter(c => c.type === 'Championship')
  const executive = filtered.filter(c => c.type === 'Executive')

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>⛳ Golf Courses</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Complete directory of championship and executive golf courses in The Villages</p>
      </div>

      {/* Stats Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1a5c1a, #2D7A2D)', borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>⛳ More Golf Than Anywhere on Earth</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>The Villages has more golf holes per capita than any community in the world</div>
        </div>
        {[['11', 'Championship Courses'], ['36+', 'Executive Courses'], ['2', 'Pitch & Putt'], ['Free', 'Executive for Residents']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '0.75rem', padding: '0.75rem 1.25rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFD700' }}>{v}</div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {(['All', 'Championship', 'Executive', 'Public', 'Members Only'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '0.45rem 1rem', borderRadius: '9999px', border: `2px solid ${filter === f ? '#2D7A2D' : '#E0E0E0'}`, background: filter === f ? '#2D7A2D' : '#FFFFFF', color: filter === f ? 'white' : '#444', fontWeight: filter === f ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search course names…"
        style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem', marginBottom: '2rem', outline: 'none', background: '#FFFFFF' }} />

      {/* Championship Courses */}
      {championship.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏆 Championship Courses
            <span style={{ background: '#2D7A2D', color: 'white', borderRadius: '9999px', padding: '0.1rem 0.625rem', fontSize: '0.7rem', fontWeight: 700 }}>{championship.length}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {championship.map((c, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.25rem', borderTop: '3px solid #2D7A2D' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A1A1A', lineHeight: 1.3, flex: 1 }}>{c.name}</h3>
                  <span style={{ background: c.memberOnly ? 'rgba(139,69,19,0.1)' : 'rgba(45,122,45,0.1)', color: c.memberOnly ? '#8B4513' : '#2D7A2D', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                    {c.memberOnly ? 'Members' : 'Public'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
                  <span>🏌️ {c.holes} holes</span>
                  {c.par && <span>· Par {c.par}</span>}
                </div>
                <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{c.notes}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888' }}>
                  <span>📍 {c.location}</span>
                  <span style={{ fontWeight: 700, color: '#2D7A2D' }}>{c.greenFees}</span>
                </div>
                {c.phone && <div style={{ marginTop: '0.5rem' }}><a href={`tel:${c.phone}`} style={{ color: '#2D7A2D', fontSize: '0.8rem', fontWeight: 600 }}>📞 {c.phone}</a></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executive Courses */}
      {executive.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⛳ Executive Courses (Free for Residents)
            <span style={{ background: '#FFD700', color: '#1A1A1A', borderRadius: '9999px', padding: '0.1rem 0.625rem', fontSize: '0.7rem', fontWeight: 700 }}>{executive.length}</span>
          </h2>
          <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.25rem' }}>All executive courses are free to play for Villages residents. Guests pay a small fee. No tee times required — show up and play!</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
            {executive.map((c, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.75rem', padding: '1rem', display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⛳</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1A1A1A', marginBottom: '0.2rem' }}>{c.name}</h3>
                  <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{c.holes} holes · Par {c.par} · {c.location}</p>
                  <p style={{ color: '#555', fontSize: '0.78rem', lineHeight: 1.45 }}>{c.notes}</p>
                  <p style={{ color: '#2D7A2D', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.3rem' }}>✓ Free for residents</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

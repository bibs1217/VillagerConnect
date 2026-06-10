'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

interface Article {
  headline: string
  summary: string
  source: string
  date: string
  category: string
  url?: string
}

const CATEGORIES = ['All News', 'Villages Updates', 'Sumter County', 'Marion County', 'Lake County', 'Development', 'Community']

const SAMPLE_NEWS: Article[] = [
  { headline: 'The Villages Announces New Recreation Center Opening in Fenney', summary: 'A state-of-the-art recreation center is set to open in the Fenney neighborhood this fall, featuring indoor pools, pickleball courts, and a fitness center.', source: 'Villages Daily Sun', date: '2026-06-09', category: 'Villages Updates' },
  { headline: 'Sumter County Commission Approves Infrastructure Budget for 2026', summary: 'The Sumter County Commission voted 4-1 to approve a $180 million infrastructure budget focused on road improvements and utility expansion.', source: 'Daily Commercial', date: '2026-06-08', category: 'Sumter County' },
  { headline: 'New Brownwood Paddock Square Restaurant Opening This Summer', summary: 'A new farm-to-table restaurant concept is set to open at Brownwood Paddock Square, featuring Florida-grown produce and locally sourced seafood.', source: 'Villages News', date: '2026-06-08', category: 'Villages Updates' },
  { headline: 'Ocala-Marion County Economic Development Breaks Ground on New Industrial Park', summary: 'Marion County broke ground on a 500-acre industrial park expected to bring 2,000 jobs to the region over the next five years.', source: 'Ocala Star-Banner', date: '2026-06-07', category: 'Marion County' },
  { headline: 'The Villages Charter Schools Report Record Enrollment for 2026-2027', summary: 'The Villages Charter School system reports record enrollment numbers for the upcoming school year, with over 3,000 students across five campuses.', source: 'Villages Daily Sun', date: '2026-06-07', category: 'Villages Updates' },
  { headline: 'Lake County Approves New Senior Housing Development Near Leesburg', summary: 'Lake County commissioners approved plans for a 300-unit senior living community near downtown Leesburg, with construction set to begin in early 2027.', source: 'Daily Commercial', date: '2026-06-06', category: 'Lake County' },
  { headline: 'The Villages Golf Cart Path Expansion Project Nears Completion', summary: 'The multi-year expansion of The Villages golf cart path network is nearly complete, adding 22 miles of new dedicated cart paths through newer neighborhoods.', source: 'Villages News', date: '2026-06-05', category: 'Development' },
  { headline: 'Sumter County Property Values Rise 8% According to Annual Assessment', summary: 'Sumter County Property Appraiser releases annual assessment showing an 8% increase in property values, reflecting continued demand for Villages area real estate.', source: 'Sumter County Times', date: '2026-06-05', category: 'Sumter County' },
  { headline: 'Villages Community Blood Drive Sets New Record for Donations', summary: 'The semi-annual community blood drive collected a record 1,847 units of blood, enough to save over 5,500 lives.', source: 'Villages Daily Sun', date: '2026-06-04', category: 'Community' },
  { headline: 'Spanish Springs Town Square Undergoes Landscape Renovation', summary: 'The iconic Spanish Springs Town Square is receiving a landscape renovation including new native plantings and improved irrigation systems.', source: 'Villages News', date: '2026-06-03', category: 'Development' },
  { headline: 'Florida Retirement Community Rankings: The Villages Ranks #1 Again', summary: 'For the 12th consecutive year, The Villages has been named the top retirement community in America by a major industry publication.', source: 'Villages Daily Sun', date: '2026-06-02', category: 'Villages Updates' },
  { headline: 'Sumter County Sheriff Reports 20-Year Low in Crime Statistics', summary: 'Sumter County Sheriff\'s Office annual report shows crime rates have fallen to their lowest levels in 20 years, with violent crime down 15%.', source: 'Ocala Star-Banner', date: '2026-06-01', category: 'Sumter County' },
]

export default function NewsPage() {
  const [category, setCategory] = useState('All News')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<Article[]>(SAMPLE_NEWS)
  const [aiLoaded, setAiLoaded] = useState(false)

  const filtered = news.filter(a => {
    const matchCat = category === 'All News' || a.category === category
    const matchSearch = !search || a.headline.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  async function loadAINews() {
    setLoading(true)
    try {
      const res = await fetch('/api/villager-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'news' }),
      })
      const data = await res.json()
      if (data.articles?.length) { setNews(data.articles); setAiLoaded(true) }
    } catch {}
    setLoading(false)
  }

  const CAT_COLORS: Record<string, string> = {
    'Villages Updates': '#2D7A2D', 'Sumter County': '#1a5c9e', 'Marion County': '#8B4513',
    'Lake County': '#1a7a7a', Development: '#666', Community: '#9e1a9e',
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>📰 Local News</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Latest news from The Villages and surrounding counties</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="https://www.thevillagesdailysun.com" target="_blank" rel="noopener noreferrer" style={{ background: '#2D7A2D', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Villages Daily Sun ↗</a>
          <a href="https://www.ocala.com" target="_blank" rel="noopener noreferrer" style={{ background: '#1A1A1A', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Ocala Star-Banner ↗</a>
          <a href="https://www.thevillagesnews.com" target="_blank" rel="noopener noreferrer" style={{ background: '#8B4513', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Villages News ↗</a>
          {!aiLoaded && (
            <button onClick={loadAINews} disabled={loading}
              style={{ background: '#FFD700', color: '#1A1A1A', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? '⏳ Loading…' : '✨ Load AI News'}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search news headlines…"
        style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem', marginBottom: '1.25rem', outline: 'none', background: '#FFFFFF' }} />

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            style={{ padding: '0.45rem 1rem', borderRadius: '9999px', border: `2px solid ${category === c ? '#2D7A2D' : '#E0E0E0'}`, background: category === c ? '#2D7A2D' : '#FFFFFF', color: category === c ? 'white' : '#444', fontWeight: category === c ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filtered.map((a, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.5rem', borderLeft: `4px solid ${CAT_COLORS[a.category] ?? '#2D7A2D'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
              <span style={{ background: CAT_COLORS[a.category] ?? '#2D7A2D', color: 'white', borderRadius: '9999px', padding: '0.2rem 0.75rem', fontSize: '0.72rem', fontWeight: 700 }}>{a.category}</span>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#888', alignItems: 'center' }}>
                <span>{a.source}</span>
                <span>·</span>
                <span>{new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A1A1A', marginBottom: '0.625rem', lineHeight: 1.4 }}>{a.headline}</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.65 }}>{a.summary}</p>
            {a.url && (
              <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.875rem', color: '#2D7A2D', fontWeight: 600, fontSize: '0.85rem' }}>
                Read full story →
              </a>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📰</div>
            <p>No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

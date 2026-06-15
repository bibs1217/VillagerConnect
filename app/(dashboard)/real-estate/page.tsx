'use client'
export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect } from 'react'

type ListingType = 'sale' | 'rent'

interface Filters {
  type: ListingType
  minPrice: string
  maxPrice: string
  beds: string
  baths: string
  sqft: string
  community: string
}

interface Listing {
  id: string
  address: string
  community: string
  price: number
  priceUnit?: string
  beds: number
  baths: number
  sqft: number
  yearBuilt: number
  style: string
  description: string
  features: string[]
  zillowUrl: string
  redfin: string
  imageQuery: string
  daysOnMarket: number
  priceChange?: string
}

interface MarketData {
  summary: string
  medianPrice: string
  avgDaysOnMarket: string
  priceChange: string
  listings: Listing[]
}

const COMMUNITIES = [
  'Any Community',
  'Brownwood',
  'Tamarind Grove',
  'Fenney',
  'Hillsborough',
  'Piedmont',
  'Summerfield',
  'Lake Deaton',
  'Dunedin',
  'Sabal Chase',
  'Hemingway',
  'Hacienda Hills',
]

const PRICE_RANGES_SALE = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under $250K', min: '', max: '250000' },
  { label: '$250K–$350K', min: '250000', max: '350000' },
  { label: '$350K–$500K', min: '350000', max: '500000' },
  { label: '$500K–$700K', min: '500000', max: '700000' },
  { label: '$700K+', min: '700000', max: '' },
]

const PRICE_RANGES_RENT = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under $1,500/mo', min: '', max: '1500' },
  { label: '$1,500–$2,000/mo', min: '1500', max: '2000' },
  { label: '$2,000–$2,500/mo', min: '2000', max: '2500' },
  { label: '$2,500–$3,500/mo', min: '2500', max: '3500' },
  { label: '$3,500+/mo', min: '3500', max: '' },
]

function formatPrice(price: number, type: ListingType): string {
  if (type === 'rent') return `$${price.toLocaleString()}/mo`
  if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

function buildZillowUrl(filters: Filters): string {
  const base = filters.type === 'sale'
    ? 'https://www.zillow.com/the-villages-fl/'
    : 'https://www.zillow.com/the-villages-fl/rentals/'
  const params: string[] = []
  if (filters.minPrice) params.push(`price_min=${filters.minPrice}`)
  if (filters.maxPrice) params.push(`price_max=${filters.maxPrice}`)
  if (filters.beds && filters.beds !== 'Any') params.push(`beds_min=${filters.beds.replace('+','')}`)
  if (filters.baths && filters.baths !== 'Any') params.push(`baths_min=${filters.baths.replace('+','')}`)
  return params.length ? `${base}?${params.join('&')}` : base
}

function buildRedfin(filters: Filters): string {
  return filters.type === 'sale'
    ? 'https://www.redfin.com/city/18749/FL/The-Villages'
    : 'https://www.redfin.com/city/18749/FL/The-Villages/apartments-for-rent'
}

function buildRealtor(filters: Filters): string {
  return filters.type === 'sale'
    ? 'https://www.realtor.com/realestateandhomes-search/The-Villages_FL'
    : 'https://www.realtor.com/apartments/The-Villages_FL'
}

function ListingCard({ listing, type }: { listing: Listing; type: ListingType }) {
  const colors = ['#2D7A2D','#1a5c1a','#0f400f','#3a8a3a','#4a9a4a']
  const color = colors[parseInt(listing.id) % colors.length]
  return (
    <div style={{ background:'#FFFFFF', border:'1px solid #E0E0E0', borderRadius:'1rem', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Image placeholder */}
      <div style={{ height:'160px', background:`linear-gradient(135deg, ${color} 0%, #FFD700 100%)`, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.25rem' }}>🏡</div>
          <div style={{ color:'rgba(255,255,255,0.9)', fontSize:'0.75rem', fontWeight:600 }}>{listing.style}</div>
        </div>
        {listing.daysOnMarket <= 3 && (
          <div style={{ position:'absolute', top:'0.75rem', left:'0.75rem', background:'#FFD700', color:'#1A1A1A', borderRadius:'9999px', padding:'0.2rem 0.625rem', fontSize:'0.72rem', fontWeight:800 }}>
            NEW
          </div>
        )}
        {listing.priceChange && (
          <div style={{ position:'absolute', top:'0.75rem', right:'0.75rem', background:'rgba(255,255,255,0.9)', color:'#CC0000', borderRadius:'9999px', padding:'0.2rem 0.625rem', fontSize:'0.72rem', fontWeight:700 }}>
            {listing.priceChange}
          </div>
        )}
      </div>

      <div style={{ padding:'1rem', flex:1, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
        {/* Price */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <span style={{ fontSize:'1.35rem', fontWeight:900, color:'#2D7A2D' }}>{formatPrice(listing.price, type)}</span>
          <span style={{ fontSize:'0.75rem', color:'#888', paddingTop:'0.2rem' }}>{listing.daysOnMarket}d ago</span>
        </div>

        {/* Address */}
        <div>
          <p style={{ fontWeight:700, fontSize:'0.9rem', color:'#1A1A1A', marginBottom:'0.15rem' }}>{listing.address}</p>
          <p style={{ color:'#888', fontSize:'0.78rem' }}>📍 {listing.community} · The Villages, FL</p>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:'0.875rem', borderTop:'1px solid #F0F0F0', paddingTop:'0.5rem' }}>
          <span style={{ fontSize:'0.82rem', color:'#444' }}>🛏 {listing.beds} bd</span>
          <span style={{ fontSize:'0.82rem', color:'#444' }}>🚿 {listing.baths} ba</span>
          <span style={{ fontSize:'0.82rem', color:'#444' }}>📐 {listing.sqft.toLocaleString()} sqft</span>
        </div>

        {/* Features */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem' }}>
          {listing.features.slice(0, 3).map((f, i) => (
            <span key={i} style={{ background:'rgba(45,122,45,0.08)', color:'#2D7A2D', border:'1px solid rgba(45,122,45,0.2)', borderRadius:'9999px', padding:'0.15rem 0.5rem', fontSize:'0.7rem', fontWeight:600 }}>{f}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ color:'#666', fontSize:'0.78rem', lineHeight:1.5, flex:1 }}>{listing.description}</p>

        {/* Actions */}
        <div style={{ display:'flex', gap:'0.5rem', marginTop:'auto' }}>
          <a href={listing.zillowUrl} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, textAlign:'center', background:'#2D7A2D', color:'white', padding:'0.6rem', borderRadius:'0.5rem', fontSize:'0.82rem', fontWeight:700, textDecoration:'none' }}>
            View on Zillow →
          </a>
          <a href={listing.redfin} target="_blank" rel="noopener noreferrer"
            style={{ padding:'0.6rem 0.75rem', background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.5rem', fontSize:'0.82rem', color:'#444', textDecoration:'none' }}>
            Redfin
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RealEstatePage() {
  const [filters, setFilters] = useState<Filters>({
    type: 'sale',
    minPrice: '',
    maxPrice: '',
    beds: 'Any',
    baths: 'Any',
    sqft: 'Any',
    community: 'Any Community',
  })
  const [loading, setLoading]       = useState(false)
  const [market, setMarket]         = useState<MarketData | null>(null)
  const [error, setError]           = useState('')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)

  const priceRanges = filters.type === 'sale' ? PRICE_RANGES_SALE : PRICE_RANGES_RENT

  function setPrice(idx: number) {
    setSelectedPrice(idx)
    setFilters(f => ({ ...f, minPrice: priceRanges[idx].min, maxPrice: priceRanges[idx].max }))
  }

  async function searchListings() {
    setLoading(true)
    setError('')
    setMarket(null)
    try {
      const res = await fetch('/api/real-estate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters }),
      })
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setMarket(data)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (e) {
      setError('Unable to load listings. Please try the direct links below.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.4rem' }}>
          🏠 Real Estate in The Villages
        </h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          AI-powered home search — find homes for sale &amp; rent in The Villages, FL
        </p>
      </div>

      {/* Search Panel */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '2rem' }}>

        {/* Sale / Rent toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {(['sale', 'rent'] as ListingType[]).map(t => (
            <button key={t} onClick={() => { setFilters(f => ({ ...f, type: t })); setSelectedPrice(0); setMarket(null) }}
              style={{ padding: '0.6rem 1.75rem', borderRadius: '0.625rem', border: '2px solid', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', borderColor: filters.type === t ? '#2D7A2D' : '#E0E0E0', background: filters.type === t ? '#2D7A2D' : '#FFFFFF', color: filters.type === t ? 'white' : '#666' }}>
              {t === 'sale' ? '🏡 For Sale' : '🔑 For Rent'}
            </button>
          ))}
        </div>

        {/* Price range */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.5rem' }}>Price Range</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {priceRanges.map((r, i) => (
              <button key={i} onClick={() => setPrice(i)}
                style={{ padding: '0.4rem 0.875rem', borderRadius: '9999px', border: '2px solid', fontSize: '0.82rem', cursor: 'pointer', fontWeight: selectedPrice === i ? 700 : 400, borderColor: selectedPrice === i ? '#2D7A2D' : '#E0E0E0', background: selectedPrice === i ? '#2D7A2D' : '#FFFFFF', color: selectedPrice === i ? 'white' : '#444' }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Beds / Baths / Sqft */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.4rem' }}>Bedrooms</p>
            <select value={filters.beds} onChange={e => setFilters(f => ({ ...f, beds: e.target.value }))}
              style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#1A1A1A', background: '#F5F5F5', outline: 'none' }}>
              {['Any', '1+', '2+', '3+', '4+', '5+'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.4rem' }}>Bathrooms</p>
            <select value={filters.baths} onChange={e => setFilters(f => ({ ...f, baths: e.target.value }))}
              style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#1A1A1A', background: '#F5F5F5', outline: 'none' }}>
              {['Any', '1+', '2+', '3+'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.4rem' }}>Square Feet</p>
            <select value={filters.sqft} onChange={e => setFilters(f => ({ ...f, sqft: e.target.value }))}
              style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#1A1A1A', background: '#F5F5F5', outline: 'none' }}>
              {['Any', '1,000–1,500', '1,500–2,000', '2,000–2,500', '2,500+'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.4rem' }}>Community</p>
            <select value={filters.community} onChange={e => setFilters(f => ({ ...f, community: e.target.value }))}
              style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#1A1A1A', background: '#F5F5F5', outline: 'none' }}>
              {COMMUNITIES.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* Search button */}
        <button onClick={searchListings} disabled={loading}
          style={{ background: loading ? '#A8C8A8' : 'linear-gradient(135deg,#2D7A2D,#1a5c1a)', color: 'white', border: 'none', borderRadius: '0.875rem', padding: '0.875rem 2.5rem', fontWeight: 800, fontSize: '1.05rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.625rem', width: '100%', justifyContent: 'center' }}>
          {loading ? (
            <>⏳ AI Agent Searching Listings…</>
          ) : (
            <>🤖 Find Homes with AI Agent</>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: '#FFF3F3', border: '1px solid #FFCCCC', borderRadius: '0.875rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', color: '#CC0000', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {market && (
        <div ref={resultsRef}>
          {/* Market Summary */}
          <div style={{ background: 'linear-gradient(135deg,#2D7A2D,#1a5c1a)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>📊 AI Market Analysis</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem' }}>{market.summary}</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '0.875rem', padding: '0.75rem 1.25rem' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFD700' }}>{market.medianPrice}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>Median Price</div>
              </div>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '0.875rem', padding: '0.75rem 1.25rem' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFD700' }}>{market.avgDaysOnMarket}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>Avg. Days on Market</div>
              </div>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '0.875rem', padding: '0.75rem 1.25rem' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFD700' }}>{market.priceChange}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>YoY Price Change</div>
              </div>
            </div>
          </div>

          {/* Listings header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A' }}>
              🏘️ {market.listings.length} Listings Found
            </h2>
            <a href={buildZillowUrl(filters)} target="_blank" rel="noopener noreferrer"
              style={{ background: '#FFD700', color: '#1A1A1A', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
              See All on Zillow →
            </a>
          </div>

          {/* Listings grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {market.listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} type={filters.type} />
            ))}
          </div>
        </div>
      )}

      {/* Quick links — always visible */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '1.25rem', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>
          🔗 Search Live Listings Directly
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { name: 'Zillow', emoji: '🏠', url: buildZillowUrl(filters), desc: 'Largest listing database' },
            { name: 'Redfin', emoji: '🔴', url: buildRedfin(filters), desc: 'Real-time MLS data' },
            { name: 'Realtor.com', emoji: '🔑', url: buildRealtor(filters), desc: 'NAR-backed listings' },
            { name: 'Villages Realty', emoji: '⛳', url: 'https://www.thevillagesrealty.com', desc: 'Local specialist' },
            { name: 'Ocala Realty', emoji: '🌴', url: 'https://www.ocalarealtyworld.com/the-villages', desc: 'Sumter County expert' },
            { name: 'Facebook Marketplace', emoji: '📘', url: 'https://www.facebook.com/marketplace/the-villages-fl/propertyrentals', desc: 'FSBO & rentals' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem', background: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: '0.875rem', padding: '0.75rem 1rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{link.emoji}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.875rem', margin: 0 }}>{link.name}</p>
                <p style={{ color: '#888', fontSize: '0.72rem', margin: 0 }}>{link.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '1.25rem', padding: '0.875rem 1rem', background: 'rgba(45,122,45,0.06)', border: '1px solid rgba(45,122,45,0.2)', borderRadius: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
            💡 <strong>Tip:</strong> The Villages, FL area includes ZIP codes 32162, 32163, and 32159 (Lady Lake). All listings above are pre-filtered for the Sumter County / The Villages area. Prices typically range from low $200Ks to over $1M for premier golf course properties.
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string; cards?: any[] }

const GREEN = '#2D7A2D'
const CHIPS = [
  'What live music is on at the town squares tonight?',
  'Find Italian or Mexican restaurants at Lake Sumter Landing',
  'Which championship golf courses can the public play?',
  'Rent a 4-passenger golf cart for this weekend with delivery',
  'What community events are happening this week?',
  'Who are my Sumter County officials and when is the next election?',
  "What's in the news in The Villages today?",
  'Decorate my golf cart for the 4th of July parade',
  'Plan me a perfect Friday: dinner, live music, and an event',
]

function CardChrome({ icon, title, sub, lines, onOpen, openLabel, pageHref, pageLabel, extra }: any) {
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8e2', borderRadius: '0.75rem', padding: '0.85rem 1rem', marginTop: '0.6rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1.6rem', lineHeight: 1 }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '0.95rem' }}>{title}</div>
          {sub && <div style={{ color: GREEN, fontWeight: 600, fontSize: '0.8rem', marginTop: '0.1rem' }}>{sub}</div>}
          {lines.filter(Boolean).map((l: string, i: number) => (
            <div key={i} style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.2rem' }}>{l}</div>
          ))}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {onOpen && (
              <button onClick={onOpen} style={{ background: GREEN, color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.4rem 0.85rem', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                {openLabel || 'View Details'}
              </button>
            )}
            {extra}
            {pageHref && (
              <a href={pageHref} target="_blank" rel="noreferrer" style={{ color: '#888', fontSize: '0.72rem', textDecoration: 'none' }}>
                Open in {pageLabel} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ card, openPanel }: { card: any; openPanel: (c: any) => void }) {
  const open = () => openPanel(card)
  if (card.kind === 'show') return <CardChrome icon="🎵" title={card.performer} sub={`${card.genre} · ${card.venue}`} lines={[`${card.date} · ${card.time} · ${card.cover_charge}`, card.description]} onOpen={open} openLabel="Show Details" pageHref="/entertainment" pageLabel="Entertainment" />
  if (card.kind === 'dining') return <CardChrome icon={card.type === 'retail' ? '🛍️' : '🍽️'} title={card.name} sub={card.landing} lines={[card.hours, card.phone, card.notes]} onOpen={open} openLabel={card.type === 'retail' ? 'View Shop' : 'View Restaurant'} pageHref="/landings" pageLabel="Landings & Dining" extra={<a href={`https://maps.google.com/?q=${encodeURIComponent(card.name + ' The Villages FL')}`} target="_blank" rel="noreferrer" style={{ background: 'transparent', color: GREEN, border: `1px solid ${GREEN}44`, borderRadius: '0.5rem', padding: '0.35rem 0.75rem', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none' }}>Directions</a>} />
  if (card.kind === 'course') return <CardChrome icon="⛳" title={card.name} sub={`${card.type} · ${card.holes} holes · Par ${card.par}`} lines={[`Green fees: ${card.greenFees}${card.memberOnly ? ' · Members only' : ''}`, card.phone, card.notes]} onOpen={open} openLabel="Course Details" pageHref="/golf-courses" pageLabel="Golf Courses" />
  if (card.kind === 'rental') return <CardChrome icon="🏌️" title={card.name} sub={[card.daily && `Daily ${card.daily}`, card.weekly && `Weekly ${card.weekly}`, card.monthly && `Monthly ${card.monthly}`].filter(Boolean).join(' · ')} lines={[(card.types || []).join(', '), `${card.delivery ? 'Free delivery · ' : ''}${card.deposit || ''}`, card.phone]} onOpen={open} openLabel="View Rental Co." pageHref="/golf-carts" pageLabel="Golf Cart Rentals" extra={card.phone && <a href={`tel:${card.phone.replace(/[^0-9+]/g, '')}`} style={{ background: 'transparent', color: GREEN, border: `1px solid ${GREEN}44`, borderRadius: '0.5rem', padding: '0.35rem 0.75rem', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none' }}>Call</a>} />
  if (card.kind === 'event') return <CardChrome icon="📅" title={card.title} sub={`${card.event_date} · ${card.event_time}`} lines={[`${card.location} · ${card.cost}`, card.organizer, card.description]} onOpen={open} openLabel="RSVP / Details" pageHref="/events" pageLabel="Events" extra={<a href={`https://maps.google.com/?q=${encodeURIComponent(card.location + ' The Villages FL')}`} target="_blank" rel="noreferrer" style={{ background: 'transparent', color: GREEN, border: `1px solid ${GREEN}44`, borderRadius: '0.5rem', padding: '0.35rem 0.75rem', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none' }}>Get Directions</a>} />
  if (card.kind === 'official') return <CardChrome icon="🏛️" title={card.name} sub={card.title} lines={[`${card.party} · ${card.scope}`, card.phone]} onOpen={open} openLabel="Contact Info" pageHref="/elections" pageLabel="Elections" />
  if (card.kind === 'election') return <CardChrome icon="🗳️" title={card.name} sub={`${card.date} · ${card.type}`} lines={[card.scope, card.description]} onOpen={open} openLabel="Election Details" pageHref="/elections" pageLabel="Elections" />
  if (card.kind === 'decor') return <CardChrome icon="🎨" title={card.title} sub={card.occasion + ' theme'} lines={[card.note]} onOpen={open} openLabel="Decorating Details" pageHref="/cart-decorating" pageLabel="Cart Decorating" />
  return null
}

function SlideOverPanel({ card, onClose }: { card: any; onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  if (!card) return null
  const title = card.performer || card.name || card.title
  const fields = Object.entries(card).filter(([k, v]) => !['kind'].includes(k) && v && typeof v !== 'object')
  const panelStyle: any = isMobile
    ? { position: 'fixed', left: 0, right: 0, bottom: 0, maxHeight: '75vh', borderRadius: '1.25rem 1.25rem 0 0', animation: 'vc-slide-up 0.25s ease' }
    : { position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(430px, 92vw)', animation: 'vc-slide-in 0.25s ease' }
  return (
    <>
      <style>{`@keyframes vc-slide-in{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes vc-slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 90 }} />
      <div style={{ ...panelStyle, background: 'white', zIndex: 95, boxShadow: '0 0 40px rgba(0,0,0,0.3)', overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 900, color: '#1A1A1A', fontSize: '1.2rem', margin: 0 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close panel" style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 34, height: 34, fontSize: '1rem', cursor: 'pointer', fontWeight: 700 }}>✕</button>
        </div>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {fields.map(([k, v]) => (
            <div key={k} style={{ background: '#f7faf7', border: '1px solid #e2e8e2', borderRadius: '0.6rem', padding: '0.6rem 0.85rem' }}>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', fontWeight: 700 }}>{k.replace(/_/g, ' ')}</div>
              <div style={{ fontSize: '0.9rem', color: '#222', marginTop: '0.15rem' }}>{String(v)}</div>
            </div>
          ))}
        </div>
        {card.website && <a href={card.website} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', background: GREEN, color: 'white', padding: '0.7rem', borderRadius: '0.6rem', fontWeight: 700, marginTop: '1rem', textDecoration: 'none' }}>Visit Website ↗</a>}
      </div>
    </>
  )
}

export default function VillagerAIPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [searchBar, setSearchBar] = useState('')
  const [loading, setLoading] = useState(false)
  const [panelCard, setPanelCard] = useState<any>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const msgCount = useRef(0)
  msgCount.current = messages.length

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (msgCount.current === 0) return
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (a.target === '_blank' || !href.startsWith('/') || href.startsWith('/villager-ai')) return
      if (!confirm('Leave your VillagerConnect AI conversation? Your chat will be lost.')) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  async function send(content: string) {
    const trimmed = content.trim()
    if (!trimmed || loading) return
    const next: Msg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setSearchBar('')
    setLoading(true)
    try {
      const r = await fetch('/api/villager-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await r.json()
      if (!r.ok) throw new Error(data.error || 'Request failed')
      setMessages(m => [...m, { role: 'assistant', content: data.text, cards: data.cards }])
    } catch (e: any) {
      setMessages(m => [...m, { role: 'assistant', content: `Sorry, something went wrong: ${e.message}. Please try again.` }])
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '0.9rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', margin: 0 }}>
          🤖 VillagerConnect <span style={{ color: GREEN }}>AI</span>
        </h1>
        <p style={{ color: '#444', fontWeight: 600, margin: '0.25rem 0 0' }}>Your entire Villages guide. One conversation.</p>
        <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>Ask anything — I search the whole platform in real time</p>
        <div style={{ display: 'inline-block', background: `${GREEN}14`, border: `1px solid ${GREEN}44`, color: GREEN, fontWeight: 700, fontSize: '0.72rem', borderRadius: '99px', padding: '0.25rem 0.75rem', marginTop: '0.5rem', letterSpacing: '0.3px' }}>
          AI-Powered · Villages Concierge · Live Platform Search
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); send(searchBar) }} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input value={searchBar} onChange={e => setSearchBar(e.target.value)} placeholder="🔍 Search shows, dining, golf, rentals, events, elections..."
          style={{ flex: 1, border: '1px solid #d8e0d8', borderRadius: '0.65rem', padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', background: 'white' }} />
        <button type="submit" style={{ background: GREEN, color: 'white', border: 'none', borderRadius: '0.65rem', padding: '0.7rem 1.3rem', fontWeight: 700, cursor: 'pointer' }}>Search</button>
      </form>

      <div style={{ background: '#f4f8f4', border: '1px solid #e2e8e2', borderRadius: '1rem', padding: '1rem', minHeight: '380px' }}>
        {messages.length === 0 && (
          <div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0 0.75rem' }}>Try one of these — every result comes back right here in the chat:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CHIPS.map(c => (
                <button key={c} onClick={() => send(c)} style={{ background: 'white', border: `1px solid ${GREEN}44`, color: '#2a4a2a', borderRadius: '99px', padding: '0.5rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '0.85rem' }}>
            <div style={{ maxWidth: '88%', background: m.role === 'user' ? GREEN : 'white', color: m.role === 'user' ? 'white' : '#222', borderRadius: m.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem', padding: '0.8rem 1rem', border: m.role === 'user' ? 'none' : '1px solid #e2e8e2', fontSize: '0.92rem', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
              {m.content}
              {m.cards && m.cards.length > 0 && (
                <div>
                  {m.cards.map((c, j) => <ResultCard key={j} card={c} openPanel={setPanelCard} />)}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: '#777', fontSize: '0.85rem', padding: '0.5rem' }}>🔎 Searching the platform…</div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={e => { e.preventDefault(); send(input) }} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask the VillagerConnect AI anything..."
          style={{ flex: 1, border: '1px solid #d8e0d8', borderRadius: '0.65rem', padding: '0.8rem 1rem', fontSize: '0.95rem', outline: 'none', background: 'white' }} />
        <button type="submit" disabled={loading} style={{ background: loading ? '#9bbd9b' : GREEN, color: 'white', border: 'none', borderRadius: '0.65rem', padding: '0.8rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
          {loading ? '…' : 'Send'}
        </button>
      </form>

      <p style={{ color: '#999', fontSize: '0.72rem', marginTop: '0.75rem', textAlign: 'center' }}>
        VillagerConnect AI can make mistakes — verify times, prices, and schedules with the venue. Not affiliated with The Villages developer.
      </p>

      {panelCard && <SlideOverPanel card={panelCard} onClose={() => setPanelCard(null)} />}
    </div>
  )
}

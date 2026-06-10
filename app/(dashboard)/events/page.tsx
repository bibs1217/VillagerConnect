'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface VillagerEvent {
  id: string
  title: string
  description: string
  event_date: string
  event_time: string
  location: string
  category: string
  organizer: string
  cost: string
  rsvp_url?: string
  max_attendees?: number
}

const CATEGORIES = ['All', 'Social', 'Sports', 'Arts & Culture', 'Health & Wellness', 'Education', 'Civic', 'Holiday', 'Club']

const CATEGORY_COLORS: Record<string, string> = {
  Social: '#2D7A2D', Sports: '#1a5c9e', 'Arts & Culture': '#8B1a8B',
  'Health & Wellness': '#1a7a4a', Education: '#8B4513', Civic: '#1a1a6e',
  Holiday: '#CC0000', Club: '#6B6B00',
}

const SEED_EVENTS: VillagerEvent[] = [
  { id: '1', title: 'Spanish Springs Farmers Market', description: 'Fresh local produce, artisan crafts, baked goods, and live music every Saturday morning at Spanish Springs Town Square.', event_date: '2026-06-14', event_time: '8:00 AM – 1:00 PM', location: 'Spanish Springs Town Square', category: 'Social', organizer: 'Villages Farmers Market Association', cost: 'Free admission', rsvp_url: '' },
  { id: '2', title: 'Villages Pickleball Tournament', description: 'Semi-annual pickleball tournament open to all skill levels. Divisions for beginners through advanced. Prizes for top finishers.', event_date: '2026-06-20', event_time: '8:00 AM – 5:00 PM', location: 'Mulberry Recreation Center', category: 'Sports', organizer: 'Villages Pickleball Club', cost: '$25 entry fee', max_attendees: 128 },
  { id: '3', title: 'Community Blood Drive', description: 'Biannual community blood drive hosted by Florida Blood Services. Appointments preferred but walk-ins welcome. Light refreshments provided.', event_date: '2026-06-18', event_time: '9:00 AM – 3:00 PM', location: 'Savannah Center', category: 'Civic', organizer: 'Florida Blood Services', cost: 'Free', max_attendees: 200 },
  { id: '4', title: 'Villages Symphony Orchestra Concert', description: 'The Villages Symphony Orchestra presents their summer showcase featuring Beethoven\'s 9th Symphony and crowd-favorite encores.', event_date: '2026-06-21', event_time: '7:30 PM', location: 'Sharon L. Morse Performing Arts Center', category: 'Arts & Culture', organizer: 'Villages Symphony Orchestra', cost: '$15–$35', max_attendees: 1200 },
  { id: '5', title: 'Senior Health & Wellness Fair', description: 'Annual health fair with free screenings for blood pressure, cholesterol, vision, and hearing. Medical providers, fitness demonstrations, and nutrition information.', event_date: '2026-06-25', event_time: '9:00 AM – 2:00 PM', location: 'Lake Sumter Landing', category: 'Health & Wellness', organizer: 'The Villages Health', cost: 'Free', max_attendees: 500 },
  { id: '6', title: 'Golf Cart Parade & Show', description: 'Annual decorated golf cart parade through Lake Sumter Landing followed by a judged cart show. Categories for best decorated, most creative, and best classic cart.', event_date: '2026-07-04', event_time: '10:00 AM – 2:00 PM', location: 'Lake Sumter Landing', category: 'Holiday', organizer: 'Villages Recreation Department', cost: 'Free', max_attendees: 2000 },
  { id: '7', title: "Fourth of July Celebration & Fireworks", description: 'The Villages\' biggest annual celebration with live entertainment, food vendors, and a spectacular fireworks display over Lake Sumter.', event_date: '2026-07-04', event_time: '5:00 PM – 10:00 PM', location: 'Lake Sumter Landing', category: 'Holiday', organizer: 'The Villages Developer', cost: 'Free', max_attendees: 10000 },
  { id: '8', title: 'Newcomers Welcome Reception', description: 'Monthly welcome reception for new Villages residents. Meet neighbors, learn about clubs and activities, and get essential tips for new residents.', event_date: '2026-06-16', event_time: '2:00 PM – 5:00 PM', location: 'Savannah Center', category: 'Social', organizer: 'Villages Newcomers Club', cost: 'Free', max_attendees: 300 },
  { id: '9', title: 'Environmental & Nature Walk', description: 'Guided nature walk through the Reedy Creek Nature Trail. Learn about Florida native plants, birds, and wildlife. Led by master naturalists.', event_date: '2026-06-22', event_time: '7:30 AM – 10:00 AM', location: 'Reedy Creek Trail', category: 'Health & Wellness', organizer: 'Villages Nature Club', cost: 'Free', max_attendees: 30 },
  { id: '10', title: 'Lifelong Learning Institute — Tech Help for Seniors', description: 'Free technology help session covering smartphones, tablets, social media, and internet safety. Volunteer helpers from local college available.', event_date: '2026-06-17', event_time: '1:00 PM – 3:30 PM', location: 'Laurel Manor Recreation Center', category: 'Education', organizer: 'Villages Lifelong Learning Institute', cost: 'Free', max_attendees: 40 },
  { id: '11', title: 'Water Aerobics Championship', description: 'Annual water aerobics competition featuring teams from across The Villages\' recreation centers. Spectators welcome and encouraged!', event_date: '2026-06-27', event_time: '9:00 AM – 12:00 PM', location: 'Mulberry Recreation Center Pool', category: 'Sports', organizer: 'Villages Aquatics Club', cost: 'Free to watch', max_attendees: 200 },
  { id: '12', title: 'Villages Art Show & Sale', description: 'Quarterly juried art show featuring paintings, sculpture, photography, and mixed media from Villages-area artists. Work available for purchase.', event_date: '2026-06-28', event_time: '10:00 AM – 4:00 PM', location: 'Colony Cottage Recreation Center', category: 'Arts & Culture', organizer: 'Villages Art Association', cost: 'Free admission', max_attendees: 300 },
  { id: '13', title: 'Town Hall — Sumter County Commissioners', description: 'Open town hall meeting with Sumter County commissioners. Residents can ask questions about county services, development, and local issues.', event_date: '2026-06-23', event_time: '6:30 PM – 8:30 PM', location: 'Sumter County Government Center', category: 'Civic', organizer: 'Sumter County Board of Commissioners', cost: 'Free', max_attendees: 200 },
  { id: '14', title: 'Line Dancing Social & Lessons', description: 'Weekly line dancing event with lessons for beginners and open dancing for experienced dancers. All welcome, no partner needed!', event_date: '2026-06-13', event_time: '7:00 PM – 9:00 PM', location: 'Brownwood Paddock Square', category: 'Social', organizer: 'Villages Line Dance Club', cost: 'Free', max_attendees: 200 },
  { id: '15', title: 'Villages Golf Scramble Tournament', description: 'Friendly 18-hole scramble golf tournament open to all residents. Teams of four, prizes for first, second, and third place. Breakfast and lunch included.', event_date: '2026-06-19', event_time: '7:30 AM Shotgun Start', location: 'Evans Prairie Country Club', category: 'Sports', organizer: 'Villages Golf Association', cost: '$45 per player', max_attendees: 144 },
]

export default function EventsPage() {
  const [events, setEvents] = useState<VillagerEvent[]>(SEED_EVENTS)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = events.filter(e => {
    const matchCat = category === 'All' || e.category === category
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const sorted = [...filtered].sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>📅 Community Events</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Upcoming events, activities, and community gatherings in The Villages</p>
        <div style={{ marginTop: '1rem' }}>
          <a href="https://www.thevillages.com/recreation/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#2D7A2D', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600, marginRight: '0.75rem' }}>
            Official Recreation Calendar ↗
          </a>
          <a href="https://www.thevillages.com/entertainment/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#1A1A1A', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
            Entertainment Calendar ↗
          </a>
        </div>
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search events by title, location, or description…"
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

      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{sorted.length} event{sorted.length !== 1 ? 's' : ''}</p>

      {/* Event Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sorted.map(e => {
          const d = new Date(e.event_date + 'T12:00:00')
          return (
            <div key={e.id} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', overflow: 'hidden', display: 'flex' }}>
              {/* Date sidebar */}
              <div style={{ background: CATEGORY_COLORS[e.category] ?? '#2D7A2D', color: 'white', padding: '1.25rem', minWidth: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{d.getDate()}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.25rem', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', lineHeight: 1.3 }}>{e.title}</h3>
                  <span style={{ background: `${CATEGORY_COLORS[e.category] ?? '#2D7A2D'}18`, color: CATEGORY_COLORS[e.category] ?? '#2D7A2D', borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap', border: `1px solid ${CATEGORY_COLORS[e.category] ?? '#2D7A2D'}33` }}>
                    {e.category}
                  </span>
                </div>

                <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.875rem' }}>{e.description}</p>

                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#666', marginBottom: '0.875rem' }}>
                  <span>🕐 {e.event_time}</span>
                  <span>📍 {e.location}</span>
                  <span style={{ color: e.cost === 'Free' || e.cost === 'Free admission' ? '#2D7A2D' : '#8B4513', fontWeight: 600 }}>
                    💰 {e.cost}
                  </span>
                  {e.max_attendees && <span>👥 Max {e.max_attendees.toLocaleString()}</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>Organized by: {e.organizer}</span>
                  {e.rsvp_url && (
                    <a href={e.rsvp_url} target="_blank" rel="noopener noreferrer"
                      style={{ background: '#2D7A2D', color: 'white', padding: '0.35rem 1rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>
                      RSVP →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {sorted.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
            <p>No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

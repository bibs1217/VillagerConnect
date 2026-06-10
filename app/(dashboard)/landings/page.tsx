'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

interface Business { name: string; type: 'restaurant' | 'retail'; hours?: string; phone?: string; notes?: string }
interface Landing { name: string; icon: string; description: string; entertainment: string; businesses: Business[] }

const LANDINGS: Landing[] = [
  {
    name: 'Lake Sumter Landing',
    icon: '🌊',
    description: 'The premier waterfront town square with lakeside dining, shops, and nightly entertainment on the clock tower square.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission',
    businesses: [
      { name: "Cody's Original Roadhouse", type: 'restaurant', hours: 'Sun–Thu 11am–10pm, Fri–Sat 11am–11pm', phone: '(352) 259-5075', notes: 'American bar & grill, steaks, ribs, seafood' },
      { name: 'Markers 51', type: 'restaurant', hours: 'Daily 11am–10pm', phone: '(352) 430-0088', notes: 'Upscale lakeside dining, seafood, and cocktails' },
      { name: "Maguire's Hill 16 Irish Pub", type: 'restaurant', hours: 'Daily 11am–11pm', phone: '(352) 259-8006', notes: 'Irish pub fare, live music, draft beer and whiskey' },
      { name: 'Chula Vista Mexican', type: 'restaurant', hours: 'Daily 11am–9pm', notes: 'Authentic Mexican cuisine and margaritas' },
      { name: 'Bistro 101', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Breakfast, lunch and dinner with waterfront views' },
      { name: 'Panera Bread', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Bakery café, sandwiches, soups, salads' },
      { name: 'Starbucks', type: 'restaurant', hours: 'Daily 6am–8pm', notes: 'Coffee, espresso drinks, pastries, sandwiches' },
      { name: 'Publix Super Market', type: 'retail', hours: 'Daily 7am–10pm', phone: '(352) 259-8060', notes: 'Full-service grocery store' },
      { name: 'CVS Pharmacy', type: 'retail', hours: 'Mon–Fri 8am–9pm, Sat–Sun 9am–7pm', notes: 'Pharmacy, health, beauty, household needs' },
      { name: 'Vera Bradley', type: 'retail', notes: 'Bags, luggage, accessories, and gifts' },
      { name: 'Chico\'s', type: 'retail', notes: "Women's clothing and accessories" },
      { name: 'Coldwater Creek', type: 'retail', notes: "Women's fashion and resort wear" },
    ]
  },
  {
    name: 'Brownwood Paddock Square',
    icon: '🏇',
    description: 'A paddock-themed town square with country charm, casual dining, and nightly entertainment under the stars.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission · Country and Western themed square',
    businesses: [
      { name: 'Glory Days Grill', type: 'restaurant', hours: 'Daily 11am–11pm', phone: '(352) 753-7378', notes: 'Sports bar, American comfort food, burgers, wings' },
      { name: "TooJay's Original Gourmet Deli", type: 'restaurant', hours: 'Daily 8am–9pm', phone: '(352) 259-8060', notes: 'New York-style deli, breakfast all day, sandwiches' },
      { name: 'First Watch', type: 'restaurant', hours: 'Daily 7am–2:30pm', notes: 'Daytime café, breakfast and brunch specialists' },
      { name: 'Perkins Restaurant', type: 'restaurant', hours: 'Daily 6am–10pm', notes: 'Family restaurant, breakfast, lunch, dinner, bakery' },
      { name: 'Broken Egg Café', type: 'restaurant', hours: 'Daily 7am–2pm', notes: 'Fresh breakfast and brunch, egg dishes, benedicts' },
      { name: 'Nothing Bundt Cakes', type: 'restaurant', hours: 'Mon–Sat 10am–6pm, Sun 11am–5pm', notes: 'Specialty bundt cakes and bundtlets, gift shop' },
      { name: 'Bealls Florida', type: 'retail', hours: 'Mon–Sat 10am–9pm, Sun 11am–7pm', notes: 'Florida-based department store, clothing, home goods' },
      { name: 'Hallmark Gold Crown', type: 'retail', notes: 'Greeting cards, gifts, ornaments, seasonal items' },
      { name: 'Talbot\'s', type: 'retail', notes: "Women's classic clothing and accessories" },
      { name: 'Kirkland\'s Home', type: 'retail', notes: 'Home décor, furniture, art, gifts' },
    ]
  },
  {
    name: 'Spanish Springs Town Square',
    icon: '🏰',
    description: 'The original Villages town square with Spanish architecture, a mix of dining, retail, and free nightly entertainment.',
    entertainment: 'Nightly live music 7:00 PM – 10:00 PM · Free admission · Historic original square',
    businesses: [
      { name: "Beef 'O' Brady's", type: 'restaurant', hours: 'Daily 11am–midnight', notes: 'Family sports pub, wings, burgers, sandwiches' },
      { name: 'El Conquistador Mexican', type: 'restaurant', hours: 'Daily 11am–10pm', notes: 'Traditional Mexican cuisine, margaritas, fajitas' },
      { name: "Frogger's Grill and Bar", type: 'restaurant', hours: 'Daily 11am–11pm', notes: 'Casual grill, seafood, burgers, outdoor patio' },
      { name: 'Bonefish Grill', type: 'restaurant', hours: 'Mon–Thu 4pm–10pm, Fri 4pm–11pm, Sat 11am–11pm, Sun 11am–9pm', phone: '(352) 775-5552', notes: 'Upscale casual seafood, wood-grilled fish, cocktails' },
      { name: 'Panera Bread', type: 'restaurant', hours: 'Daily 7am–9pm', notes: 'Bakery café, soups, salads, sandwiches' },
      { name: 'CVS Pharmacy', type: 'retail', hours: 'Daily 8am–10pm', notes: 'Pharmacy, health and beauty, convenience' },
      { name: 'GNC Nutrition', type: 'retail', notes: 'Vitamins, supplements, health and fitness products' },
      { name: 'Coldwater Creek', type: 'retail', notes: 'Resort and casual wear for active lifestyles' },
      { name: 'The Villages Hat Company', type: 'retail', notes: 'Custom hats, Villages apparel, accessories' },
    ]
  },
  {
    name: 'Colony Plaza',
    icon: '🏬',
    description: 'A major retail center featuring national chains and restaurants serving the southern Villages communities.',
    entertainment: 'Convenient shopping plaza — no entertainment square',
    businesses: [
      { name: 'Olive Garden Italian Restaurant', type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–9pm', phone: '(352) 259-7676', notes: 'Italian-American cuisine, pasta, seafood, unlimited breadsticks' },
      { name: 'Red Lobster', type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–9pm', notes: 'Seafood chain restaurant, lobster, shrimp, fish' },
      { name: "Chili's Grill & Bar", type: 'restaurant', hours: 'Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–10pm', notes: 'American casual dining, burgers, Tex-Mex, ribs' },
      { name: "McDonald's", type: 'restaurant', hours: 'Daily 5am–midnight', notes: 'Fast food, burgers, breakfast, McCafé' },
      { name: 'Subway', type: 'restaurant', hours: 'Daily 8am–9pm', notes: 'Fresh-made subs, salads, wraps' },
      { name: 'Target', type: 'retail', hours: 'Mon–Sat 8am–10pm, Sun 8am–9pm', notes: 'General merchandise, clothing, groceries, pharmacy' },
      { name: "Marshall's", type: 'retail', hours: 'Mon–Sat 9:30am–9:30pm, Sun 10am–9pm', notes: 'Off-price clothing, shoes, home goods, gifts' },
      { name: 'Tuesday Morning', type: 'retail', notes: 'Off-price home décor, gifts, seasonal items' },
    ]
  },
  {
    name: 'Pinellas Plaza',
    icon: '🛒',
    description: 'A convenient retail center serving northern Villages residents with everyday needs.',
    entertainment: 'Shopping plaza — no entertainment square',
    businesses: [
      { name: 'Walmart Supercenter', type: 'retail', hours: 'Open 24 hours', phone: '(352) 430-2960', notes: 'Full supercenter, groceries, pharmacy, electronics, clothing' },
      { name: 'Jo-Ann Fabric and Craft', type: 'retail', hours: 'Mon–Sat 9am–9pm, Sun 10am–6pm', notes: 'Fabric, sewing, crafts, yarn, seasonal décor' },
      { name: 'Dollar Tree', type: 'retail', hours: 'Mon–Sat 8am–9pm, Sun 9am–8pm', notes: 'Dollar store, housewares, party supplies, snacks' },
      { name: 'Five Below', type: 'retail', notes: 'Discount retail, gifts, accessories, seasonal' },
      { name: 'Wendy\'s', type: 'restaurant', hours: 'Daily 6:30am–midnight', notes: 'Fast food, burgers, Frosty, breakfast' },
      { name: 'Firehouse Subs', type: 'restaurant', hours: 'Daily 10:30am–9pm', notes: 'Gourmet sub sandwiches, soups, salads' },
    ]
  },
  {
    name: 'Sumter Landing Market',
    icon: '🌿',
    description: 'A market-style landing with local shops and services serving the Lake Sumter area.',
    entertainment: 'Market-style landing — local character and boutique shops',
    businesses: [
      { name: 'Winn-Dixie', type: 'retail', hours: 'Daily 7am–11pm', notes: 'Full-service grocery store, pharmacy, deli' },
      { name: 'Bealls Outlet', type: 'retail', notes: 'Off-price clothing, accessories, shoes, home goods' },
      { name: 'Planet Fitness', type: 'retail', hours: 'Open 24 hours', notes: 'Fitness center, cardio and strength equipment' },
      { name: 'China Buffet Palace', type: 'restaurant', hours: 'Daily 11am–9:30pm', notes: 'Chinese and Asian buffet, sushi, hibachi' },
      { name: "Domino's Pizza", type: 'restaurant', hours: 'Daily 10am–midnight', notes: 'Pizza delivery and carry-out' },
      { name: 'Tijuana Flats', type: 'restaurant', hours: 'Daily 11am–9pm', notes: 'Tex-Mex, burritos, tacos, hot sauce bar' },
    ]
  },
]

export default function LandingsPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<'all' | 'restaurant' | 'retail'>('all')

  const toggle = (name: string) => setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])

  const matchesSearch = (l: Landing) => {
    if (!search) return true
    const s = search.toLowerCase()
    if (l.name.toLowerCase().includes(s)) return true
    return l.businesses.some(b => b.name.toLowerCase().includes(s) || (b.notes ?? '').toLowerCase().includes(s))
  }

  const filteredLandings = LANDINGS.filter(matchesSearch)

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>🏪 Landings & Dining</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Complete directory of all Villages town squares, landings, and their restaurants and retailers</p>
      </div>

      {/* Search */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search restaurants, retailers, or landings…"
          style={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem', outline: 'none', background: '#F5F5F5' }} />
        {search && <button onClick={() => setSearch('')} style={{ background: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '0.5rem', padding: '0.75rem 1rem', cursor: 'pointer', color: '#666' }}>Clear</button>}
      </div>

      {/* Type filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['all', 'restaurant', 'retail'] as const).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            style={{ padding: '0.45rem 1.25rem', borderRadius: '9999px', border: `2px solid ${typeFilter === t ? '#2D7A2D' : '#E0E0E0'}`, background: typeFilter === t ? '#2D7A2D' : '#FFFFFF', color: typeFilter === t ? 'white' : '#444', fontWeight: typeFilter === t ? 700 : 400, fontSize: '0.875rem', cursor: 'pointer' }}>
            {t === 'all' ? '🏪 All' : t === 'restaurant' ? '🍽️ Restaurants Only' : '🛍️ Retail Only'}
          </button>
        ))}
      </div>

      {/* Landings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredLandings.map(l => {
          const isOpen = expanded.includes(l.name)
          const displayBiz = l.businesses.filter(b => typeFilter === 'all' || b.type === typeFilter)
          const matchedBiz = search ? displayBiz.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || (b.notes ?? '').toLowerCase().includes(search.toLowerCase())) : displayBiz

          return (
            <div key={l.name} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '1rem', overflow: 'hidden' }}>
              {/* Header */}
              <button onClick={() => toggle(l.name)} style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: isOpen ? '1px solid #E0E0E0' : 'none' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '2.25rem', flexShrink: 0 }}>{l.icon}</span>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.3rem' }}>{l.name}</h2>
                    <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.4rem', maxWidth: '600px' }}>{l.description}</p>
                    <p style={{ color: '#2D7A2D', fontSize: '0.8rem', fontWeight: 600 }}>🎵 {l.entertainment}</p>
                    <p style={{ color: '#888', fontSize: '0.78rem', marginTop: '0.3rem' }}>{l.businesses.filter(b => b.type === 'restaurant').length} restaurants · {l.businesses.filter(b => b.type === 'retail').length} retail shops</p>
                  </div>
                </div>
                <span style={{ fontSize: '1.25rem', color: '#2D7A2D', flexShrink: 0, marginTop: '0.25rem' }}>{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Businesses */}
              {isOpen && (
                <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
                  {(matchedBiz.length > 0 ? matchedBiz : displayBiz).map((b, i) => (
                    <div key={i} style={{ background: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '0.625rem', padding: '0.875rem', borderLeft: `3px solid ${b.type === 'restaurant' ? '#2D7A2D' : '#FFD700'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A', lineHeight: 1.3 }}>{b.name}</p>
                        <span style={{ background: b.type === 'restaurant' ? 'rgba(45,122,45,0.12)' : 'rgba(255,215,0,0.2)', color: b.type === 'restaurant' ? '#2D7A2D' : '#8B6914', borderRadius: '9999px', padding: '0.1rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '0.4rem' }}>
                          {b.type === 'restaurant' ? '🍽️ Food' : '🛍️ Shop'}
                        </span>
                      </div>
                      {b.notes && <p style={{ color: '#666', fontSize: '0.78rem', lineHeight: 1.4, marginBottom: '0.3rem' }}>{b.notes}</p>}
                      {b.hours && <p style={{ color: '#888', fontSize: '0.72rem' }}>⏰ {b.hours}</p>}
                      {b.phone && <p style={{ color: '#888', fontSize: '0.72rem' }}>📞 {b.phone}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

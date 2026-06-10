'use client'
export const dynamic = 'force-dynamic'

interface RentalCompany {
  name: string
  phone: string
  website?: string
  hourly?: string
  daily: string
  weekly: string
  monthly?: string
  types: string[]
  delivery: boolean
  deposit: string
  notes: string
  address?: string
}

const COMPANIES: RentalCompany[] = [
  {
    name: 'The Villages Golf Cart Rentals (Official)',
    phone: '(352) 753-4300',
    website: 'https://www.thevillages.com/golf-carts/',
    daily: '$55–$75',
    weekly: '$245–$350',
    monthly: '$650–$950',
    types: ['2-passenger standard', '4-passenger', 'Lifted street legal', 'LSV (Low Speed Vehicle)'],
    delivery: true,
    deposit: '$200 credit card hold',
    notes: 'The official Villages cart rental program. All carts are properly insured and meet Villages standards. Available to guests of residents.',
    address: 'Multiple pickup locations throughout The Villages',
  },
  {
    name: 'Gatehouse Golf Carts',
    phone: '(352) 430-0094',
    daily: '$65',
    weekly: '$280',
    monthly: '$700',
    types: ['2-passenger', '4-passenger', 'Street legal LSV', 'Custom lifted carts'],
    delivery: true,
    deposit: '$150 security deposit',
    notes: 'Local family-owned rental company with free delivery within The Villages. Excellent customer service and well-maintained fleet.',
    address: 'The Villages, FL',
  },
  {
    name: 'Villages Golf Cart & Service',
    phone: '(352) 259-4060',
    daily: '$60',
    weekly: '$260',
    types: ['Standard 2-passenger', '4-passenger', 'Lifted 4-passenger', 'Custom builds'],
    delivery: true,
    deposit: '$100 security deposit',
    notes: 'Rents and sells golf carts. Also offers service, repair, and custom modifications for cart owners.',
    address: 'Lady Lake, FL',
  },
  {
    name: 'Sun Country Golf Cars',
    phone: '(352) 748-2222',
    daily: '$55',
    weekly: '$240',
    monthly: '$625',
    types: ['2-passenger', '4-passenger', '6-passenger', 'Electric and gas'],
    delivery: true,
    deposit: '$200 credit card authorization',
    notes: 'Serving The Villages and surrounding areas. Large fleet with electric and gas options. Weekly and monthly discounts available.',
    address: 'Leesburg, FL',
  },
  {
    name: 'Villages Elite Golf Carts',
    phone: '(352) 391-8400',
    hourly: '$25/hr',
    daily: '$85',
    weekly: '$325',
    types: ['Luxury custom carts', 'LED-lit carts', 'Street legal LSV', 'Party carts (6-passenger)'],
    delivery: true,
    deposit: '$250 security deposit',
    notes: 'Premium cart rentals with luxury features including LED lighting, premium sound systems, and custom upholstery. Perfect for special occasions.',
    address: 'The Villages, FL',
  },
]

const RULES = [
  { title: 'Villages Cart Path Access', desc: 'Golf carts must be registered with The Villages to use the cart path system. Rental carts include a temporary cart path permit.' },
  { title: 'Speed Limits', desc: 'Golf carts are limited to 20 mph on cart paths and roads. LSV (Low Speed Vehicles) can travel on roads with speed limits up to 35 mph.' },
  { title: 'Required Equipment', desc: 'Carts must have headlights, taillights, turn signals, seat belts, mirrors, and a windshield to be street legal in The Villages.' },
  { title: 'Minimum Age', desc: 'Drivers must be at least 14 years old to operate a golf cart. Those under 18 should be accompanied by an adult on public roads.' },
  { title: 'Insurance', desc: 'Rental carts typically include basic liability coverage. Consider purchasing supplemental insurance for peace of mind.' },
  { title: 'Alcohol Policy', desc: 'Driving a golf cart under the influence of alcohol is illegal in Florida and subject to the same DUI laws as driving a car.' },
]

export default function GolfCartsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>🏌️ Golf Cart Rentals</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Rent a golf cart to explore The Villages' 100+ miles of cart paths and neighborhoods</p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="https://www.thevillages.com/golf-carts/" target="_blank" rel="noopener noreferrer"
            style={{ background: '#2D7A2D', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Official Cart Info ↗
          </a>
        </div>
      </div>

      {/* Info Banner */}
      <div style={{ background: 'linear-gradient(135deg, #2D7A2D, #1a5c1a)', borderRadius: '1rem', padding: '1.75rem', marginBottom: '2rem', color: 'white', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏌️ Golf Cart Capital of the World</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.65 }}>
            The Villages has over 60,000 registered golf carts and more than 100 miles of dedicated cart paths. It is the only community in America where you can travel entirely by golf cart.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['60,000+', 'Registered Carts'], ['100+', 'Miles of Paths'], ['$55–$85', 'Daily Rental'], ['Delivery', 'Available']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.875rem 1.25rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFD700' }}>{v}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Companies */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.25rem' }}>Rental Companies</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {COMPANIES.map((c, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A1A1A', marginBottom: '0.3rem' }}>{c.name}</h3>
                {c.address && <p style={{ color: '#888', fontSize: '0.8rem' }}>📍 {c.address}</p>}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a href={`tel:${c.phone}`} style={{ background: '#2D7A2D', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>📞 {c.phone}</a>
                {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ background: '#F5F5F5', color: '#1A1A1A', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', border: '1px solid #E0E0E0' }}>Website ↗</a>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {c.hourly && <div style={{ background: '#F5F5F5', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Hourly</div>
                <div style={{ fontWeight: 800, color: '#2D7A2D', fontSize: '1.1rem' }}>{c.hourly}</div>
              </div>}
              <div style={{ background: '#F5F5F5', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Daily</div>
                <div style={{ fontWeight: 800, color: '#2D7A2D', fontSize: '1.1rem' }}>{c.daily}</div>
              </div>
              <div style={{ background: '#F5F5F5', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Weekly</div>
                <div style={{ fontWeight: 800, color: '#2D7A2D', fontSize: '1.1rem' }}>{c.weekly}</div>
              </div>
              {c.monthly && <div style={{ background: '#F5F5F5', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Monthly</div>
                <div style={{ fontWeight: 800, color: '#2D7A2D', fontSize: '1.1rem' }}>{c.monthly}</div>
              </div>}
              <div style={{ background: '#F5F5F5', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Delivery</div>
                <div style={{ fontWeight: 800, color: c.delivery ? '#2D7A2D' : '#CC0000', fontSize: '1rem' }}>{c.delivery ? '✓ Yes' : '✗ No'}</div>
              </div>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '0.35rem', fontWeight: 600 }}>CART TYPES AVAILABLE</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {c.types.map((t, ti) => (
                  <span key={ti} style={{ background: 'rgba(45,122,45,0.08)', border: '1px solid rgba(45,122,45,0.2)', color: '#2D7A2D', borderRadius: '9999px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>

            <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{c.notes}</p>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>💳 Deposit: {c.deposit}</p>
          </div>
        ))}
      </div>

      {/* Rules & Regulations */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.25rem' }}>Golf Cart Rules in The Villages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {RULES.map((r, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.75rem', padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2D7A2D', marginBottom: '0.5rem' }}>⚠️ {r.title}</h3>
            <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.6 }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

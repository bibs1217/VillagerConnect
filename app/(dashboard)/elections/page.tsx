'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

const OFFICIALS = [
  { name: 'Greg Steube', title: 'U.S. Representative, FL-17', party: 'Republican', phone: '(941) 747-9081', website: 'https://steube.house.gov', scope: 'Federal' },
  { name: 'Marco Rubio', title: 'U.S. Senator, Florida', party: 'Republican', phone: '(407) 254-2573', website: 'https://www.rubio.senate.gov', scope: 'Federal' },
  { name: 'Rick Scott', title: 'U.S. Senator, Florida', party: 'Republican', phone: '(202) 224-5274', website: 'https://www.rickscott.senate.gov', scope: 'Federal' },
  { name: 'Ron DeSantis', title: 'Governor of Florida', party: 'Republican', phone: '(850) 488-7146', website: 'https://www.flgov.com', scope: 'State' },
  { name: 'Wilton Simpson', title: 'Florida Commissioner of Agriculture', party: 'Republican', phone: '(850) 617-7400', website: 'https://www.fdacs.gov', scope: 'State' },
  { name: 'Danny Burgess', title: 'Florida Senate, District 20', party: 'Republican', phone: '(850) 487-5020', website: 'https://www.flsenate.gov', scope: 'State' },
  { name: 'Garland Garrett', title: 'Sumter County Commission Chair', party: 'Republican', phone: '(352) 689-4400', website: 'https://www.sumtercountyfl.gov', scope: 'Local' },
  { name: 'Gloria R. Edwards', title: 'Sumter County Supervisor of Elections', party: 'Nonpartisan', phone: '(352) 689-4615', website: 'https://www.sumterelections.org', scope: 'Local' },
]

const UPCOMING_ELECTIONS = [
  { name: 'Florida Primary Election', date: 'August 2026', type: 'Primary', scope: 'State/Local', description: 'Party primaries for state legislative seats, county commission, and local offices.' },
  { name: 'General Election 2026', date: 'November 3, 2026', type: 'General', scope: 'Federal/State/Local', description: 'U.S. Senate, U.S. House, Florida House and Senate seats, county commission, and local referendums.' },
  { name: 'Sumter County School Board Election', date: 'November 3, 2026', type: 'General', scope: 'Local', description: 'School board seats for The Villages Charter School and Sumter County District Schools.' },
]

const VOTER_INFO = [
  { title: 'Register to Vote in Sumter County', desc: 'New residents can register at the Sumter County Supervisor of Elections office or online through the Florida Division of Elections website. Registration must be completed 29 days before an election.', icon: '📋' },
  { title: 'Check Your Registration Status', desc: 'Verify your voter registration is current and your address is correct. You can update your registration anytime at vote.org or the Sumter County Supervisor of Elections.', icon: '✅' },
  { title: 'Vote by Mail', desc: 'Florida residents can request a vote-by-mail ballot for any election. Request must be received by 7 days before the election. Ballots must be returned by 7:00 PM on Election Day.', icon: '📬' },
  { title: 'Early Voting Locations', desc: 'Early voting is available at multiple locations in Sumter County, including locations near The Villages. Check the Supervisor of Elections website for dates and locations closer to each election.', icon: '🗳️' },
]

const SCOPE_COLORS = { Federal: '#1a1a6e', State: '#2D7A2D', Local: '#8B4513', Nonpartisan: '#555' }

export default function ElectionsPage() {
  const [tab, setTab] = useState<'upcoming' | 'officials' | 'register'>('upcoming')
  const [officialsFilter, setOfficialsFilter] = useState('All')

  const filteredOfficials = officialsFilter === 'All' ? OFFICIALS : OFFICIALS.filter(o => o.scope === officialsFilter)

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>🗳️ Elections & Civic Info</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Stay informed on elections, elected officials, and voter registration</p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="https://www.sumterelections.org" target="_blank" rel="noopener noreferrer" style={{ background: '#2D7A2D', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Sumter County Elections ↗</a>
          <a href="https://dos.fl.gov/elections/" target="_blank" rel="noopener noreferrer" style={{ background: '#1a1a6e', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>FL Division of Elections ↗</a>
          <a href="https://www.usa.gov/register-to-vote" target="_blank" rel="noopener noreferrer" style={{ background: '#8B4513', color: 'white', padding: '0.45rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>USA.gov Voter Registration ↗</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: '#F5F5F5', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '2rem', border: '1px solid #E0E0E0' }}>
        {([['upcoming', '📅 Upcoming Elections'], ['officials', '👤 Elected Officials'], ['register', '📋 Voter Registration']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex: 1, padding: '0.625rem 1rem', borderRadius: '0.5rem', border: 'none', background: tab === id ? '#2D7A2D' : 'transparent', color: tab === id ? 'white' : '#555', fontWeight: tab === id ? 700 : 400, fontSize: '0.875rem', cursor: 'pointer' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Upcoming Elections */}
      {tab === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {UPCOMING_ELECTIONS.map((e, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.5rem', borderLeft: '4px solid #2D7A2D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#1A1A1A', marginBottom: '0.3rem' }}>{e.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: '#2D7A2D', color: 'white', borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', fontWeight: 700 }}>{e.type}</span>
                    <span style={{ background: '#F5F5F5', color: '#555', borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', border: '1px solid #E0E0E0' }}>{e.scope}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>Election Date</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D7A2D' }}>{e.date}</div>
                </div>
              </div>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.65 }}>{e.description}</p>
            </div>
          ))}
          <div style={{ background: '#fffbeb', border: '1px solid #FFD700', borderRadius: '0.875rem', padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, color: '#8B6914', marginBottom: '0.5rem' }}>⚠️ Registration Deadline Reminder</h3>
            <p style={{ color: '#8B6914', fontSize: '0.9rem', lineHeight: 1.6 }}>Florida requires voter registration to be completed <strong>29 days before any election</strong>. If you are a new resident, register as soon as possible to ensure you can participate in all upcoming elections.</p>
          </div>
        </div>
      )}

      {/* Officials */}
      {tab === 'officials' && (
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {['All', 'Federal', 'State', 'Local'].map(f => (
              <button key={f} onClick={() => setOfficialsFilter(f)}
                style={{ padding: '0.45rem 1rem', borderRadius: '9999px', border: `2px solid ${officialsFilter === f ? '#2D7A2D' : '#E0E0E0'}`, background: officialsFilter === f ? '#2D7A2D' : '#FFFFFF', color: officialsFilter === f ? 'white' : '#444', fontWeight: officialsFilter === f ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filteredOfficials.map((o, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.25rem', borderTop: `3px solid ${SCOPE_COLORS[o.scope as keyof typeof SCOPE_COLORS] ?? '#2D7A2D'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#1A1A1A' }}>{o.name}</h3>
                  <span style={{ background: SCOPE_COLORS[o.scope as keyof typeof SCOPE_COLORS] ?? '#2D7A2D', color: 'white', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{o.scope}</span>
                </div>
                <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '0.4rem' }}>{o.title}</p>
                <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.875rem' }}>Party: {o.party}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${o.phone}`} style={{ background: '#F5F5F5', color: '#1A1A1A', padding: '0.4rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #E0E0E0' }}>📞 {o.phone}</a>
                  <a href={o.website} target="_blank" rel="noopener noreferrer" style={{ background: '#2D7A2D', color: 'white', padding: '0.4rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>Website ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voter Registration */}
      {tab === 'register' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {VOTER_INFO.map((v, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{v.icon}</div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ background: '#2D7A2D', borderRadius: '0.875rem', padding: '1.75rem', textAlign: 'center', color: 'white' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Register to Vote Online</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', lineHeight: 1.6 }}>Register or update your voter registration through the Florida Division of Elections website. You will need your Florida Driver License or ID number.</p>
            <a href="https://registration.elections.myflorida.com/en" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#FFD700', color: '#1A1A1A', padding: '0.875rem 2.5rem', borderRadius: '0.625rem', fontWeight: 800, fontSize: '1rem' }}>
              Register to Vote →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

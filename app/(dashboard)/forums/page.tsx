'use client'
export const dynamic = 'force-dynamic'

interface Forum {
  name: string
  description: string
  url: string
  type: string
  members?: string
  activity: 'Very Active' | 'Active' | 'Moderate'
  icon: string
  tags: string[]
}

const FORUMS: Forum[] = [
  {
    name: 'Villages-Talk.com',
    description: 'The largest independent community forum for Villages residents and prospective buyers. Covers every topic from golf to restaurants to neighborhood news. No censorship — honest opinions from real residents.',
    url: 'https://www.villages-talk.com',
    type: 'Community Forum',
    members: '25,000+',
    activity: 'Very Active',
    icon: '💬',
    tags: ['General Discussion', 'Real Estate', 'Golf', 'Restaurants', 'Activities', 'Politics', 'Health'],
  },
  {
    name: 'The Villages Facebook Group (Official)',
    description: 'The official Villages Facebook community with updates from The Villages developer, events, and resident discussions.',
    url: 'https://www.facebook.com/thevillagesfl',
    type: 'Facebook Group',
    members: '40,000+',
    activity: 'Very Active',
    icon: '📘',
    tags: ['News', 'Events', 'Community', 'Activities'],
  },
  {
    name: 'The Villages Residents Facebook Group',
    description: 'Large independent Facebook group for residents to share tips, ask questions, sell items, and connect with neighbors across all neighborhoods.',
    url: 'https://www.facebook.com/groups/thevillagesresidents',
    type: 'Facebook Group',
    members: '55,000+',
    activity: 'Very Active',
    icon: '📘',
    tags: ['For Sale', 'Recommendations', 'General', 'Services', 'Activities'],
  },
  {
    name: 'Villages Golf Talk Facebook Group',
    description: 'Dedicated to golf in The Villages. Course conditions, tips, finding playing partners, tournament results, and equipment discussions.',
    url: 'https://www.facebook.com/groups/villagesgolftalk',
    type: 'Facebook Group',
    members: '12,000+',
    activity: 'Very Active',
    icon: '⛳',
    tags: ['Golf', 'Course Conditions', 'Equipment', 'Partners', 'Tournaments'],
  },
  {
    name: 'Nextdoor — The Villages',
    description: 'Neighborhood-specific discussions on Nextdoor covering local services, recommendations, lost pets, package theft alerts, and community events.',
    url: 'https://nextdoor.com',
    type: 'Nextdoor',
    activity: 'Very Active',
    icon: '🏘️',
    tags: ['Neighborhood', 'Safety', 'Services', 'Lost & Found', 'Recommendations'],
  },
  {
    name: 'Villages Music & Entertainment Facebook Group',
    description: 'Dedicated to entertainment at The Villages — upcoming performers, song requests, reviews of recent shows, and entertainment tips.',
    url: 'https://www.facebook.com/groups',
    type: 'Facebook Group',
    members: '8,000+',
    activity: 'Active',
    icon: '🎵',
    tags: ['Entertainment', 'Music', 'Performers', 'Events'],
  },
  {
    name: 'The Villages For Sale & Wanted',
    description: 'Buy, sell, and trade golf carts, furniture, electronics, and household goods with fellow Villages residents.',
    url: 'https://www.facebook.com/groups',
    type: 'Facebook Group',
    members: '30,000+',
    activity: 'Very Active',
    icon: '🏷️',
    tags: ['For Sale', 'Wanted', 'Golf Carts', 'Furniture', 'Electronics'],
  },
  {
    name: 'Villages Newcomers Club Forum',
    description: 'The official forum and social group for new residents of The Villages. Events, orientation, and connecting with other newcomers.',
    url: 'https://www.thevillages.com/clubs/',
    type: 'Club Forum',
    members: '5,000+',
    activity: 'Active',
    icon: '👋',
    tags: ['Newcomers', 'Orientation', 'Social', 'Events'],
  },
  {
    name: 'The Villages Pickleball Community',
    description: 'The fastest-growing sport in The Villages! Find playing partners, courts, tournament info, and clinics for all skill levels.',
    url: 'https://www.thevillages.com/recreation/',
    type: 'Club Forum',
    members: '15,000+',
    activity: 'Very Active',
    icon: '🏓',
    tags: ['Pickleball', 'Sports', 'Partners', 'Tournaments', 'Clinics'],
  },
  {
    name: 'Villages Swimming & Water Fitness',
    description: 'Water aerobics, lap swimming, pool clubs, and aquatic fitness discussions for Villages pool enthusiasts.',
    url: 'https://www.thevillages.com/recreation/',
    type: 'Club Forum',
    activity: 'Active',
    icon: '🏊',
    tags: ['Swimming', 'Fitness', 'Pools', 'Aquatics'],
  },
  {
    name: 'The Villages Travel Club',
    description: 'Group travel, trip planning, cruises, and travel tips for Villages residents who love to explore the world.',
    url: 'https://www.thevillages.com/clubs/',
    type: 'Club Forum',
    activity: 'Active',
    icon: '✈️',
    tags: ['Travel', 'Cruises', 'Trips', 'International'],
  },
  {
    name: 'Villages Political Discussion Group',
    description: 'Open discussion of local, state, and national politics. Respectful debate encouraged. Very active during election seasons.',
    url: 'https://www.villages-talk.com',
    type: 'Community Forum',
    activity: 'Very Active',
    icon: '🗳️',
    tags: ['Politics', 'Elections', 'Local Government', 'National Issues'],
  },
]

const CATEGORIES = ['All', 'Community Forum', 'Facebook Group', 'Nextdoor', 'Club Forum']
const TOPICS = ['General Discussion', 'Golf', 'Activities', 'For Sale', 'Services', 'Recommendations', 'Entertainment', 'Politics', 'Newcomers']

const ACTIVITY_COLORS = {
  'Very Active': '#2D7A2D',
  'Active': '#1a5c9e',
  'Moderate': '#8B4513',
}

export default function ForumsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.4rem' }}>💬 Community Forums</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>Connect with your neighbors — online forums, Facebook groups, and community resources</p>
      </div>

      {/* Quick Links */}
      <div style={{ background: 'linear-gradient(135deg, #2D7A2D, #1a5c1a)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', color: 'white' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>⚡ Quick Access — Most Popular</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Villages-Talk.com', url: 'https://www.villages-talk.com', icon: '💬' },
            { label: 'Official Club Directory', url: 'https://www.thevillages.com/clubs/', icon: '🏛️' },
            { label: 'Recreation Activities', url: 'https://www.thevillages.com/recreation/', icon: '🎯' },
            { label: 'Villages-News.com', url: 'https://www.thevillagesnews.com', icon: '📰' },
          ].map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '0.5rem 1.125rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              {l.icon} {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Forums Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {FORUMS.map((f, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '0.875rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.2rem' }}>{f.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#555', borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', fontWeight: 600 }}>{f.type}</span>
                    <span style={{ background: `${ACTIVITY_COLORS[f.activity]}18`, border: `1px solid ${ACTIVITY_COLORS[f.activity]}44`, color: ACTIVITY_COLORS[f.activity], borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', fontWeight: 700 }}>
                      {f.activity === 'Very Active' ? '🔥' : f.activity === 'Active' ? '✓' : '~'} {f.activity}
                    </span>
                    {f.members && <span style={{ color: '#888', fontSize: '0.75rem' }}>👥 {f.members}</span>}
                  </div>
                </div>
              </div>
              <a href={f.url} target="_blank" rel="noopener noreferrer"
                style={{ background: '#2D7A2D', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Visit Forum ↗
              </a>
            </div>

            <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '0.875rem' }}>{f.description}</p>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {f.tags.map((t, ti) => (
                <span key={ti} style={{ background: 'rgba(45,122,45,0.07)', border: '1px solid rgba(45,122,45,0.18)', color: '#2D7A2D', borderRadius: '9999px', padding: '0.15rem 0.625rem', fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Box */}
      <div style={{ background: '#fffbeb', border: '1px solid #FFD700', borderRadius: '0.875rem', padding: '1.5rem', marginTop: '2rem' }}>
        <h3 style={{ fontWeight: 800, color: '#8B6914', marginBottom: '0.875rem' }}>💡 Forum Tips for Villages Residents</h3>
        <ul style={{ color: '#8B6914', fontSize: '0.9rem', lineHeight: 2, paddingLeft: '1.25rem' }}>
          <li><strong>Villages-Talk.com</strong> is the best place for candid, unfiltered resident opinions and real estate questions</li>
          <li>Facebook groups are best for quick questions and recommendations from neighbors</li>
          <li>Nextdoor is best for neighborhood-specific issues like suspicious activity or local services</li>
          <li>The official <strong>Villages Club Directory</strong> has 3,000+ clubs — there is truly something for everyone</li>
          <li>Most neighborhoods have their own Facebook group — search "[Your Neighborhood] The Villages" to find yours</li>
        </ul>
      </div>
    </div>
  )
}

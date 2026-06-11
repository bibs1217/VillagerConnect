'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'

const FORUMS = [
  {
    id:'general', name:'General Golf Cart Talk', emoji:'💬', icon:'🏌️',
    desc:'All things golf cart — news, introductions, general questions',
    activity:'Very Active', members:'4.2K', posts:'28.1K',
    tags:['Welcome','General','Introductions','Questions'],
    url:'https://www.golfcartforum.com/forums/general-golf-cart-talk/',
  },
  {
    id:'club-car', name:'Club Car', emoji:'🅱️', icon:'🛠️',
    desc:'Club Car DS, Precedent, Tempo, Onward, and all Club Car models',
    activity:'Very Active', members:'3.8K', posts:'22.4K',
    tags:['DS','Precedent','Tempo','Onward','Repairs'],
    url:'https://www.golfcartforum.com/forums/club-car/',
  },
  {
    id:'ezgo', name:'EZGO', emoji:'🅴', icon:'⚡',
    desc:'EZGO TXT, RXV, Freedom RXV, Valor, Express, and all EZGO models',
    activity:'Very Active', members:'3.5K', posts:'19.7K',
    tags:['TXT','RXV','Valor','Express','PDS'],
    url:'https://www.golfcartforum.com/forums/e-z-go/',
  },
  {
    id:'yamaha', name:'Yamaha Golf Carts', emoji:'🎸', icon:'🔧',
    desc:'Yamaha Drive, Drive2, Adventurer, Umax, and all Yamaha models',
    activity:'Active', members:'2.9K', posts:'14.2K',
    tags:['Drive','Drive2','G-Series','Gas','Electric'],
    url:'https://www.golfcartforum.com/forums/yamaha/',
  },
  {
    id:'electric', name:'Electric Systems & Batteries', emoji:'🔋', icon:'⚡',
    desc:'Batteries, controllers, motors, chargers — all electric cart tech',
    activity:'Very Active', members:'3.1K', posts:'18.9K',
    tags:['Lithium','Lead Acid','Curtis','Alltrax','48V','72V'],
    url:'https://www.golfcartforum.com/forums/electric-golf-carts/',
  },
  {
    id:'gas', name:'Gas Engines & Drivetrain', emoji:'⛽', icon:'🔩',
    desc:'Kawasaki, Robin/Subaru, Kohler engines, carbs, fuel systems',
    activity:'Active', members:'2.2K', posts:'11.3K',
    tags:['Kawasaki','Robin','Kohler','Carburetor','Engine Swap'],
    url:'https://www.golfcartforum.com/forums/gas-golf-carts/',
  },
  {
    id:'lift-kits', name:'Lift Kits & Suspension', emoji:'⬆️', icon:'🛞',
    desc:'Lift kits, spindles, A-arms, suspension upgrades, big tires',
    activity:'Very Active', members:'3.4K', posts:'21.6K',
    tags:['3 Inch','4 Inch','6 Inch','Drop Spindle','A-Arm','Off Road'],
    url:'https://www.golfcartforum.com/forums/lift-kits-tires-wheels/',
  },
  {
    id:'lsv', name:'LSV & Street Legal Carts', emoji:'🛣️', icon:'🚦',
    desc:'Low Speed Vehicle conversions, street legal builds, The Villages cart paths',
    activity:'Active', members:'2.7K', posts:'13.4K',
    tags:['LSV','Street Legal','NEV','The Villages','Cart Paths','Registration'],
    url:'https://www.golfcartforum.com/forums/neighborhood-electric-vehicles-nev-street-legal/',
  },
  {
    id:'custom', name:'Custom & Show Carts', emoji:'✨', icon:'🏆',
    desc:'Custom builds, show carts, unique designs, contest winners',
    activity:'Active', members:'2.4K', posts:'16.2K',
    tags:['Custom Build','Show Cart','Paint','Wrap','Award Winner'],
    url:'https://www.golfcartforum.com/forums/show-us-your-cart/',
  },
  {
    id:'lithium', name:'Lithium Battery Conversion', emoji:'⚡', icon:'🔋',
    desc:'Lithium conversions, BMS, charging, range, brand comparisons',
    activity:'Very Active', members:'3.9K', posts:'24.8K',
    tags:['LiFePO4','BMS','Range','Conversion','48V Lithium','72V Lithium'],
    url:'https://www.golfcartforum.com/forums/lithium-batteries/',
  },
  {
    id:'villages', name:'The Villages FL Community', emoji:'🌴', icon:'🏘️',
    desc:'Cart topics specific to The Villages retirement community',
    activity:'Very Active', members:'5.1K', posts:'31.2K',
    tags:['The Villages','Sumter','Cart Paths','Rules','Dealers','FL'],
    url:'https://www.thevillager.com',
  },
  {
    id:'marketplace', name:'Buy / Sell / Trade', emoji:'💰', icon:'🤝',
    desc:'Used carts, parts, accessories — community classifieds',
    activity:'Active', members:'4.8K', posts:'19.7K',
    tags:['For Sale','WTB','Trade','Parts','Complete Carts'],
    url:'https://www.golfcartforum.com/forums/golf-cart-classifieds/',
  },
]

const ACTIVITY_STYLES: Record<string,{bg:string;color:string}> = {
  'Very Active': { bg:'rgba(45,122,45,0.1)',    color:'#2D7A2D' },
  'Active':      { bg:'rgba(26,92,154,0.1)',    color:'#1a5c9e' },
  'Moderate':    { bg:'rgba(139,106,20,0.1)',   color:'#8B6914' },
}

export default function CartForumsPage() {
  const [search, setSearch] = useState('')

  const filtered = FORUMS.filter(f =>
    !search ||
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.desc.toLowerCase().includes(search.toLowerCase()) ||
    f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const totalPosts  = FORUMS.reduce((s, f) => s + parseFloat(f.posts), 0)
  const totalMembers = '19K+'

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'2rem', fontWeight:900, color:'#1A1A1A', marginBottom:'0.4rem' }}>💬 Cart Forums</h1>
      <p style={{ color:'#666', marginBottom:'1.75rem', fontSize:'0.9rem' }}>Golf cart community discussions — repairs, upgrades, buying advice, and more</p>

      {/* Stats Banner */}
      <div style={{ background:'linear-gradient(135deg,#2D7A2D,#1a5c1a)', borderRadius:'1rem', padding:'1.25rem 1.5rem', marginBottom:'1.75rem', color:'white', display:'flex', gap:'2rem', alignItems:'center', flexWrap:'wrap' }}>
        <div style={{ flex:1 }}>
          <p style={{ fontWeight:800, fontSize:'1rem', marginBottom:'0.2rem' }}>🏌️ Golf Cart Community</p>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.85rem' }}>Connect with fellow cart owners in The Villages and beyond</p>
        </div>
        {[['19K+','Members'],['~230K','Total Posts'],['12','Forum Sections']].map(([v,l])=>(
          <div key={l} style={{ textAlign:'center', background:'rgba(255,255,255,0.12)', borderRadius:'0.75rem', padding:'0.625rem 1rem' }}>
            <div style={{ fontWeight:900, color:'#FFD700', fontSize:'1.2rem' }}>{v}</div>
            <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.7)', textTransform:'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ background:'rgba(45,122,45,0.06)', borderRadius:'1rem', padding:'1.1rem 1.5rem', marginBottom:'1.75rem', display:'flex', gap:'1rem', flexWrap:'wrap', alignItems:'center' }}>
        <span style={{ color:'#2D7A2D', fontWeight:700, fontSize:'0.85rem', flexShrink:0 }}>🔗 Quick Links:</span>
        {[
          { label:'The Villages Forums', url:'https://www.thevillager.com' },
          { label:'GolfCartForum.com', url:'https://www.golfcartforum.com' },
          { label:'Cart Garage', url:'/cart-garage' },
          { label:'AI Mechanic', url:'/cart-mechanic' },
          { label:'Buy/Sell Carts', url:'/golf-cart-search' },
        ].map((l, i) => (
          l.url.startsWith('/')
            ? <Link key={i} href={l.url} style={{ color:'#2D7A2D', fontSize:'0.82rem', fontWeight:600, border:'1px solid rgba(45,122,45,0.25)', borderRadius:'9999px', padding:'0.25rem 0.75rem', textDecoration:'none' }}>{l.label} →</Link>
            : <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color:'#2D7A2D', fontSize:'0.82rem', fontWeight:600, border:'1px solid rgba(45,122,45,0.25)', borderRadius:'9999px', padding:'0.25rem 0.75rem', textDecoration:'none' }}>{l.label} →</a>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom:'1.5rem' }}>
        <input
          style={{ background:'#FFFFFF', border:'1px solid #E0E0E0', borderRadius:'0.75rem', color:'#1A1A1A', padding:'0.75rem 1.1rem', fontSize:'0.9rem', outline:'none', width:'100%', boxSizing:'border-box' }}
          placeholder="🔍 Search forums…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Forum Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:'1rem' }}>
        {filtered.map(f => {
          const astyle = ACTIVITY_STYLES[f.activity] ?? ACTIVITY_STYLES.Active
          return (
            <div key={f.id} style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'1.35rem', border:'1px solid #E0E0E0', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.75rem' }}>{f.emoji}</span>
                <span style={{ background:astyle.bg, color:astyle.color, border:`1px solid ${astyle.color}33`, fontSize:'0.65rem', fontWeight:700, padding:'0.2rem 0.55rem', borderRadius:'9999px' }}>{f.activity}</span>
              </div>
              <h3 style={{ fontWeight:800, fontSize:'0.95rem', color:'#1A1A1A', lineHeight:1.3 }}>{f.name}</h3>
              <p style={{ color:'#666', fontSize:'0.8rem', lineHeight:1.5 }}>{f.desc}</p>
              <div style={{ display:'flex', gap:'0.375rem', flexWrap:'wrap' }}>
                {f.tags.slice(0,4).map(t => (
                  <span key={t} style={{ background:'#F5F5F5', color:'#555', fontSize:'0.67rem', padding:'0.15rem 0.5rem', borderRadius:'9999px', border:'1px solid #E8E8E8' }}>{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', color:'#888', fontSize:'0.75rem', marginTop:'0.2rem' }}>
                <span>👥 {f.members} members</span>
                <span>💬 {f.posts} posts</span>
              </div>
              <a href={f.url} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', background:'#2D7A2D', color:'white', borderRadius:'0.75rem', padding:'0.6rem', textAlign:'center', fontWeight:700, fontSize:'0.85rem', textDecoration:'none', marginTop:'0.25rem' }}>
                Visit Forum →
              </a>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'3rem', color:'#888' }}>
          <p style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>💬</p>
          <p>No forums match your search</p>
        </div>
      )}

      {/* Tips */}
      <div style={{ background:'#FFFEF0', borderRadius:'1rem', padding:'1.25rem 1.5rem', marginTop:'2rem', border:'1px solid rgba(255,215,0,0.35)' }}>
        <p style={{ fontWeight:700, color:'#1A1A1A', marginBottom:'0.5rem' }}>💡 Forum Tips</p>
        <ul style={{ color:'#555', fontSize:'0.82rem', lineHeight:1.8, margin:0, paddingLeft:'1.25rem' }}>
          <li>Include your cart make, model, and year when asking for help</li>
          <li>Mention electric or gas — they have very different troubleshooting paths</li>
          <li>Post clear photos of the issue — members can diagnose much faster</li>
          <li>The Villages FL residents: check the dedicated Villages forum for local rules, dealers, and events</li>
        </ul>
      </div>
    </div>
  )
}

'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'

const SUPABASE_URL  = 'https://vthpgqhlhihnoeawjdyc.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aHBncWhsaGlobm9lYXdqZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODk5NjMsImV4cCI6MjA5NjA2NTk2M30.SnLIQX-Ntn0ba3Ap1lcfG8RULan15E3qGwRAMoDtrXo'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const STATE_NAMES: Record<string,string> = { AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming' }

const TYPE_LABELS: Record<string,string> = { all:'All Events', street_meet:'Street Meet', car_show:'Car Show', track_day:'Track Day', cruise:'Cruise', drag:'Drag Racing', autocross:'Autocross', hpde:'HPDE' }
const TYPE_COLORS: Record<string,string> = { street_meet:'#2D7A2D', car_show:'#1a5c9e', track_day:'#8B1a8B', cruise:'#8B4513', drag:'#CC0000', autocross:'#1a7a4a', hpde:'#6B6B00', all:'#888' }

const inp: React.CSSProperties = { background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.5rem', color:'#1A1A1A', padding:'0.6rem 0.875rem', fontSize:'0.875rem', outline:'none', width:'100%', boxSizing:'border-box' }
const lbl: React.CSSProperties = { fontSize:'0.65rem', color:'#888', display:'block', marginBottom:'0.3rem', textTransform:'uppercase', letterSpacing:'0.5px' }

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R=3958.8, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
}
function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) }
  catch { return iso }
}

function SubmitModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ title:'', city:'The Villages', state:'FL', zip:'32162', starts_at:'', event_type:'street_meet', description:'', entry_fee:'' })
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setErr('')
    try {
      let lat: number|null=null, lng: number|null=null
      if (form.zip.length===5) {
        const r = await fetch(`https://api.zippopotam.us/us/${form.zip}`)
        if (r.ok) { const d=await r.json(); lat=parseFloat(d.places[0].latitude); lng=parseFloat(d.places[0].longitude) }
      }
      const res = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
        method:'POST',
        headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, 'Content-Type':'application/json', Prefer:'return=minimal' },
        body: JSON.stringify({ title:form.title, city:form.city, state:form.state, zip:form.zip||null, lat, lng, starts_at:new Date(form.starts_at).toISOString(), event_type:form.event_type, description:form.description||null, entry_fee:form.entry_fee?parseInt(form.entry_fee):null, is_published:true, is_cancelled:false, current_attendees:0, registration_required:false, weather_sensitive:false }),
      })
      if (!res.ok) { setErr((await res.text()).slice(0,200)) } else { setDone(true) }
    } catch(e: any) { setErr(String(e)) }
    setSaving(false)
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'2rem', width:'100%', maxWidth:'500px', border:'1px solid #E0E0E0' }}>
        {done ? (
          <div style={{ textAlign:'center', padding:'2rem 0' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
            <h2 style={{ fontWeight:800, color:'#1A1A1A', marginBottom:'0.5rem' }}>Event Submitted!</h2>
            <p style={{ color:'#666', marginBottom:'1.5rem' }}>Your event has been added to the community database.</p>
            <button onClick={onClose} style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.75rem', padding:'0.75rem 2rem', fontWeight:700, cursor:'pointer' }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h2 style={{ fontWeight:800, fontSize:'1.25rem', color:'#1A1A1A' }}>Submit Your Event</h2>
              <button onClick={onClose} style={{ background:'transparent', border:'none', color:'#888', fontSize:'1.5rem', cursor:'pointer' }}>×</button>
            </div>
            <form onSubmit={submit}>
              <div style={{ display:'grid', gap:'0.875rem' }}>
                <div><label style={lbl}>Event Title *</label><input required style={inp} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Cars & Coffee — The Villages" /></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div><label style={lbl}>City *</label><input required style={inp} value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} /></div>
                  <div><label style={lbl}>State *</label>
                    <select required style={inp} value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
                      {US_STATES.map(s => <option key={s} value={s}>{s} — {STATE_NAMES[s]}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div><label style={lbl}>ZIP Code</label><input style={inp} value={form.zip} maxLength={5} onChange={e=>setForm(f=>({...f,zip:e.target.value.replace(/\D/g,'')}))} /></div>
                  <div><label style={lbl}>Event Type *</label>
                    <select required style={inp} value={form.event_type} onChange={e=>setForm(f=>({...f,event_type:e.target.value}))}>
                      {Object.entries(TYPE_LABELS).filter(([k])=>k!=='all').map(([k,v])=><option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div><label style={lbl}>Date & Time *</label><input required type="datetime-local" style={inp} value={form.starts_at} onChange={e=>setForm(f=>({...f,starts_at:e.target.value}))} /></div>
                <div><label style={lbl}>Entry Fee ($ — leave blank if free)</label><input type="number" min="0" style={inp} value={form.entry_fee} onChange={e=>setForm(f=>({...f,entry_fee:e.target.value}))} placeholder="0" /></div>
                <div><label style={lbl}>Description</label><textarea rows={3} style={{...inp, resize:'vertical'}} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Tell people what to expect..." /></div>
              </div>
              {err && <p style={{ color:'#CC0000', fontSize:'0.8rem', marginTop:'0.75rem' }}>{err}</p>}
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.25rem' }}>
                <button type="submit" disabled={saving} style={{ flex:1, background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.75rem', padding:'0.75rem', fontWeight:700, cursor:saving?'not-allowed':'pointer' }}>{saving?'Submitting...':'Submit Event'}</button>
                <button type="button" onClick={onClose} style={{ background:'#F5F5F5', color:'#555', border:'1px solid #E0E0E0', borderRadius:'0.75rem', padding:'0.75rem 1rem', cursor:'pointer' }}>Cancel</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function CarEventsPage() {
  const [city, setCity]           = useState('The Villages')
  const [stateVal, setStateVal]   = useState('FL')
  const [zip, setZip]             = useState('32162')
  const [radius, setRadius]       = useState(100)
  const [eventType, setEventType] = useState('all')
  const [dateRange, setDateRange] = useState('upcoming')
  const [dbEvents, setDbEvents]   = useState<any[]>([])
  const [aiEvents, setAiEvents]   = useState<any[]>([])
  const [ebResults, setEbResults] = useState<any[]>([])
  const [gResults, setGResults]   = useState<any[]>([])
  const [pLinks, setPLinks]       = useState<any[]>([])
  const [dbLoading, setDbLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searched, setSearched]   = useState(false)
  const [anchor, setAnchor]       = useState<{lat:number;lon:number}|null>(null)
  const [searchLabel, setSearchLabel] = useState('')
  const [showSubmit, setShowSubmit]   = useState(false)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/events?select=*&is_published=eq.true&is_cancelled=eq.false&order=starts_at.asc`, {
      headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}` },
    }).then(r=>r.json()).then(d=>{ setDbEvents(Array.isArray(d)?d:[]); setDbLoading(false) }).catch(()=>setDbLoading(false))
  }, [])

  const filteredDb = dbEvents.filter(ev => {
    if (eventType!=='all' && ev.event_type!==eventType) return false
    if (anchor && ev.lat!=null && ev.lng!=null) { if (haversine(anchor.lat,anchor.lon,Number(ev.lat),Number(ev.lng))>radius) return false }
    else if (searched && !anchor) { const cm=city?(ev.city??'').toLowerCase().includes(city.toLowerCase()):true; const sm=stateVal?(ev.state??'').toUpperCase()===stateVal.toUpperCase():true; if (!cm&&!sm) return false }
    if (dateRange!=='all') { const now=new Date(); const evDt=new Date(ev.starts_at); if (evDt<now) return false; if (dateRange==='this_week'){const w=new Date(now);w.setDate(now.getDate()+7);if(evDt>w)return false} else if(dateRange==='this_month'){const m=new Date(now);m.setDate(now.getDate()+30);if(evDt>m)return false} else if(dateRange==='3months'){const m3=new Date(now);m3.setDate(now.getDate()+90);if(evDt>m3)return false} }
    return true
  })

  async function handleSearch() {
    if (!city||!stateVal) { alert('Please enter a city and state.'); return }
    setSearching(true)
    let newAnchor: {lat:number;lon:number}|null = null
    if (zip&&zip.length===5) { try { const r=await fetch(`https://api.zippopotam.us/us/${zip}`); if(r.ok){const d=await r.json();newAnchor={lat:parseFloat(d.places[0].latitude),lon:parseFloat(d.places[0].longitude)}} } catch {} }
    setAnchor(newAnchor); setSearchLabel(`${city}, ${stateVal}${zip?` (${zip})`:''}`)
    try {
      const params = new URLSearchParams({ city, state:stateVal, type:eventType })
      const res = await fetch(`/api/car-events-search?${params}`)
      if (res.ok) { const d=await res.json(); setAiEvents(d.aiEvents??[]); setEbResults(d.eventbriteResults??[]); setGResults(d.googleResults??[]); setPLinks(d.platformLinks??[]) }
    } catch {}
    setSearched(true); setSearching(false)
  }

  const distFor = (ev: any) => anchor&&ev.lat!=null&&ev.lng!=null ? Math.round(haversine(anchor.lat,anchor.lon,Number(ev.lat),Number(ev.lng))) : null

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} />}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.75rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', fontWeight:900, color:'#1A1A1A', marginBottom:'0.3rem' }}>🚗 Car Meets & Events</h1>
          <p style={{ color:'#666', fontSize:'0.9rem' }}>Find car meets, shows, and events near The Villages and central Florida</p>
        </div>
        <button onClick={() => setShowSubmit(true)} style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 1.5rem', fontWeight:700, fontSize:'0.9rem', cursor:'pointer' }}>
          + Submit Your Event
        </button>
      </div>

      {/* Search Form */}
      <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'1.5rem', marginBottom:'1.75rem', border:'1px solid #E0E0E0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'0.875rem', marginBottom:'1rem' }}>
          <div style={{ gridColumn:'span 2', minWidth:'160px' }}>
            <label style={lbl}>City *</label>
            <input style={inp} placeholder="The Villages" value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} />
          </div>
          <div>
            <label style={lbl}>State *</label>
            <select style={inp} value={stateVal} onChange={e=>setStateVal(e.target.value)}>
              {US_STATES.map(s => <option key={s} value={s}>{s} — {STATE_NAMES[s]}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>ZIP Code</label>
            <input style={inp} placeholder="32162" value={zip} maxLength={5} onChange={e=>setZip(e.target.value.replace(/\D/g,''))} onKeyDown={e=>e.key==='Enter'&&handleSearch()} />
          </div>
          <div>
            <label style={lbl}>Radius</label>
            <select style={inp} value={radius} onChange={e=>setRadius(Number(e.target.value))}>
              {[25,50,100,200].map(r=><option key={r} value={r}>{r} miles</option>)}
              <option value={99999}>Statewide</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Event Type</label>
            <select style={inp} value={eventType} onChange={e=>setEventType(e.target.value)}>
              {Object.entries(TYPE_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Date Range</label>
            <select style={inp} value={dateRange} onChange={e=>setDateRange(e.target.value)}>
              <option value="upcoming">All Upcoming</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="3months">Next 3 Months</option>
              <option value="all">All (incl. past)</option>
            </select>
          </div>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center', flexWrap:'wrap' }}>
          <button onClick={handleSearch} disabled={searching} style={{ background:searching?'#A8C8A8':'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 2.5rem', fontWeight:700, fontSize:'1rem', cursor:searching?'not-allowed':'pointer' }}>
            {searching ? '🔍 Searching...' : '🔍 Find Events'}
          </button>
          {searched && (
            <button onClick={()=>{setSearched(false);setAnchor(null);setSearchLabel('');setAiEvents([]);setPLinks([]);setGResults([]);setEbResults([])}}
              style={{ background:'#F5F5F5', color:'#666', border:'1px solid #E0E0E0', borderRadius:'0.875rem', padding:'0.75rem 1rem', cursor:'pointer', fontSize:'0.85rem' }}>
              Clear Search
            </button>
          )}
          {searchLabel && <span style={{ color:'#888', fontSize:'0.82rem' }}>Results for <strong style={{color:'#1A1A1A'}}>{searchLabel}</strong></span>}
        </div>
      </div>

      {/* Community Events */}
      <div style={{ marginBottom:'2.5rem' }}>
        <div style={{ marginBottom:'1rem' }}>
          <h2 style={{ fontWeight:800, fontSize:'1.1rem', color:'#1A1A1A' }}>
            🗓️ Community Events
            <span style={{ background:'rgba(45,122,45,0.1)', color:'#2D7A2D', borderRadius:'9999px', padding:'0.15rem 0.625rem', fontSize:'0.72rem', fontWeight:700, marginLeft:'0.5rem' }}>
              {searched ? filteredDb.length : dbEvents.length}
            </span>
          </h2>
          <p style={{ color:'#888', fontSize:'0.78rem', marginTop:'0.2rem' }}>
            {searched ? `Matching events near ${searchLabel}` : `${dbEvents.length} events in our community database — search above to filter by location`}
          </p>
        </div>
        {dbLoading ? (
          <p style={{ color:'#888', padding:'2rem', textAlign:'center' }}>Loading...</p>
        ) : (searched ? filteredDb : dbEvents).length === 0 ? (
          <div style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'2rem', textAlign:'center', color:'#888', border:'1px solid #E0E0E0' }}>
            <p style={{ marginBottom:'0.5rem' }}>No community events found for this search.</p>
            <p style={{ fontSize:'0.8rem' }}>Be the first — <button onClick={()=>setShowSubmit(true)} style={{ background:'transparent', border:'none', color:'#2D7A2D', cursor:'pointer', fontWeight:700, fontSize:'0.8rem', padding:0 }}>submit yours!</button></p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'1.1rem' }}>
            {(searched ? filteredDb : dbEvents).slice(0,12).map((ev: any) => {
              const color = TYPE_COLORS[ev.event_type] ?? '#2D7A2D'
              const dist = distFor(ev)
              return (
                <div key={ev.id} style={{ background:'#FFFFFF', border:`1px solid #E0E0E0`, borderRadius:'1rem', overflow:'hidden', borderTop:`3px solid ${color}` }}>
                  {ev.cover_image_url
                    ? <img src={ev.cover_image_url} alt={ev.title} style={{ width:'100%', height:'140px', objectFit:'cover' }} />
                    : <div style={{ width:'100%', height:'140px', background:`linear-gradient(135deg,${color}18,#F5F5F5)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem' }}>🚗</div>
                  }
                  <div style={{ padding:'1.1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
                      <span style={{ background:`${color}18`, color, border:`1px solid ${color}33`, padding:'0.15rem 0.5rem', borderRadius:'9999px', fontSize:'0.62rem', fontWeight:700 }}>
                        {(ev.event_type??'').replace(/_/g,' ')}
                      </span>
                      {dist!==null && <span style={{ color:'#2D7A2D', fontSize:'0.72rem', fontWeight:600 }}>📍 {dist} mi</span>}
                    </div>
                    <h3 style={{ fontWeight:800, fontSize:'0.95rem', marginBottom:'0.35rem', color:'#1A1A1A' }}>{ev.title}</h3>
                    <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'0.2rem' }}>📍 {ev.city}, {ev.state}</p>
                    <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'0.65rem' }}>📅 {fmtDate(ev.starts_at)}</p>
                    {ev.description && <p style={{ color:'#666', fontSize:'0.75rem', lineHeight:1.5, marginBottom:'0.65rem' }}>{ev.description.slice(0,90)}{ev.description.length>90?'…':''}</p>}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ color:'#2D7A2D', fontSize:'0.8rem', fontWeight:700 }}>{ev.entry_fee ? `$${ev.entry_fee}` : 'Free'}</span>
                      <span style={{ color:'#AAA', fontSize:'0.72rem' }}>👥 {ev.current_attendees||0} going</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* AI Events */}
      {searched && aiEvents.length > 0 && (
        <div style={{ marginBottom:'2.5rem' }}>
          <h2 style={{ fontWeight:800, fontSize:'1.1rem', color:'#1A1A1A', marginBottom:'0.3rem' }}>🤖 AI-Discovered Events <span style={{ background:'rgba(45,122,45,0.1)', color:'#2D7A2D', borderRadius:'9999px', padding:'0.15rem 0.5rem', fontSize:'0.7rem', fontWeight:700, marginLeft:'0.5rem' }}>{aiEvents.length}</span></h2>
          <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'1rem' }}>Known recurring events near {searchLabel}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'1.1rem' }}>
            {aiEvents.map((ev, i) => {
              const color = TYPE_COLORS[ev.type] ?? '#2D7A2D'
              return (
                <div key={i} style={{ background:'#FFFFFF', border:`1px solid #E0E0E0`, borderRadius:'1rem', overflow:'hidden', borderTop:`3px solid ${color}` }}>
                  <div style={{ width:'100%', height:'80px', background:`linear-gradient(135deg,${color}12,#F5F5F5)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>🚗</div>
                  <div style={{ padding:'1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                      <span style={{ background:`${color}18`, color, border:`1px solid ${color}33`, padding:'0.15rem 0.5rem', borderRadius:'9999px', fontSize:'0.62rem', fontWeight:700 }}>{(ev.type??'').replace(/_/g,' ')}</span>
                      <span style={{ color:'#AAA', fontSize:'0.65rem' }}>AI</span>
                    </div>
                    <h3 style={{ fontWeight:800, fontSize:'0.95rem', color:'#1A1A1A', marginBottom:'0.3rem' }}>{ev.name}</h3>
                    <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'0.2rem' }}>📍 {ev.location}</p>
                    <p style={{ color:'#2D7A2D', fontSize:'0.75rem', marginBottom:'0.5rem', fontWeight:600 }}>🔁 {ev.schedule}</p>
                    {ev.description && <p style={{ color:'#666', fontSize:'0.75rem', lineHeight:1.5, marginBottom:'0.5rem' }}>{ev.description}</p>}
                    {ev.website && <a href={ev.website} target="_blank" rel="noopener noreferrer" style={{ color:'#2D7A2D', fontSize:'0.78rem', fontWeight:600 }}>🔗 Visit Website →</a>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Platform links */}
      {searched && pLinks.length > 0 && (
        <div style={{ marginBottom:'2.5rem' }}>
          <h2 style={{ fontWeight:800, fontSize:'1.1rem', color:'#1A1A1A', marginBottom:'0.3rem' }}>🌐 Find More Events Online</h2>
          <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'1rem' }}>Pre-filled searches for {searchLabel}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:'0.875rem' }}>
            {pLinks.map((pl, i) => (
              <a key={i} href={pl.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
                <div style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'1.25rem', border:'1px solid #E0E0E0', cursor:'pointer', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                  <div style={{ fontSize:'1.75rem' }}>{pl.emoji}</div>
                  <p style={{ fontWeight:700, color:'#1A1A1A', fontSize:'0.95rem', margin:0 }}>{pl.name}</p>
                  <p style={{ color:'#888', fontSize:'0.78rem', margin:0, lineHeight:1.4 }}>{pl.desc}</p>
                  <span style={{ color:'#2D7A2D', fontSize:'0.75rem', marginTop:'0.25rem', fontWeight:600 }}>Search {pl.name} →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {!searched && (
        <div style={{ background:'linear-gradient(135deg,rgba(45,122,45,0.06),rgba(255,215,0,0.06))', borderRadius:'1.25rem', padding:'2.5rem', textAlign:'center', border:'1px solid rgba(45,122,45,0.15)', marginTop:'1rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔍</div>
          <h2 style={{ fontWeight:800, fontSize:'1.3rem', color:'#1A1A1A', marginBottom:'0.5rem' }}>Find Car Events Near You</h2>
          <p style={{ color:'#666', fontSize:'0.9rem', maxWidth:'450px', margin:'0 auto 1.5rem' }}>
            Pre-filled for The Villages, FL — search for local car meets, Cars & Coffee, car shows, and track events throughout central Florida.
          </p>
          <button onClick={()=>setShowSubmit(true)} style={{ background:'transparent', border:'1px solid #E0E0E0', color:'#888', borderRadius:'0.75rem', padding:'0.6rem 1.5rem', cursor:'pointer', fontSize:'0.85rem' }}>
            Or submit your own event →
          </button>
        </div>
      )}
    </div>
  )
}

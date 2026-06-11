'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const SUPABASE_URL  = 'https://vthpgqhlhihnoeawjdyc.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aHBncWhsaGlobm9lYXdqZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODk5NjMsImV4cCI6MjA5NjA2NTk2M30.SnLIQX-Ntn0ba3Ap1lcfG8RULan15E3qGwRAMoDtrXo'

const MAKES = ['Club Car','EZGO','Yamaha','Cushman','Star EV','Advanced EV','Icon EV','Tomberlin','Bintelli','Evolution','Garia','Polaris GEM','Other']
const YEARS = Array.from({length:46}, (_,i) => String(2025-i))
const COLORS = ['White','Black','Red','Blue','Green','Gold','Yellow','Silver','Gray','Orange','Pink','Purple','Custom']
const CART_TYPES = ['Electric','Gas']
const VOLTAGES = ['36V','48V','72V','Other']
const STATUSES = ['active','storage','project','sold']
const STATUS_LABELS: Record<string,string> = { active:'Active', storage:'In Storage', project:'Project Build', sold:'Sold' }
const STATUS_COLORS: Record<string,{bg:string;color:string}> = {
  active:   { bg:'rgba(45,122,45,0.1)',    color:'#2D7A2D' },
  storage:  { bg:'rgba(26,92,154,0.1)',    color:'#1a5c9e' },
  project:  { bg:'rgba(255,215,0,0.15)',   color:'#8B6914' },
  sold:     { bg:'rgba(136,136,136,0.1)',  color:'#666' },
}

const inp: React.CSSProperties = { background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.5rem', color:'#1A1A1A', padding:'0.6rem 0.875rem', fontSize:'0.875rem', outline:'none', width:'100%', boxSizing:'border-box' }
const lbl: React.CSSProperties = { fontSize:'0.65rem', color:'#888', display:'block', marginBottom:'0.3rem', textTransform:'uppercase', letterSpacing:'0.5px' }

const EMPTY_FORM = { make:'Club Car', model:'', year:'2020', cart_type:'Electric', voltage:'48V', color:'White', custom_name:'', modifications:'', notes:'', status:'active', purchase_price:'', purchase_date:'', photo_url:'' }

interface Cart { id: string; make: string; model: string; year: string; cart_type: string; voltage?: string; color?: string; custom_name?: string; modifications?: string; notes?: string; status: string; purchase_price?: number; purchase_date?: string; photo_url?: string; created_at: string }

export default function CartGaragePage() {
  const [user, setUser]       = useState<any>(null)
  const [carts, setCarts]     = useState<Cart[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId]   = useState<string|null>(null)
  const [form, setForm]       = useState({ ...EMPTY_FORM })
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [deleteId, setDeleteId] = useState<string|null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) loadCarts(data.user.id)
      else setLoading(false)
    })
  }, [])

  async function loadCarts(uid: string) {
    setLoading(true)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/cart_garage_vehicles?owner_id=eq.${uid}&order=created_at.desc`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    })
    const data = await res.json()
    setCarts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  function startEdit(cart: Cart) {
    setForm({
      make: cart.make, model: cart.model||'', year: cart.year, cart_type: cart.cart_type,
      voltage: cart.voltage||'48V', color: cart.color||'White', custom_name: cart.custom_name||'',
      modifications: cart.modifications||'', notes: cart.notes||'', status: cart.status||'active',
      purchase_price: cart.purchase_price ? String(cart.purchase_price) : '',
      purchase_date: cart.purchase_date ? cart.purchase_date.split('T')[0] : '',
      photo_url: cart.photo_url||'',
    })
    setEditId(cart.id); setShowAdd(true)
  }

  function cancelForm() {
    setShowAdd(false); setEditId(null); setForm({ ...EMPTY_FORM }); setError('')
  }

  async function saveCart(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError('')
    if (!user) { setError('You must be logged in.'); setSaving(false); return }
    const payload: any = {
      owner_id: user.id, make: form.make, model: form.model||null, year: form.year,
      cart_type: form.cart_type, voltage: form.cart_type==='Electric' ? form.voltage : null,
      color: form.color||null, custom_name: form.custom_name||null,
      modifications: form.modifications||null, notes: form.notes||null,
      status: form.status, photo_url: form.photo_url||null,
      purchase_price: form.purchase_price ? parseFloat(form.purchase_price) : null,
      purchase_date: form.purchase_date || null,
    }
    let res
    if (editId) {
      res = await fetch(`${SUPABASE_URL}/rest/v1/cart_garage_vehicles?id=eq.${editId}`, {
        method:'PATCH',
        headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, 'Content-Type':'application/json', Prefer:'return=minimal' },
        body: JSON.stringify(payload),
      })
    } else {
      res = await fetch(`${SUPABASE_URL}/rest/v1/cart_garage_vehicles`, {
        method:'POST',
        headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, 'Content-Type':'application/json', Prefer:'return=minimal' },
        body: JSON.stringify(payload),
      })
    }
    if (!res.ok) { setError((await res.text()).slice(0,200)) }
    else { cancelForm(); loadCarts(user.id) }
    setSaving(false)
  }

  async function deleteCart(id: string) {
    if (!user) return
    await fetch(`${SUPABASE_URL}/rest/v1/cart_garage_vehicles?id=eq.${id}`, {
      method:'DELETE',
      headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}` },
    })
    setDeleteId(null); loadCarts(user.id)
  }

  if (!user && !loading) {
    return (
      <div style={{ maxWidth:'600px', margin:'4rem auto', textAlign:'center' }}>
        <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🏌️</div>
        <h1 style={{ fontWeight:900, color:'#1A1A1A', marginBottom:'0.5rem' }}>Sign In to Use Your Garage</h1>
        <p style={{ color:'#666', marginBottom:'1.5rem' }}>Your cart garage is personal — sign in to track your carts, mods, and history.</p>
        <a href="/login" style={{ background:'#2D7A2D', color:'white', borderRadius:'0.875rem', padding:'0.75rem 2rem', fontWeight:700, textDecoration:'none', fontSize:'1rem' }}>Sign In →</a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'white', borderRadius:'1.25rem', padding:'2rem', maxWidth:'380px', width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>⚠️</div>
            <h2 style={{ fontWeight:800, marginBottom:'0.5rem', color:'#1A1A1A' }}>Delete This Cart?</h2>
            <p style={{ color:'#666', marginBottom:'1.5rem' }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
              <button onClick={() => deleteCart(deleteId)} style={{ background:'#CC0000', color:'white', border:'none', borderRadius:'0.75rem', padding:'0.7rem 1.75rem', fontWeight:700, cursor:'pointer' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ background:'#F5F5F5', color:'#555', border:'1px solid #E0E0E0', borderRadius:'0.75rem', padding:'0.7rem 1.25rem', cursor:'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.75rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', fontWeight:900, color:'#1A1A1A', marginBottom:'0.3rem' }}>🏌️ Cart Garage</h1>
          <p style={{ color:'#666', fontSize:'0.9rem' }}>Your personal digital garage — track every cart, mod, and memory</p>
        </div>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 1.5rem', fontWeight:700, cursor:'pointer', fontSize:'0.9rem' }}>
            + Add Cart to Garage
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAdd && (
        <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'1.75rem', marginBottom:'2rem', border:'1px solid #E0E0E0' }}>
          <h2 style={{ fontWeight:800, fontSize:'1.2rem', color:'#1A1A1A', marginBottom:'1.25rem' }}>
            {editId ? '✏️ Edit Cart' : '🏌️ Add Cart to Garage'}
          </h2>
          <form onSubmit={saveCart}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(170px,1fr))', gap:'0.875rem', marginBottom:'0.875rem' }}>
              <div><label style={lbl}>Nickname</label><input style={inp} placeholder="My Sunday Cart" value={form.custom_name} onChange={e=>setForm(f=>({...f,custom_name:e.target.value}))} /></div>
              <div><label style={lbl}>Make *</label><select required style={inp} value={form.make} onChange={e=>setForm(f=>({...f,make:e.target.value}))}>{MAKES.map(m=><option key={m} value={m}>{m}</option>)}</select></div>
              <div><label style={lbl}>Model</label><input style={inp} placeholder="DS, TXT, G29…" value={form.model} onChange={e=>setForm(f=>({...f,model:e.target.value}))} /></div>
              <div><label style={lbl}>Year *</label><select required style={inp} value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))}>{YEARS.map(y=><option key={y} value={y}>{y}</option>)}</select></div>
              <div><label style={lbl}>Type *</label><select required style={inp} value={form.cart_type} onChange={e=>setForm(f=>({...f,cart_type:e.target.value}))}>{CART_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
              {form.cart_type==='Electric' && (
                <div><label style={lbl}>Voltage</label><select style={inp} value={form.voltage} onChange={e=>setForm(f=>({...f,voltage:e.target.value}))}>{VOLTAGES.map(v=><option key={v} value={v}>{v}</option>)}</select></div>
              )}
              <div><label style={lbl}>Color</label><select style={inp} value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))}>{COLORS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div><label style={lbl}>Status</label><select style={inp} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{STATUSES.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></div>
              <div><label style={lbl}>Purchase Price ($)</label><input type="number" min="0" style={inp} placeholder="4500" value={form.purchase_price} onChange={e=>setForm(f=>({...f,purchase_price:e.target.value}))} /></div>
              <div><label style={lbl}>Purchase Date</label><input type="date" style={inp} value={form.purchase_date} onChange={e=>setForm(f=>({...f,purchase_date:e.target.value}))} /></div>
              <div style={{ gridColumn:'span 2' }}><label style={lbl}>Photo URL</label><input style={inp} placeholder="https://…" value={form.photo_url} onChange={e=>setForm(f=>({...f,photo_url:e.target.value}))} /></div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem', marginBottom:'1rem' }}>
              <div><label style={lbl}>Modifications</label><textarea rows={3} style={{...inp,resize:'vertical'}} placeholder="6&#34; lift, 23&#34; AT tires, LED lights, stereo…" value={form.modifications} onChange={e=>setForm(f=>({...f,modifications:e.target.value}))} /></div>
              <div><label style={lbl}>Notes</label><textarea rows={3} style={{...inp,resize:'vertical'}} placeholder="Bought from Villages dealer, new batteries 2024…" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} /></div>
            </div>
            {error && <p style={{ color:'#CC0000', fontSize:'0.8rem', marginBottom:'0.75rem' }}>{error}</p>}
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button type="submit" disabled={saving} style={{ background:saving?'#A8C8A8':'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 2rem', fontWeight:700, cursor:saving?'not-allowed':'pointer' }}>
                {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add to Garage'}
              </button>
              <button type="button" onClick={cancelForm} style={{ background:'#F5F5F5', color:'#555', border:'1px solid #E0E0E0', borderRadius:'0.875rem', padding:'0.75rem 1.25rem', cursor:'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Cart List */}
      {loading ? (
        <p style={{ textAlign:'center', color:'#888', padding:'3rem' }}>Loading your garage…</p>
      ) : carts.length === 0 ? (
        <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'3rem', textAlign:'center', border:'1px solid #E0E0E0' }}>
          <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🏌️</div>
          <h2 style={{ fontWeight:800, color:'#1A1A1A', marginBottom:'0.5rem' }}>Your garage is empty</h2>
          <p style={{ color:'#666', marginBottom:'1.5rem' }}>Add your first golf cart to start tracking your fleet</p>
          <button onClick={() => setShowAdd(true)} style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 1.75rem', fontWeight:700, cursor:'pointer' }}>
            + Add Your First Cart
          </button>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:'1.25rem' }}>
          {carts.map(c => {
            const sstyle = STATUS_COLORS[c.status] ?? STATUS_COLORS.active
            return (
              <div key={c.id} style={{ background:'#FFFFFF', borderRadius:'1.1rem', overflow:'hidden', border:'1px solid #E0E0E0', borderTop:'3px solid #2D7A2D' }}>
                {c.photo_url
                  ? <img src={c.photo_url} alt={c.custom_name||c.make} style={{ width:'100%', height:'180px', objectFit:'cover' }} />
                  : <div style={{ height:'130px', background:'linear-gradient(135deg,rgba(45,122,45,0.08),rgba(255,215,0,0.08))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3.5rem' }}>🏌️</div>
                }
                <div style={{ padding:'1.25rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                    <h3 style={{ fontWeight:900, fontSize:'1rem', color:'#1A1A1A', lineHeight:1.2 }}>
                      {c.custom_name || `${c.year} ${c.make}`}
                    </h3>
                    <span style={{ background:sstyle.bg, color:sstyle.color, border:`1px solid ${sstyle.color}33`, fontSize:'0.65rem', fontWeight:700, padding:'0.2rem 0.55rem', borderRadius:'9999px', flexShrink:0, marginLeft:'0.5rem' }}>
                      {STATUS_LABELS[c.status]||c.status}
                    </span>
                  </div>
                  <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'0.25rem' }}>
                    {c.year} {c.make}{c.model ? ` ${c.model}` : ''} • {c.cart_type}{c.voltage ? ` ${c.voltage}` : ''}
                  </p>
                  {c.color && <p style={{ color:'#888', fontSize:'0.78rem', marginBottom:'0.5rem' }}>🎨 {c.color}</p>}
                  {c.modifications && (
                    <div style={{ background:'rgba(45,122,45,0.05)', borderRadius:'0.5rem', padding:'0.5rem 0.625rem', marginBottom:'0.5rem', border:'1px solid rgba(45,122,45,0.12)' }}>
                      <p style={{ color:'#2D7A2D', fontSize:'0.72rem', fontWeight:700, marginBottom:'0.15rem' }}>MODS</p>
                      <p style={{ color:'#555', fontSize:'0.78rem', lineHeight:1.4 }}>{c.modifications.slice(0,80)}{c.modifications.length>80?'…':''}</p>
                    </div>
                  )}
                  {c.purchase_price && <p style={{ color:'#888', fontSize:'0.75rem', marginBottom:'0.25rem' }}>💰 Paid: ${Number(c.purchase_price).toLocaleString()}</p>}
                  <div style={{ display:'flex', gap:'0.625rem', marginTop:'0.875rem' }}>
                    <button onClick={() => startEdit(c)} style={{ flex:1, background:'#F5F5F5', color:'#555', border:'1px solid #E0E0E0', borderRadius:'0.625rem', padding:'0.5rem', fontSize:'0.8rem', cursor:'pointer', fontWeight:600 }}>✏️ Edit</button>
                    <button onClick={() => setDeleteId(c.id)} style={{ background:'#FFF2F2', color:'#CC0000', border:'1px solid #FFD0D0', borderRadius:'0.625rem', padding:'0.5rem 0.75rem', fontSize:'0.8rem', cursor:'pointer' }}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

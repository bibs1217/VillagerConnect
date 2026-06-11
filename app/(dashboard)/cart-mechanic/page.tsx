'use client'
export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const MAKES = ['Club Car','EZGO','Yamaha','Cushman','Star EV','Advanced EV','Icon EV','Tomberlin','Bintelli','Evolution','Garia','Polaris GEM','Other']
const YEARS = Array.from({length:46}, (_,i) => String(2025-i))
const VENDORS = [
  { name:'Buggies Unlimited', emoji:'🛒', url:'https://www.buggiesunlimited.com', desc:'10K+ parts in stock' },
  { name:'Golf Cart Parts Nation', emoji:'🏌️', url:'https://www.golfcartpartsnation.com', desc:'Huge catalog' },
  { name:'RHOX Parts', emoji:'⚙️', url:'https://www.rhox.com', desc:'OEM & aftermarket' },
  { name:'Cart Parts', emoji:'🔩', url:'https://www.cartparts.com', desc:'OEM parts' },
  { name:'Golf Cart Tire Supply', emoji:'🛞', url:'https://www.golfcarttiresupply.com', desc:'Tires & wheels' },
  { name:'10L0L', emoji:'⭐', url:'https://www.10l0l.com', desc:'Accessories' },
]

interface Msg { role:'user'|'assistant'; content:string }

function CartContextPanel({ ctx, setCtx }: { ctx: { make:string; model:string; year:string; cartType:string; voltage:string; issue:string }; setCtx: (c: any) => void }) {
  const inp: React.CSSProperties = { background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.5rem', color:'#1A1A1A', padding:'0.5rem 0.75rem', fontSize:'0.82rem', outline:'none', width:'100%', boxSizing:'border-box' }
  const lbl: React.CSSProperties = { fontSize:'0.62rem', color:'#888', display:'block', marginBottom:'0.2rem', textTransform:'uppercase', letterSpacing:'0.4px' }
  return (
    <div style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'1.25rem', marginBottom:'1.25rem', border:'1px solid #E0E0E0' }}>
      <p style={{ fontWeight:700, fontSize:'0.85rem', color:'#1A1A1A', marginBottom:'0.875rem' }}>🏌️ Your Cart (Optional)</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.625rem', marginBottom:'0.625rem' }}>
        <div><label style={lbl}>Make</label><select style={inp} value={ctx.make} onChange={e=>setCtx((c:any)=>({...c,make:e.target.value}))}><option value="">Any</option>{MAKES.map(m=><option key={m} value={m}>{m}</option>)}</select></div>
        <div><label style={lbl}>Model</label><input style={inp} placeholder="DS, TXT…" value={ctx.model} onChange={e=>setCtx((c:any)=>({...c,model:e.target.value}))} /></div>
        <div><label style={lbl}>Year</label><select style={inp} value={ctx.year} onChange={e=>setCtx((c:any)=>({...c,year:e.target.value}))}><option value="">Any</option>{YEARS.map(y=><option key={y} value={y}>{y}</option>)}</select></div>
        <div><label style={lbl}>Type</label><select style={inp} value={ctx.cartType} onChange={e=>setCtx((c:any)=>({...c,cartType:e.target.value}))}><option value="">Unknown</option><option>Electric</option><option>Gas</option></select></div>
      </div>
      {ctx.cartType==='Electric' && (
        <div style={{ marginBottom:'0.625rem' }}>
          <label style={lbl}>Voltage</label>
          <select style={inp} value={ctx.voltage} onChange={e=>setCtx((c:any)=>({...c,voltage:e.target.value}))}>
            <option value="">Unknown</option><option>36V</option><option>48V</option><option>72V</option>
          </select>
        </div>
      )}
      <div><label style={lbl}>Current Issue</label><input style={inp} placeholder="No power, battery not charging…" value={ctx.issue} onChange={e=>setCtx((c:any)=>({...c,issue:e.target.value}))} /></div>
    </div>
  )
}

export default function CartMechanicPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(false)
  const [ctx, setCtx]           = useState({ make:'', model:'', year:'', cartType:'', voltage:'', issue:'' })
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase  = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, loading])

  function speak(text: string) {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/[#*`_~\[\]]/g,'').slice(0,2000))
    u.rate = 0.95; u.pitch = 1; u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return
    const cartContext = [ctx.year, ctx.make, ctx.model, ctx.cartType, ctx.voltage ? `${ctx.voltage}` : '', ctx.issue ? `issue: ${ctx.issue}` : ''].filter(Boolean).join(' ')
    setInput('')
    const newMessages: Msg[] = [...messages, { role:'user', content }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/cart-mechanic', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ messages: newMessages, cartContext }),
      })
      if (!res.ok || !res.body) { setMessages(m=>[...m,{ role:'assistant', content:'Sorry, I encountered an error. Please try again.' }]); setLoading(false); return }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      setMessages(m=>[...m,{ role:'assistant', content:'' }])
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const payload = line.slice(5).trim()
          if (payload==='[DONE]') break
          try {
            const ev = JSON.parse(payload)
            if (ev.type==='content_block_delta'&&ev.delta?.type==='text_delta') {
              full += ev.delta.text
              setMessages(m=>[...m.slice(0,-1),{ role:'assistant', content:full }])
            }
          } catch {}
        }
      }
      if (autoSpeak) speak(full)
    } catch {
      setMessages(m=>[...m,{ role:'assistant', content:'Connection error. Please try again.'}])
    }
    setLoading(false)
  }

  const STARTER_QS = [
    'My cart won\'t move — where do I start?',
    'How do I test my batteries?',
    'My cart is slow and losing speed — what\'s wrong?',
    'How do I install a lift kit on a Club Car DS?',
    'Is my cart street legal for The Villages cart paths?',
    'How do I convert to lithium batteries?',
  ]

  return (
    <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'minmax(0,1fr) 280px', gap:'1.5rem', alignItems:'start' }}>
      {/* Main chat */}
      <div>
        <h1 style={{ fontSize:'2rem', fontWeight:900, color:'#1A1A1A', marginBottom:'0.3rem' }}>🔧 AI Cart Mechanic</h1>
        <p style={{ color:'#666', marginBottom:'1.25rem', fontSize:'0.9rem' }}>Expert golf cart diagnosis and repair — powered by AI, tuned for The Villages</p>

        <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', border:'1px solid #E0E0E0', overflow:'hidden' }}>
          {/* Chat header */}
          <div style={{ background:'linear-gradient(135deg,#2D7A2D,#1a5c1a)', padding:'1rem 1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontWeight:800, color:'white', fontSize:'1rem', marginBottom:'0.15rem' }}>VillagerConnect AI Mechanic</p>
              <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.78rem' }}>30+ years of golf cart expertise</p>
            </div>
            <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.75rem' }}>Auto-speak</span>
              <button onClick={()=>setAutoSpeak(a=>!a)} style={{ background:autoSpeak?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'9999px', padding:'0.3rem 0.75rem', color:'white', fontSize:'0.75rem', cursor:'pointer', fontWeight:600 }}>
                {autoSpeak ? '🔊 ON' : '🔇 OFF'}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height:'420px', overflowY:'auto', padding:'1.25rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
            {messages.length === 0 && (
              <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'0.75rem' }}>
                <div style={{ fontSize:'3rem' }}>🔧</div>
                <p style={{ fontWeight:700, color:'#1A1A1A', fontSize:'1rem', textAlign:'center' }}>Ask me anything about your golf cart</p>
                <p style={{ color:'#888', fontSize:'0.83rem', textAlign:'center' }}>Diagnosis, repairs, upgrades, parts — I know them all</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', marginTop:'0.5rem' }}>
                  {STARTER_QS.map((q, i) => (
                    <button key={i} onClick={() => sendMessage(q)} style={{ background:'rgba(45,122,45,0.08)', border:'1px solid rgba(45,122,45,0.2)', color:'#2D7A2D', padding:'0.4rem 0.875rem', borderRadius:'9999px', fontSize:'0.78rem', cursor:'pointer', fontWeight:500 }}>{q}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:m.role==='user'?'flex-end':'flex-start', gap:'0.25rem' }}>
                <div style={{ maxWidth:'85%', padding:'0.875rem 1.1rem', borderRadius:m.role==='user'?'1rem 1rem 0 1rem':'1rem 1rem 1rem 0', background:m.role==='user'?'#2D7A2D':'#F5F5F5', color:m.role==='user'?'white':'#1A1A1A', fontSize:'0.875rem', lineHeight:1.6, whiteSpace:'pre-wrap' }}>
                  {m.content || (loading && i===messages.length-1 ? <span style={{ opacity:0.6 }}>Thinking…</span> : '')}
                </div>
                {m.role==='assistant' && m.content && (
                  <button onClick={()=>speak(m.content)} style={{ background:'transparent', border:'none', color:'#888', fontSize:'0.72rem', cursor:'pointer', padding:'0 0.25rem' }}>🔊 Listen</button>
                )}
              </div>
            ))}
            {loading && messages[messages.length-1]?.role==='user' && (
              <div style={{ display:'flex', alignItems:'flex-start' }}>
                <div style={{ background:'#F5F5F5', borderRadius:'1rem 1rem 1rem 0', padding:'0.875rem 1.1rem' }}>
                  <span style={{ color:'#888', fontSize:'0.875rem' }}>Diagnosing…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop:'1px solid #E0E0E0', padding:'1rem 1.25rem', display:'flex', gap:'0.75rem' }}>
            <input
              style={{ flex:1, background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.75rem', color:'#1A1A1A', padding:'0.75rem 1rem', fontSize:'0.875rem', outline:'none' }}
              placeholder="Describe your cart issue…"
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&(e.preventDefault(),sendMessage())}
              disabled={loading}
            />
            <button onClick={()=>sendMessage()} disabled={!input.trim()||loading}
              style={{ background:!input.trim()||loading?'#A8C8A8':'#2D7A2D', color:'white', border:'none', borderRadius:'0.75rem', padding:'0.75rem 1.25rem', fontWeight:700, cursor:!input.trim()||loading?'not-allowed':'pointer', fontSize:'0.875rem' }}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <CartContextPanel ctx={ctx} setCtx={setCtx} />

        {messages.length > 0 && (
          <button onClick={()=>{ setMessages([]); window.speechSynthesis?.cancel() }}
            style={{ width:'100%', background:'#F5F5F5', color:'#666', border:'1px solid #E0E0E0', borderRadius:'0.875rem', padding:'0.625rem', cursor:'pointer', fontSize:'0.82rem', marginBottom:'1.25rem' }}>
            🗑️ Clear Chat
          </button>
        )}

        {/* Vendors */}
        <div style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'1.25rem', border:'1px solid #E0E0E0' }}>
          <p style={{ fontWeight:700, fontSize:'0.85rem', color:'#1A1A1A', marginBottom:'0.875rem' }}>🛒 Parts Suppliers</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {VENDORS.map((v, i) => (
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'0.625rem', padding:'0.625rem 0.75rem', background:'#F9F9F9', borderRadius:'0.75rem', border:'1px solid #F0F0F0' }}>
                <span style={{ fontSize:'1.1rem' }}>{v.emoji}</span>
                <div>
                  <p style={{ fontWeight:600, color:'#1A1A1A', fontSize:'0.82rem', margin:0 }}>{v.name}</p>
                  <p style={{ color:'#888', fontSize:'0.72rem', margin:0 }}>{v.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

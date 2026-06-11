'use client'
export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

const SUPABASE_URL  = 'https://vthpgqhlhihnoeawjdyc.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aHBncWhsaGlobm9lYXdqZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODk5NjMsImV4cCI6MjA5NjA2NTk2M30.SnLIQX-Ntn0ba3Ap1lcfG8RULan15E3qGwRAMoDtrXo'

const OCCASIONS = [
  { label:'Christmas',       emoji:'🎄' },
  { label:'Halloween',       emoji:'🎃' },
  { label:'4th of July',     emoji:'🇺🇸' },
  { label:'Spring/Easter',   emoji:'🌸' },
  { label:'Game Day',        emoji:'🏈' },
  { label:'Birthday',        emoji:'🎂' },
  { label:'Wedding',         emoji:'💒' },
  { label:'Summer',          emoji:'🏖️' },
  { label:'Winter',          emoji:'❄️' },
  { label:'Thanksgiving',    emoji:'🍂' },
  { label:'New Years',       emoji:'🎆' },
  { label:'Valentines Day',  emoji:'💕' },
  { label:'St Patricks Day', emoji:'🍀' },
  { label:'Easter',          emoji:'🐣' },
  { label:'Fall Festival',   emoji:'👻' },
  { label:'Party',           emoji:'🎉' },
  { label:'Golf Tournament', emoji:'⛳' },
  { label:'Villages Event',  emoji:'🏌️' },
]

const ALL_PHOTOS = [
  { id:'c1', occasion:'Christmas',     emoji:'🎄', url:'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&q=85', height:260 },
  { id:'c2', occasion:'Christmas',     emoji:'🎄', url:'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=85', height:220 },
  { id:'c3', occasion:'Christmas',     emoji:'🎄', url:'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=400&q=85', height:300 },
  { id:'j1', occasion:'4th of July',   emoji:'🇺🇸', url:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=85', height:240 },
  { id:'j2', occasion:'4th of July',   emoji:'🇺🇸', url:'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=400&q=85', height:280 },
  { id:'h1', occasion:'Halloween',     emoji:'🎃', url:'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&q=85', height:250 },
  { id:'h2', occasion:'Halloween',     emoji:'🎃', url:'https://images.unsplash.com/photo-1570393277671-c2f9dfab98c6?w=400&q=85', height:230 },
  { id:'e1', occasion:'Spring/Easter', emoji:'🌸', url:'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400&q=85', height:270 },
  { id:'e2', occasion:'Spring/Easter', emoji:'🌸', url:'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=85', height:220 },
  { id:'g1', occasion:'Game Day',      emoji:'🏈', url:'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=85', height:260 },
  { id:'b1', occasion:'Birthday',      emoji:'🎂', url:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=85', height:240 },
  { id:'b2', occasion:'Birthday',      emoji:'🎂', url:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=85', height:260 },
  { id:'w1', occasion:'Wedding',       emoji:'💒', url:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=85', height:280 },
  { id:'w2', occasion:'Wedding',       emoji:'💒', url:'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=85', height:230 },
  { id:'s1', occasion:'Summer',        emoji:'🏖️', url:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=85', height:250 },
  { id:'s2', occasion:'Summer',        emoji:'🏖️', url:'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=85', height:220 },
]

const GALLERY_FILTERS = ['All','Christmas','4th of July','Halloween','Spring/Easter','Game Day','Birthday','Wedding','Summer']

const STARTER_QS = [
  'How do I decorate my cart for Christmas?',
  'What do I need for a 4th of July theme?',
  'Give me Halloween decorating ideas',
  'How do I attach lights to my golf cart?',
  'Best decorations for a Villages parade?',
  'What materials hold up in Florida heat and humidity?',
  'How do I do a wedding cart decoration?',
  'Ideas for a birthday golf cart surprise?',
]

const inp: React.CSSProperties = { background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'0.5rem', color:'#1A1A1A', padding:'0.6rem 0.875rem', fontSize:'1rem', outline:'none', width:'100%', boxSizing:'border-box' }
const lbl: React.CSSProperties = { fontSize:'0.65rem', color:'#888', display:'block', marginBottom:'0.3rem', textTransform:'uppercase', letterSpacing:'0.5px' }

interface Msg  { role:'user'|'assistant'; content:string }
interface Post { id:string; username:string; before_photo_url:string; after_photo_url:string; caption?:string; occasion:string; likes:number; created_at:string }

export default function CartDecoratingPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  // Section 1 – Search
  const [searchInput,   setSearchInput]   = useState('')

  // Section 2 – Gallery
  const [galleryFilter, setGalleryFilter] = useState('All')
  const [liked,         setLiked]         = useState<Set<string>>(new Set())

  // Section 3 – Upload
  const [beforeFile,    setBeforeFile]    = useState<File|null>(null)
  const [afterFile,     setAfterFile]     = useState<File|null>(null)
  const [beforePreview, setBeforePreview] = useState('')
  const [afterPreview,  setAfterPreview]  = useState('')
  const [caption,       setCaption]       = useState('')
  const [uploadOcc,     setUploadOcc]     = useState('')
  const [saving,        setSaving]        = useState(false)
  const [uploadDone,    setUploadDone]    = useState(false)
  const [uploadError,   setUploadError]   = useState('')
  const [posts,         setPosts]         = useState<Post[]>([])
  const [postsLoading,  setPostsLoading]  = useState(true)
  const [postView,      setPostView]      = useState<Record<string,'before'|'after'>>({})

  // Section 4 – AI Chat
  const [messages,    setMessages]    = useState<Msg[]>([])
  const [chatInput,   setChatInput]   = useState('')
  const [chatOcc,     setChatOcc]     = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  const chatRef    = useRef<HTMLDivElement>(null)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const beforeRef  = useRef<HTMLInputElement>(null)
  const afterRef   = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    loadPosts()
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, chatLoading])

  async function loadPosts() {
    setPostsLoading(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/cart_decorating_posts?select=*&order=created_at.desc&limit=20`, {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
      })
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch { setPosts([]) }
    setPostsLoading(false)
  }

  function pickFile(file: File, which: 'before'|'after') {
    const url = URL.createObjectURL(file)
    if (which === 'before') { setBeforeFile(file); setBeforePreview(url) }
    else { setAfterFile(file); setAfterPreview(url) }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!beforeFile || !afterFile) { setUploadError('Please select both a Before and After photo.'); return }
    if (!user) { setUploadError('Please sign in to share your cart.'); return }
    setSaving(true); setUploadError('')

    try {
      const ts = Date.now()
      const ext = (f: File) => f.name.split('.').pop() ?? 'jpg'
      const beforePath = `${user.id}/${ts}_before.${ext(beforeFile)}`
      const afterPath  = `${user.id}/${ts}_after.${ext(afterFile)}`

      const { error: bErr } = await supabase.storage.from('cart-decorating').upload(beforePath, beforeFile, { upsert: true })
      if (bErr) throw new Error(bErr.message)
      const { error: aErr } = await supabase.storage.from('cart-decorating').upload(afterPath, afterFile, { upsert: true })
      if (aErr) throw new Error(aErr.message)

      const { data: { publicUrl: beforeUrl } } = supabase.storage.from('cart-decorating').getPublicUrl(beforePath)
      const { data: { publicUrl: afterUrl  } } = supabase.storage.from('cart-decorating').getPublicUrl(afterPath)

      const res = await fetch(`${SUPABASE_URL}/rest/v1/cart_decorating_posts`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          user_id: user.id,
          username: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Villager',
          before_photo_url: beforeUrl,
          after_photo_url: afterUrl,
          caption: caption || null,
          occasion: uploadOcc || null,
          likes: 0,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setUploadDone(true)
      setBeforeFile(null); setAfterFile(null); setBeforePreview(''); setAfterPreview(''); setCaption(''); setUploadOcc('')
      loadPosts()
    } catch (err: any) { setUploadError(err.message ?? 'Upload failed') }
    setSaving(false)
  }

  async function likePost(id: string, current: number) {
    await fetch(`${SUPABASE_URL}/rest/v1/cart_decorating_posts?id=eq.${id}`, {
      method: 'PATCH',
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ likes: current + 1 }),
    })
    setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: current + 1 } : p))
  }

  function askAI(text: string, occasion?: string) {
    if (occasion) setChatOcc(occasion)
    chatRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })
    setTimeout(() => sendMessage(text, occasion), 300)
  }

  async function sendMessage(text?: string, occ?: string) {
    const content = (text ?? chatInput).trim()
    if (!content || chatLoading) return
    setChatInput('')
    const newMsgs: Msg[] = [...messages, { role:'user', content }]
    setMessages(newMsgs)
    setChatLoading(true)

    try {
      const res = await fetch('/api/cart-decorating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, occasion: occ ?? chatOcc }),
      })
      if (!res.ok || !res.body) { setMessages(m => [...m, { role:'assistant', content:'Sorry, I had an error. Please try again.' }]); setChatLoading(false); return }

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      setMessages(m => [...m, { role:'assistant', content:'' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const payload = line.slice(5).trim()
          if (payload === '[DONE]') break
          try {
            const ev = JSON.parse(payload)
            if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
              full += ev.delta.text
              setMessages(m => [...m.slice(0,-1), { role:'assistant', content:full }])
            }
          } catch {}
        }
      }
    } catch { setMessages(m => [...m, { role:'assistant', content:'Connection error. Please try again.' }]) }
    setChatLoading(false)
  }

  const filteredPhotos = galleryFilter === 'All' ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.occasion === galleryFilter)

  return (
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

      {/* ─── HERO HEADER ─── */}
      <div style={{ background:'linear-gradient(135deg,#2D7A2D,#1a5c1a)', borderRadius:'1.5rem', padding:'2rem 2rem 1.75rem', marginBottom:'2rem', color:'white' }}>
        <h1 style={{ fontSize:'2.2rem', fontWeight:900, marginBottom:'0.4rem' }}>🎨 Golf Cart Decorating</h1>
        <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'1rem', maxWidth:'600px', lineHeight:1.5 }}>
          Transform your cart for any occasion — from Christmas parades to Fourth of July celebrations. Get AI-powered ideas, share your designs, and find inspiration from the community.
        </p>
        <div style={{ display:'flex', gap:'1.5rem', marginTop:'1.25rem', flexWrap:'wrap' }}>
          {[['🎄','Holiday Parades'],['🏆','Decorating Contests'],['📸','Share Your Cart'],['🤖','AI Assistant']].map(([e,l])=>(
            <div key={l} style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:'rgba(255,255,255,0.85)', fontSize:'0.85rem' }}>
              <span style={{ fontSize:'1.1rem' }}>{e}</span><span>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 1: SEARCH ─── */}
      <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'1.75rem', marginBottom:'2rem', border:'1px solid #E0E0E0' }}>
        <h2 style={{ fontWeight:800, fontSize:'1.2rem', color:'#1A1A1A', marginBottom:'1rem' }}>🔍 Find Decorating Ideas</h2>
        <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem' }}>
          <input
            style={{ ...inp, borderRadius:'9999px', fontSize:'1rem', padding:'0.75rem 1.25rem' }}
            placeholder="Search decorating ideas… e.g. Christmas, 4th of July, Halloween, Birthday, Wedding"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && searchInput.trim() && askAI(`Give me golf cart decorating ideas for: ${searchInput}`, searchInput)}
          />
          <button
            onClick={() => searchInput.trim() && askAI(`Give me golf cart decorating ideas for: ${searchInput}`, searchInput)}
            style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'9999px', padding:'0.75rem 1.75rem', fontWeight:700, fontSize:'1rem', cursor:'pointer', whiteSpace:'nowrap' }}>
            Get Ideas
          </button>
        </div>

        <p style={{ fontSize:'0.7rem', color:'#888', marginBottom:'0.75rem', textTransform:'uppercase', letterSpacing:'0.5px' }}>Popular Occasions</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
          {OCCASIONS.map(o => (
            <button key={o.label} onClick={() => askAI(`How do I decorate my golf cart for ${o.label}? Give me a complete materials list and step-by-step instructions.`, o.label)}
              style={{ background:'#F5F5F5', border:'1px solid #E0E0E0', color:'#444', padding:'0.45rem 1rem', borderRadius:'9999px', fontSize:'0.85rem', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.375rem', fontWeight:500, minHeight:'40px' }}>
              <span>{o.emoji}</span><span>{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2: INSPIRATION GALLERY ─── */}
      <div style={{ marginBottom:'2rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem', flexWrap:'wrap', gap:'0.75rem' }}>
          <h2 style={{ fontWeight:800, fontSize:'1.2rem', color:'#1A1A1A' }}>📸 Decorating Inspiration</h2>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {GALLERY_FILTERS.map(f => (
              <button key={f} onClick={() => setGalleryFilter(f)}
                style={{ background:galleryFilter===f?'rgba(45,122,45,0.1)':'#FFFFFF', border:`1px solid ${galleryFilter===f?'rgba(45,122,45,0.4)':'#E0E0E0'}`, color:galleryFilter===f?'#2D7A2D':'#555', padding:'0.35rem 0.875rem', borderRadius:'9999px', fontSize:'0.8rem', cursor:'pointer', fontWeight:galleryFilter===f?700:400 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{ columns:'260px', columnGap:'1rem' }}>
          {filteredPhotos.map(photo => (
            <div key={photo.id} style={{ breakInside:'avoid', marginBottom:'1rem', background:'#FFFFFF', borderRadius:'1rem', overflow:'hidden', border:'1px solid #E0E0E0' }}>
              <div style={{ position:'relative' }}>
                <img
                  src={photo.url}
                  alt={`${photo.occasion} decorating inspiration`}
                  loading="lazy"
                  style={{ width:'100%', height:`${photo.height}px`, objectFit:'cover', display:'block' }}
                  onError={e => { (e.target as HTMLImageElement).style.display='none' }}
                />
                {/* Occasion badge */}
                <div style={{ position:'absolute', top:'0.625rem', left:'0.625rem', background:'rgba(0,0,0,0.55)', color:'white', padding:'0.2rem 0.6rem', borderRadius:'9999px', fontSize:'0.7rem', fontWeight:700, backdropFilter:'blur(4px)', display:'flex', alignItems:'center', gap:'0.3rem' }}>
                  <span>{photo.emoji}</span><span>{photo.occasion}</span>
                </div>
                {/* Heart button */}
                <button
                  onClick={() => setLiked(prev => { const n=new Set(prev); n.has(photo.id)?n.delete(photo.id):n.add(photo.id); return n })}
                  style={{ position:'absolute', top:'0.625rem', right:'0.625rem', background:'rgba(0,0,0,0.45)', border:'none', borderRadius:'9999px', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1rem', backdropFilter:'blur(4px)' }}>
                  {liked.has(photo.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div style={{ padding:'0.875rem' }}>
                <button
                  onClick={() => askAI(`How do I decorate my golf cart for ${photo.occasion}? Give me a complete materials list, step-by-step instructions, and tips for The Villages Florida.`, photo.occasion)}
                  style={{ width:'100%', background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.625rem', padding:'0.6rem', fontWeight:700, fontSize:'0.82rem', cursor:'pointer' }}>
                  🎨 Get Instructions
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div style={{ textAlign:'center', padding:'3rem', color:'#888', background:'#FFFFFF', borderRadius:'1rem', border:'1px solid #E0E0E0' }}>
            <p>No photos for this filter</p>
          </div>
        )}
      </div>

      {/* ─── SECTION 3: BEFORE & AFTER ─── */}
      <div style={{ marginBottom:'2rem' }}>
        <h2 style={{ fontWeight:800, fontSize:'1.2rem', color:'#1A1A1A', marginBottom:'0.4rem' }}>📷 Share Your Decorated Cart!</h2>
        <p style={{ color:'#666', fontSize:'0.875rem', marginBottom:'1.25rem' }}>Show the community your before and after. Be part of The Villages' most creative tradition!</p>

        {/* Upload form */}
        <div style={{ background:'#FFFFFF', borderRadius:'1.25rem', padding:'1.75rem', border:'1px solid #E0E0E0', marginBottom:'1.5rem' }}>
          {uploadDone ? (
            <div style={{ textAlign:'center', padding:'2rem 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎉</div>
              <h3 style={{ fontWeight:800, color:'#2D7A2D', marginBottom:'0.5rem' }}>Your cart is in the gallery!</h3>
              <p style={{ color:'#666', marginBottom:'1.5rem' }}>Thanks for sharing — the community will love it.</p>
              <button onClick={() => setUploadDone(false)} style={{ background:'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 2rem', fontWeight:700, cursor:'pointer' }}>Share Another →</button>
            </div>
          ) : (
            <form onSubmit={handleUpload}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}>
                {/* Before photo */}
                <div>
                  <label style={lbl}>Before Photo</label>
                  <div
                    onClick={() => beforeRef.current?.click()}
                    style={{ height:'180px', border:`2px dashed ${beforePreview?'#2D7A2D':'#E0E0E0'}`, borderRadius:'1rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', overflow:'hidden', background:'#F9F9F9', position:'relative' }}>
                    {beforePreview ? (
                      <img src={beforePreview} alt="Before" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    ) : (
                      <>
                        <span style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>📷</span>
                        <p style={{ color:'#888', fontSize:'0.82rem', fontWeight:600 }}>Before Photo</p>
                        <p style={{ color:'#BBB', fontSize:'0.72rem' }}>Click to upload</p>
                      </>
                    )}
                    {beforePreview && <div style={{ position:'absolute', top:'0.5rem', left:'0.5rem', background:'rgba(45,122,45,0.8)', color:'white', borderRadius:'9999px', padding:'0.15rem 0.6rem', fontSize:'0.68rem', fontWeight:700 }}>BEFORE</div>}
                  </div>
                  <input ref={beforeRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => e.target.files?.[0] && pickFile(e.target.files[0],'before')} />
                </div>

                {/* After photo */}
                <div>
                  <label style={lbl}>After Photo</label>
                  <div
                    onClick={() => afterRef.current?.click()}
                    style={{ height:'180px', border:`2px dashed ${afterPreview?'#FFD700':'#E0E0E0'}`, borderRadius:'1rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', overflow:'hidden', background:'#F9F9F9', position:'relative' }}>
                    {afterPreview ? (
                      <img src={afterPreview} alt="After" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    ) : (
                      <>
                        <span style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>✨</span>
                        <p style={{ color:'#888', fontSize:'0.82rem', fontWeight:600 }}>After Photo</p>
                        <p style={{ color:'#BBB', fontSize:'0.72rem' }}>Click to upload</p>
                      </>
                    )}
                    {afterPreview && <div style={{ position:'absolute', top:'0.5rem', left:'0.5rem', background:'rgba(255,215,0,0.9)', color:'#1A1A1A', borderRadius:'9999px', padding:'0.15rem 0.6rem', fontSize:'0.68rem', fontWeight:700 }}>AFTER</div>}
                  </div>
                  <input ref={afterRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => e.target.files?.[0] && pickFile(e.target.files[0],'after')} />
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'0.875rem', marginBottom:'1rem' }}>
                <div>
                  <label style={lbl}>Caption</label>
                  <input style={inp} placeholder="e.g. Our Christmas cart ready for the Brownwood parade!" value={caption} onChange={e=>setCaption(e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Occasion</label>
                  <select style={inp} value={uploadOcc} onChange={e=>setUploadOcc(e.target.value)}>
                    <option value="">Select…</option>
                    {OCCASIONS.map(o => <option key={o.label} value={o.label}>{o.emoji} {o.label}</option>)}
                  </select>
                </div>
              </div>

              {uploadError && <p style={{ color:'#CC0000', fontSize:'0.8rem', marginBottom:'0.75rem' }}>{uploadError}</p>}
              {!user && <p style={{ color:'#888', fontSize:'0.8rem', marginBottom:'0.75rem' }}>⚠️ <a href="/login" style={{ color:'#2D7A2D', fontWeight:600 }}>Sign in</a> to share your cart with the community.</p>}

              <button type="submit" disabled={saving||!beforeFile||!afterFile}
                style={{ background:saving||!beforeFile||!afterFile?'#A8C8A8':'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.75rem 2rem', fontWeight:700, fontSize:'1rem', cursor:saving||!beforeFile||!afterFile?'not-allowed':'pointer' }}>
                {saving ? 'Uploading…' : '📤 Share My Cart'}
              </button>
            </form>
          )}
        </div>

        {/* Community gallery */}
        <h3 style={{ fontWeight:800, fontSize:'1.05rem', color:'#1A1A1A', marginBottom:'0.75rem' }}>
          🌟 Community Gallery
          <span style={{ background:'rgba(45,122,45,0.1)', color:'#2D7A2D', borderRadius:'9999px', padding:'0.15rem 0.625rem', fontSize:'0.72rem', fontWeight:700, marginLeft:'0.5rem' }}>{posts.length}</span>
        </h3>

        {postsLoading ? (
          <p style={{ textAlign:'center', color:'#888', padding:'2rem' }}>Loading community posts…</p>
        ) : posts.length === 0 ? (
          <div style={{ background:'#FFFFFF', borderRadius:'1rem', padding:'2rem', textAlign:'center', border:'1px solid #E0E0E0', color:'#888' }}>
            <p style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>📸</p>
            <p style={{ fontWeight:600, marginBottom:'0.25rem' }}>No community posts yet</p>
            <p style={{ fontSize:'0.82rem' }}>Be the first to share your decorated cart!</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:'1.1rem' }}>
            {posts.map(post => {
              const view = postView[post.id] ?? 'after'
              return (
                <div key={post.id} style={{ background:'#FFFFFF', borderRadius:'1rem', overflow:'hidden', border:'1px solid #E0E0E0' }}>
                  {/* Before/After toggle image */}
                  <div style={{ position:'relative', height:'220px' }}>
                    <img
                      src={view==='before' ? post.before_photo_url : post.after_photo_url}
                      alt={view}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                    {/* Toggle bar */}
                    <div style={{ position:'absolute', bottom:'0.625rem', left:'50%', transform:'translateX(-50%)', display:'flex', background:'rgba(0,0,0,0.5)', borderRadius:'9999px', overflow:'hidden', backdropFilter:'blur(4px)' }}>
                      <button onClick={() => setPostView(v => ({ ...v, [post.id]:'before' }))}
                        style={{ background:view==='before'?'white':'transparent', color:view==='before'?'#1A1A1A':'white', border:'none', padding:'0.3rem 0.875rem', fontSize:'0.72rem', fontWeight:700, cursor:'pointer', borderRadius:'9999px' }}>
                        Before
                      </button>
                      <button onClick={() => setPostView(v => ({ ...v, [post.id]:'after' }))}
                        style={{ background:view==='after'?'#FFD700':'transparent', color:view==='after'?'#1A1A1A':'white', border:'none', padding:'0.3rem 0.875rem', fontSize:'0.72rem', fontWeight:700, cursor:'pointer', borderRadius:'9999px' }}>
                        After ✨
                      </button>
                    </div>
                    {post.occasion && (
                      <div style={{ position:'absolute', top:'0.625rem', left:'0.625rem', background:'rgba(45,122,45,0.85)', color:'white', borderRadius:'9999px', padding:'0.2rem 0.6rem', fontSize:'0.68rem', fontWeight:700 }}>
                        {OCCASIONS.find(o=>o.label===post.occasion)?.emoji ?? '🎨'} {post.occasion}
                      </div>
                    )}
                  </div>
                  <div style={{ padding:'1rem' }}>
                    {post.caption && <p style={{ color:'#555', fontSize:'0.82rem', lineHeight:1.5, marginBottom:'0.5rem' }}>{post.caption}</p>}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                        <div style={{ width:'26px', height:'26px', borderRadius:'9999px', background:'linear-gradient(135deg,#2D7A2D,#1a5c1a)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'0.65rem', fontWeight:700 }}>
                          {(post.username??'V').slice(0,1).toUpperCase()}
                        </div>
                        <span style={{ color:'#555', fontSize:'0.78rem', fontWeight:600 }}>{post.username}</span>
                      </div>
                      <div style={{ display:'flex', gap:'0.625rem', alignItems:'center' }}>
                        <button onClick={() => likePost(post.id, post.likes ?? 0)}
                          style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', gap:'0.25rem', color:'#888', padding:'0.25rem' }}>
                          ❤️ <span style={{ fontSize:'0.75rem' }}>{post.likes ?? 0}</span>
                        </button>
                        <span style={{ color:'#CCC', fontSize:'0.72rem' }}>
                          {new Date(post.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── SECTION 4: AI CHAT ─── */}
      <div ref={chatRef} style={{ background:'#FFFFFF', borderRadius:'1.25rem', border:'1px solid #E0E0E0', overflow:'hidden', marginBottom:'2rem', scrollMarginTop:'1.5rem' }}>
        {/* Chat header */}
        <div style={{ background:'linear-gradient(135deg,#2D7A2D,#1a5c1a)', padding:'1.25rem 1.5rem' }}>
          <h2 style={{ fontWeight:900, color:'white', fontSize:'1.2rem', marginBottom:'0.25rem' }}>🎨 Your Personal Cart Decorating Assistant</h2>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.875rem' }}>Tell me what occasion you want to decorate for and I'll walk you through everything step by step</p>
          {chatOcc && (
            <div style={{ marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <span style={{ background:'rgba(255,255,255,0.15)', color:'white', borderRadius:'9999px', padding:'0.2rem 0.875rem', fontSize:'0.78rem', fontWeight:600 }}>
                {OCCASIONS.find(o=>o.label===chatOcc)?.emoji} {chatOcc}
              </span>
              <button onClick={()=>setChatOcc('')} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.6)', fontSize:'0.75rem', cursor:'pointer' }}>Clear</button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ height:'420px', overflowY:'auto', padding:'1.25rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
          {messages.length === 0 && (
            <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'0.875rem' }}>
              <div style={{ fontSize:'3rem' }}>🎨</div>
              <p style={{ fontWeight:700, color:'#1A1A1A', fontSize:'1rem', textAlign:'center' }}>What occasion are you decorating for?</p>
              <p style={{ color:'#888', fontSize:'0.83rem', textAlign:'center' }}>I'll give you a complete shopping list, instructions, and pro tips</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', marginTop:'0.25rem' }}>
                {STARTER_QS.map((q,i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    style={{ background:'rgba(45,122,45,0.07)', border:'1px solid rgba(45,122,45,0.2)', color:'#2D7A2D', padding:'0.45rem 0.875rem', borderRadius:'9999px', fontSize:'0.78rem', cursor:'pointer', textAlign:'left' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:msg.role==='user'?'flex-end':'flex-start' }}>
              <div style={{ maxWidth:'88%', padding:'0.9rem 1.1rem', borderRadius:msg.role==='user'?'1rem 1rem 0 1rem':'1rem 1rem 1rem 0', background:msg.role==='user'?'#2D7A2D':'#F5F5F5', color:msg.role==='user'?'white':'#1A1A1A', fontSize:'0.875rem', lineHeight:1.65, whiteSpace:'pre-wrap' }}>
                {msg.content || (chatLoading && i===messages.length-1 ? <em style={{ opacity:0.6 }}>Thinking…</em> : '')}
              </div>
            </div>
          ))}

          {chatLoading && messages[messages.length-1]?.role === 'user' && (
            <div style={{ display:'flex', alignItems:'flex-start' }}>
              <div style={{ background:'#F5F5F5', borderRadius:'1rem 1rem 1rem 0', padding:'0.9rem 1.1rem' }}>
                <span style={{ color:'#888', fontSize:'0.875rem' }}>Creating your decorating plan…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ borderTop:'1px solid #E0E0E0', padding:'1rem 1.25rem', display:'flex', gap:'0.75rem', alignItems:'center' }}>
          <div style={{ flex:1 }}>
            <select style={{ ...inp, marginBottom:'0.5rem', fontSize:'0.82rem', color:chatOcc?'#1A1A1A':'#AAA' }} value={chatOcc} onChange={e=>setChatOcc(e.target.value)}>
              <option value="">No occasion selected (optional)</option>
              {OCCASIONS.map(o => <option key={o.label} value={o.label}>{o.emoji} {o.label}</option>)}
            </select>
            <input
              style={{ ...inp, borderRadius:'0.75rem' }}
              placeholder="Ask me anything about decorating your cart…"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
              disabled={chatLoading}
            />
          </div>
          <button onClick={() => sendMessage()} disabled={!chatInput.trim()||chatLoading}
            style={{ background:!chatInput.trim()||chatLoading?'#A8C8A8':'#2D7A2D', color:'white', border:'none', borderRadius:'0.875rem', padding:'0.875rem 1.5rem', fontWeight:700, cursor:!chatInput.trim()||chatLoading?'not-allowed':'pointer', alignSelf:'flex-end', fontSize:'0.9rem' }}>
            Send
          </button>
        </div>

        {messages.length > 0 && (
          <div style={{ borderTop:'1px solid #F0F0F0', padding:'0.75rem 1.25rem', display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {STARTER_QS.slice(0,4).map((q,i) => (
              <button key={i} onClick={() => sendMessage(q)}
                style={{ background:'#F9F9F9', border:'1px solid #E8E8E8', color:'#555', padding:'0.35rem 0.75rem', borderRadius:'9999px', fontSize:'0.75rem', cursor:'pointer' }}>
                {q}
              </button>
            ))}
            <button onClick={() => { setMessages([]); setChatOcc('') }}
              style={{ background:'transparent', border:'none', color:'#AAA', fontSize:'0.75rem', cursor:'pointer', marginLeft:'auto' }}>
              🗑️ Clear
            </button>
          </div>
        )}
      </div>

      {/* Tips footer */}
      <div style={{ background:'rgba(255,215,0,0.08)', borderRadius:'1rem', padding:'1.25rem 1.5rem', border:'1px solid rgba(255,215,0,0.3)', marginBottom:'1rem' }}>
        <p style={{ fontWeight:700, color:'#1A1A1A', marginBottom:'0.5rem' }}>💡 The Villages Decorating Tips</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:'0.5rem' }}>
          {[
            '🛡️ Use magnetic mounts — no holes in your cart',
            '☀️ UV-resistant materials for Florida sun',
            '🌧️ Remove fabric decorations before rain',
            '🔌 Tap 12V accessory outlet for LED lights',
            '🎄 Check parade rules before adding tall items',
            '🏪 Dollar Tree has great seasonal selections',
          ].map((tip, i) => (
            <div key={i} style={{ display:'flex', gap:'0.4rem', fontSize:'0.8rem', color:'#555', alignItems:'flex-start' }}>
              <span style={{ flexShrink:0 }}>{tip.split(' ')[0]}</span>
              <span>{tip.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

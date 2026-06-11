'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { icon: '🏠', label: 'Home',              href: '/' },
  { icon: '🎵', label: 'Entertainment',     href: '/entertainment' },
  { icon: '📰', label: 'News',              href: '/news' },
  { icon: '🗳️', label: 'Elections',        href: '/elections' },
  { icon: '🏪', label: 'Landings & Dining', href: '/landings' },
  { icon: '🏌️', label: 'Golf Cart Rentals', href: '/golf-carts' },
  { icon: '⛳', label: 'Golf Courses',      href: '/golf-courses' },
  { icon: '💬', label: 'Community Forums',  href: '/forums' },
  { icon: '📅', label: 'Events',            href: '/events' },
  { icon: '🚗', label: 'Car Meets & Events',href: '/car-events' },
  { icon: '🛒', label: 'Buy/Sell Golf Carts',href: '/golf-cart-search' },
  { icon: '🔩', label: 'Cart Parts & Mods', href: '/cart-parts' },
  { icon: '🔧', label: 'AI Cart Mechanic',  href: '/cart-mechanic' },
  { icon: '🏌️', label: 'Cart Garage',       href: '/cart-garage' },
  { icon: '💬', label: 'Cart Forums',       href: '/cart-forums' },
  { icon: '🛍️', label: 'Cart Accessories',  href: '/cart-store' },
  { icon: '🎨', label: 'Cart Decorating',   href: '/cart-decorating' },
]

const BOTTOM_NAV = [
  { icon: '🏠', label: 'Home',   href: '/' },
  { icon: '🎵', label: 'Shows',  href: '/entertainment' },
  { icon: '📅', label: 'Events', href: '/events' },
  { icon: '🛒', label: 'Carts',  href: '/golf-cart-search' },
  { icon: '📰', label: 'News',   href: '/news' },
]

const SEARCH_INDEX = [
  { icon:'🎵', label:'Entertainment',     href:'/entertainment',     desc:'Live music at town squares',           category:'Entertainment' },
  { icon:'📰', label:'News',              href:'/news',              desc:'Local Villages news',                  category:'News' },
  { icon:'🗳️', label:'Elections',        href:'/elections',         desc:'Local election information',           category:'Community' },
  { icon:'🏪', label:'Landings & Dining', href:'/landings',          desc:'Restaurants and shopping',             category:'Dining' },
  { icon:'🏌️', label:'Golf Cart Rentals', href:'/golf-carts',        desc:'Rent a golf cart in The Villages',     category:'Golf Carts' },
  { icon:'⛳', label:'Golf Courses',      href:'/golf-courses',      desc:'Golf courses in The Villages',         category:'Golf' },
  { icon:'💬', label:'Community Forums',  href:'/forums',            desc:'Village resident discussions',         category:'Community' },
  { icon:'📅', label:'Events',            href:'/events',            desc:'Community events calendar',            category:'Events' },
  { icon:'🚗', label:'Car Meets & Events',href:'/car-events',        desc:'Car shows and meets near The Villages', category:'Events' },
  { icon:'🛒', label:'Buy/Sell Golf Carts',href:'/golf-cart-search', desc:'Shop eBay and classifieds for carts',  category:'Golf Carts' },
  { icon:'🔩', label:'Cart Parts & Mods', href:'/cart-parts',        desc:'Club Car, EZGO, Yamaha parts',         category:'Golf Carts' },
  { icon:'🔧', label:'AI Cart Mechanic',  href:'/cart-mechanic',     desc:'AI-powered cart diagnosis & repair',   category:'Golf Carts' },
  { icon:'🏌️', label:'Cart Garage',       href:'/cart-garage',       desc:'Your personal digital garage',         category:'Golf Carts' },
  { icon:'💬', label:'Cart Forums',       href:'/cart-forums',       desc:'Golf cart community discussions',      category:'Golf Carts' },
  { icon:'🛍️', label:'Cart Accessories',  href:'/cart-store',        desc:'VillagerConnect merchandise',          category:'Store' },
  { icon:'🎸', label:'Live Music Tonight',href:'/entertainment',     desc:'Town square entertainment tonight',    category:'Entertainment' },
  { icon:'🍽️', label:'Restaurants',       href:'/landings',          desc:'Landings and dining guide',            category:'Dining' },
  { icon:'⚡', label:'Electric Golf Carts',href:'/golf-cart-search', desc:'Buy electric golf carts',              category:'Golf Carts' },
  { icon:'🔋', label:'Cart Battery Help',  href:'/cart-mechanic',    desc:'Battery diagnosis with AI',            category:'Golf Carts' },
  { icon:'🏘️', label:'Local Community',   href:'/forums',            desc:'Meet your neighbors online',           category:'Community' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()

  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [isMobile,       setIsMobile]       = useState(false)
  const [search,         setSearch]         = useState('')
  const [showSearch,     setShowSearch]     = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall,    setShowInstall]    = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close sidebar on nav
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // PWA install prompt + visit tracking
  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)

    const visits = parseInt(localStorage.getItem('vc_visits') || '0') + 1
    localStorage.setItem('vc_visits', String(visits))
    const dismissed     = localStorage.getItem('vc_install_dismissed')
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const thirtyDays    = 30 * 24 * 60 * 60 * 1000
    if (visits >= 2 && Date.now() - dismissedTime > thirtyDays) {
      setTimeout(() => setShowInstall(true), 3500)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const searchResults = search.length > 1
    ? SEARCH_INDEX.filter(d =>
        d.label.toLowerCase().includes(search.toLowerCase()) ||
        d.desc.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 7)
    : []

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    }
    setShowInstall(false)
  }

  function dismissInstall() {
    localStorage.setItem('vc_install_dismissed', String(Date.now()))
    setShowInstall(false)
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F5F5F5', position:'relative' }}>

      {/* Mobile overlay */}
      {mobileOpen && isMobile && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:49 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#FFFFFF',
        borderRight: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        position: isMobile ? 'fixed' : 'sticky',
        top: 0, left: 0,
        height: '100vh',
        overflowY: 'auto',
        flexShrink: 0,
        zIndex: 50,
        transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-260px)') : 'translateX(0)',
        transition: 'transform 0.25s ease',
      }}>
        {/* Logo */}
        <div style={{ padding:'1.25rem 1.25rem 1rem', borderBottom:'2px solid #2D7A2D', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'0.625rem', textDecoration:'none' }}>
            <span style={{ fontSize:'2rem' }}>🏌️</span>
            <div>
              <div style={{ fontSize:'1.1rem', fontWeight:800, color:'#2D7A2D', lineHeight:1.2 }}>VillagerConnect</div>
              <div style={{ fontSize:'0.62rem', color:'#888', letterSpacing:'0.3px' }}>The Villages, FL</div>
            </div>
          </Link>
          {isMobile && (
            <button onClick={() => setMobileOpen(false)}
              style={{ background:'transparent', border:'none', fontSize:'1.75rem', cursor:'pointer', color:'#888', minWidth:'44px', minHeight:'44px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              ×
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav style={{ flex:1, padding:'0.875rem 0.75rem', display:'flex', flexDirection:'column', gap:'0.2rem' }}>
          {NAV.map(n => {
            const active = pathname === n.href || (n.href !== '/' && pathname?.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.7rem 0.875rem', borderRadius:'0.625rem', fontSize:'0.925rem', fontWeight:active?700:400, color:active?'#2D7A2D':'#444', background:active?'rgba(45,122,45,0.08)':'transparent', border:active?'1px solid rgba(45,122,45,0.2)':'1px solid transparent', textDecoration:'none', minHeight:'44px' }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{n.icon}</span>
                <span>{n.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Auth buttons */}
        <div style={{ padding:'1rem 0.75rem', borderTop:'1px solid #E0E0E0', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
          <Link href="/login"    style={{ display:'block', textAlign:'center', background:'rgba(45,122,45,0.08)', border:'1px solid rgba(45,122,45,0.2)', color:'#2D7A2D', padding:'0.7rem', borderRadius:'0.625rem', fontWeight:600, fontSize:'0.9rem', minHeight:'44px', lineHeight:'1.6' }}>Sign In</Link>
          <Link href="/register" style={{ display:'block', textAlign:'center', background:'#2D7A2D', color:'white', padding:'0.7rem', borderRadius:'0.625rem', fontWeight:700, fontSize:'0.9rem', minHeight:'44px', lineHeight:'1.6' }}>Join Free</Link>
          <p style={{ fontSize:'0.68rem', color:'#aaa', textAlign:'center', marginTop:'0.25rem' }}>The Villages, FL 32162</p>
        </div>
      </aside>

      {/* Right panel: header + content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Sticky top bar */}
        <header style={{ background:'#FFFFFF', borderBottom:'1px solid #E0E0E0', padding:'0.75rem 1.25rem', display:'flex', gap:'0.75rem', alignItems:'center', position:'sticky', top:0, zIndex:40 }}>

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button onClick={() => setMobileOpen(true)}
              style={{ background:'transparent', border:'none', fontSize:'1.5rem', cursor:'pointer', color:'#2D7A2D', minWidth:'44px', minHeight:'44px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              ☰
            </button>
          )}

          {/* Search bar */}
          <div ref={searchRef} style={{ flex:1, position:'relative', maxWidth:'560px' }}>
            <input
              type="text"
              placeholder="🔍 Search VillagerConnect…"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowSearch(true) }}
              onFocus={() => setShowSearch(true)}
              onKeyDown={e => {
                if (e.key === 'Escape') { setShowSearch(false); setSearch('') }
                if (e.key === 'Enter' && searchResults.length > 0) { router.push(searchResults[0].href); setShowSearch(false); setSearch('') }
              }}
              style={{ width:'100%', background:'#F5F5F5', border:'1px solid #E0E0E0', borderRadius:'9999px', padding:'0.65rem 1.1rem', fontSize:'1rem', outline:'none', color:'#1A1A1A', boxSizing:'border-box' }}
            />

            {/* Dropdown results */}
            {showSearch && searchResults.length > 0 && (
              <div style={{ position:'absolute', top:'calc(100% + 0.5rem)', left:0, right:0, background:'#FFFFFF', borderRadius:'1rem', border:'1px solid #E0E0E0', boxShadow:'0 8px 32px rgba(0,0,0,0.14)', overflow:'hidden', zIndex:100 }}>
                {searchResults.map((r, i) => (
                  <Link key={i} href={r.href}
                    onClick={() => { setShowSearch(false); setSearch('') }}
                    style={{ display:'flex', alignItems:'center', gap:'0.875rem', padding:'0.875rem 1.1rem', borderBottom:i<searchResults.length-1?'1px solid #F0F0F0':'none', color:'#1A1A1A', textDecoration:'none', minHeight:'52px' }}>
                    <span style={{ fontSize:'1.3rem', flexShrink:0 }}>{r.icon}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:'0.1rem' }}>{r.label}</p>
                      <p style={{ color:'#888', fontSize:'0.75rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.desc}</p>
                    </div>
                    <span style={{ color:'#CCC', fontSize:'0.72rem', flexShrink:0 }}>{r.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* VC badge on mobile */}
          {isMobile && (
            <Link href="/" style={{ fontWeight:900, color:'#2D7A2D', fontSize:'1rem', flexShrink:0, textDecoration:'none' }}>VC</Link>
          )}
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:isMobile?'1.25rem 1rem':'2rem', overflowY:'auto', minWidth:0, paddingBottom:isMobile?'5.5rem':'2rem' }}>
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav style={{ position:'fixed', bottom:0, left:0, right:0, background:'#FFFFFF', borderTop:'1px solid #E0E0E0', display:'flex', zIndex:45, boxShadow:'0 -2px 16px rgba(0,0,0,0.08)' }}>
          {BOTTOM_NAV.map(n => {
            const active = pathname === n.href || (n.href !== '/' && pathname?.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0.6rem 0.25rem', minHeight:'56px', color:active?'#2D7A2D':'#888', textDecoration:'none', gap:'0.2rem', borderTop:active?'2px solid #2D7A2D':'2px solid transparent' }}>
                <span style={{ fontSize:'1.3rem' }}>{n.icon}</span>
                <span style={{ fontSize:'0.65rem', fontWeight:active?700:400, letterSpacing:'0.2px' }}>{n.label}</span>
              </Link>
            )
          })}
        </nav>
      )}

      {/* PWA Install Prompt */}
      {showInstall && (
        <div style={{ position:'fixed', bottom:isMobile?'5rem':'1.5rem', left:'50%', transform:'translateX(-50%)', background:'#2D7A2D', color:'white', borderRadius:'1rem', padding:'1rem 1.25rem', display:'flex', gap:'0.875rem', alignItems:'center', boxShadow:'0 8px 32px rgba(45,122,45,0.45)', zIndex:60, maxWidth:'460px', width:'calc(100% - 2rem)' }}>
          <span style={{ fontSize:'1.75rem', flexShrink:0 }}>🏌️</span>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:800, marginBottom:'0.15rem', fontSize:'0.95rem' }}>Add VillagerConnect to Home Screen</p>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.78rem' }}>Quick access to everything in The Villages</p>
          </div>
          <button onClick={handleInstall}
            style={{ background:'#FFD700', color:'#1A1A1A', border:'none', borderRadius:'0.625rem', padding:'0.5rem 1rem', fontWeight:800, cursor:'pointer', fontSize:'0.85rem', flexShrink:0, minHeight:'44px' }}>
            Add
          </button>
          <button onClick={dismissInstall}
            style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.7)', fontSize:'1.5rem', cursor:'pointer', padding:'0.25rem', flexShrink:0, minWidth:'44px', minHeight:'44px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            ×
          </button>
        </div>
      )}
    </div>
  )
}

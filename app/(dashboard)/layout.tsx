'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '🎵', label: 'Entertainment', href: '/entertainment' },
  { icon: '📰', label: 'News', href: '/news' },
  { icon: '🗳️', label: 'Elections', href: '/elections' },
  { icon: '🏪', label: 'Landings & Dining', href: '/landings' },
  { icon: '🏌️', label: 'Golf Cart Rentals', href: '/golf-carts' },
  { icon: '⛳', label: 'Golf Courses', href: '/golf-courses' },
  { icon: '💬', label: 'Community Forums', href: '/forums' },
  { icon: '📅', label: 'Events', href: '/events' },
  { icon: '🚗', label: 'Car Meets & Events', href: '/car-events' },
  { icon: '🛒', label: 'Buy/Sell Golf Carts', href: '/golf-cart-search' },
  { icon: '🔩', label: 'Cart Parts & Mods', href: '/cart-parts' },
  { icon: '🔧', label: 'AI Cart Mechanic', href: '/cart-mechanic' },
  { icon: '🏌️', label: 'Cart Garage', href: '/cart-garage' },
  { icon: '💬', label: 'Cart Forums', href: '/cart-forums' },
  { icon: '🛍️', label: 'Cart Accessories', href: '/cart-store' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F5F5' }}>

      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#FFFFFF', borderRight: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '2px solid #2D7A2D' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '2rem' }}>🏌️</span>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D7A2D', lineHeight: 1.2 }}>VillagerConnect</div>
              <div style={{ fontSize: '0.62rem', color: '#888', letterSpacing: '0.3px' }}>The Villages, FL</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.875rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {NAV.map(n => {
            const active = pathname === n.href || (n.href !== '/' && pathname?.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.925rem', fontWeight: active ? 700 : 400, color: active ? '#2D7A2D' : '#444', background: active ? 'rgba(45,122,45,0.08)' : 'transparent', border: active ? '1px solid rgba(45,122,45,0.2)' : '1px solid transparent', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{n.icon}</span>
                <span>{n.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/login" style={{ display: 'block', textAlign: 'center', background: 'rgba(45,122,45,0.08)', border: '1px solid rgba(45,122,45,0.2)', color: '#2D7A2D', padding: '0.6rem', borderRadius: '0.625rem', fontWeight: 600, fontSize: '0.875rem' }}>Sign In</Link>
          <Link href="/register" style={{ display: 'block', textAlign: 'center', background: '#2D7A2D', color: 'white', padding: '0.6rem', borderRadius: '0.625rem', fontWeight: 700, fontSize: '0.875rem' }}>Join Free</Link>
          <p style={{ fontSize: '0.68rem', color: '#aaa', textAlign: 'center', marginTop: '0.25rem' }}>The Villages, FL 32162</p>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
